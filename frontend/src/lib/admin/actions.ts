"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CMS_MESSAGES } from "@/constants/cms";
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS } from "@/constants/config";
import { FAULT_TEXT } from "@/constants/health";
import { adminHeaders, apiUrl, describeFailure } from "@/lib/api/client";
import type { Section } from "@/types/content";
import { cmsDashboardHref, cmsItemHref, cmsSectionHref, cmsSettingsHref, homeHref, withError } from "@/utils/routes";
import { verifyAdminKey } from "./session";

const field = (form: FormData, name: string) => String(form.get(name) ?? "").trim();
const optionalField = (form: FormData, name: string) => field(form, name) || null;

/** Sends a write with the editor key. On failure, goes back to `onError` with the reason. */
async function writeToApi(method: "POST" | "PUT" | "DELETE", path: string, onError: string, body?: unknown) {
  const key = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  let message = FAULT_TEXT.backend;
  try {
    const response = await fetch(apiUrl(path), {
      method,
      headers: { "Content-Type": "application/json", ...adminHeaders(key) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (response.ok) {
      revalidatePath(homeHref(), "layout"); // public pages update now, not after the cache expires
      return;
    }
    if (response.status === 401) message = CMS_MESSAGES.keyExpired;
    else if (response.status === 422) message = CMS_MESSAGES.invalidFields(await response.text());
    else if (response.status === 409) message = CMS_MESSAGES.slugTaken;
    else message = await describeFailure(response);
  } catch {}
  redirect(withError(onError, message));
}

function contentFromForm(form: FormData) {
  return {
    section: field(form, "section"),
    title: field(form, "title"),
    body: field(form, "body"),
    details: field(form, "details"),
    position: Number(field(form, "position")) || 0,
    image: optionalField(form, "image"),
    meta: optionalField(form, "meta"),
    slug: optionalField(form, "slug"),
    parent: optionalField(form, "parent"),
    email: optionalField(form, "email"),
    phone: optionalField(form, "phone"),
  };
}

export async function unlock(form: FormData) {
  const key = field(form, "key");
  const response = await verifyAdminKey(key);
  if (response?.status !== 200) {
    const fromDatabaseOrApi = Boolean((await response?.clone().json().catch(() => ({})))?.source);
    const message =
      response?.status === 401 ? CMS_MESSAGES.wrongKey
        : response?.status === 503 && !fromDatabaseOrApi ? CMS_MESSAGES.keyMissingOnServer
          : await describeFailure(response);
    redirect(withError(cmsDashboardHref(), message));
  }
  (await cookies()).set(ADMIN_COOKIE, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: cmsDashboardHref(),
    maxAge: ADMIN_SESSION_SECONDS,
  });
  redirect(cmsDashboardHref());
}

export async function lock() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: cmsDashboardHref() });
  redirect(cmsDashboardHref());
}

export async function saveSiteSettings(form: FormData) {
  const settings = Object.fromEntries([...form.entries()].filter(([name]) => !name.startsWith("$")).map(([name, value]) => [name, String(value)]));
  await writeToApi("PUT", "/api/site", cmsSettingsHref(), settings);
  redirect(`${cmsSettingsHref()}?saved=1`);
}

export async function saveContentItem(form: FormData) {
  const id = field(form, "id");
  const item = contentFromForm(form);
  const section = item.section as Section;
  await writeToApi(id ? "PUT" : "POST", id ? `/api/content/${Number(id)}` : "/api/content", cmsItemHref(section, id ? Number(id) : "new"), item);
  redirect(`${cmsSectionHref(section)}?saved=${encodeURIComponent(item.title)}`);
}

export async function deleteContentItem(form: FormData) {
  const section = field(form, "section") as Section;
  const id = Number(field(form, "id"));
  await writeToApi("DELETE", `/api/content/${id}`, cmsItemHref(section, id));
  redirect(`${cmsSectionHref(section)}?saved=deleted`);
}
