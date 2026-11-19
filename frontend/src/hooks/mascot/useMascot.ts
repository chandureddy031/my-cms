"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { STORAGE_KEYS } from "@/constants/config";
import { MASCOT_TIMING, ONE_SHOT_MS, PAGE_TIPS } from "@/constants/mascot";
import { isActivePath } from "@/utils/routes";
import { readStorage, writeStorage } from "@/utils/storage";
import { onMascotEvent } from "./mascotEvents";
import type { Mood, ShowMascot } from "./types";
import { useMascotReactions } from "./useMascotReactions";

const tipFor = (path: string) =>
  [...PAGE_TIPS].sort((a, b) => b.path.length - a.path.length).find((tip) => isActivePath(path, tip.path));

/** Mascot state (mood, speech, bubble, hidden) plus page tips, timers and reactions. */
export function useMascot() {
  const path = usePathname();
  const [mood, setMood] = useState<Mood>("idle");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true); // until the saved choice is read, so he never flashes in
  const pageMood = useRef<Mood>("idle"); // what one-shot moods return to

  const show = useCallback<ShowMascot>((nextMood, nextText, openBubble = true) => {
    setMood(nextMood);
    if (!nextText) return;
    setText(nextText);
    if (openBubble) setOpen(true);
  }, []);

  const rest = useCallback(() => setMood(pageMood.current), []);

  useEffect(() => setHidden(readStorage(STORAGE_KEYS.mascotHidden) === "1"), []);

  // New page: its tip and mood. He waves hello only on the first page of a visit.
  useEffect(() => {
    const tip = tipFor(path);
    const greeted = readStorage(STORAGE_KEYS.mascotGreeted, "session") === "1";
    writeStorage(STORAGE_KEYS.mascotGreeted, "1", "session");
    pageMood.current = tip?.mood === "hello" ? "idle" : tip?.mood ?? "idle";
    setMood(tip?.mood === "hello" && greeted ? "happy" : tip?.mood ?? "idle");
    if (tip) setText(tip.text());
    setOpen(false); // the bubble opens on tap only, so it never covers the page
  }, [path]);

  useEffect(() => onMascotEvent((event) => show(event.mood, event.text)), [show]);

  // One-shot moods return to the page mood; idling on the page mood too long makes him sleepy.
  useEffect(() => {
    const oneShotMs = ONE_SHOT_MS[mood];
    const delay = oneShotMs ?? (mood === pageMood.current ? MASCOT_TIMING.sleepAfterMs : undefined);
    if (delay === undefined) return;
    const timer = setTimeout(oneShotMs ? rest : () => setMood("sleepy"), delay);
    return () => clearTimeout(timer);
  }, [mood, rest]);

  useMascotReactions({ path, show, setMood, rest });

  const saveHidden = (value: boolean) => {
    setHidden(value);
    writeStorage(STORAGE_KEYS.mascotHidden, value ? "1" : "0");
  };

  return { mood, text, open, hidden, setOpen, show, rest, hide: () => saveHidden(true), unhide: () => saveHidden(false) };
}

export type MascotState = ReturnType<typeof useMascot>;
