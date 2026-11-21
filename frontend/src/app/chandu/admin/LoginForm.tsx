"use client";
import { useActionState } from "react";
import { login } from "@/chandu/controller/actions";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="flex flex-col gap-4">
      <input name="password" type="password" required autoFocus autoComplete="current-password" placeholder="Admin key" aria-label="Admin key"
        className="rounded-xl border-2 border-stone-200 bg-white px-4 py-3 outline-none focus:border-orange-500" />
      {error && <p role="alert" className="font-semibold text-red-700">{error}</p>}
      <button type="submit" disabled={pending} className="btn disabled:opacity-60">{pending ? "Checking…" : "Log in"}</button>
    </form>
  );
}
