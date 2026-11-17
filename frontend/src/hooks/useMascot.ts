"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { greeting, LINES, ONE_SHOT, PAGE_TIPS, type Mood } from "@/constants/mascot";
import { onMascot } from "@/lib/mascotBus";

const HIDDEN_KEY = "apple.mascot.hidden";
const GREETED_KEY = "apple.mascot.greeted";

function tipFor(path: string) {
  const t = [...PAGE_TIPS].sort((a, b) => b.path.length - a.path.length).find((t) => (t.path === "/" ? path === "/" : path.startsWith(t.path)));
  return t && { ...t, text: t.text.replace("{greeting}", greeting()) };
}

// Mascot state: mood + speech, page tips, reactions to mascot() events and to what the visitor does on the page.
export function useMascot() {
  const path = usePathname();
  const [mood, setMood] = useState<Mood>("idle");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(true); // until the saved choice is read (avoids a flash)
  const base = useRef<Mood>("idle");          // mood to return to after a one-shot
  const quietUntil = useRef(0);               // throttle for ambient reactions

  const show = useCallback((m: Mood, t?: string, pop = true) => {
    setMood(m);
    if (t) { setText(t); if (pop) setOpen(true); }
  }, []);

  // Ambient reactions (hover, scroll…) at most every 12 s and never over an open conversation.
  const ambient = useCallback((m: Mood, t?: string) => {
    if (Date.now() < quietUntil.current) return;
    quietUntil.current = Date.now() + 12000;
    setMood(m);
    if (t) setText(t);
  }, []);

  useEffect(() => { try { setHidden(localStorage.getItem(HIDDEN_KEY) === "1"); } catch { setHidden(false); } }, []);

  // Page tip on every navigation; he waves hello on the first page of a visit.
  useEffect(() => {
    const tip = tipFor(path);
    let greeted = false;
    try { greeted = sessionStorage.getItem(GREETED_KEY) === "1"; sessionStorage.setItem(GREETED_KEY, "1"); } catch {}
    base.current = tip?.mood === "hello" ? "idle" : tip?.mood ?? "idle";
    setMood(tip?.mood === "hello" && greeted ? "happy" : tip?.mood ?? "idle");
    if (tip) setText(tip.text);
    setOpen(false); // bubble opens on tap only, so it never covers the page
  }, [path]);

  useEffect(() => onMascot((e) => show(e.mood, e.text)), [show]);

  // One-shot moods return to the page's mood; a long-idle visitor makes him sleepy.
  useEffect(() => {
    const ms = ONE_SHOT[mood];
    if (ms) { const t = setTimeout(() => setMood(base.current), ms); return () => clearTimeout(t); }
    if (mood === base.current) { const t = setTimeout(() => setMood("sleepy"), 45000); return () => clearTimeout(t); }
  }, [mood]);

  // He notices what you do on the page.
  useEffect(() => {
    let lastY = window.scrollY, lastT = performance.now(), endShown = false;
    const onScroll = () => {
      const now = performance.now(), y = window.scrollY, speed = Math.abs(y - lastY) / Math.max(now - lastT, 1);
      lastY = y; lastT = now;
      if (speed > 4) ambient("surprised", LINES.fastScroll);
      if (!endShown && y + window.innerHeight >= document.documentElement.scrollHeight - 40 && y > 400) { endShown = true; ambient("celebrate", LINES.pageEnd); }
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && (e.target as Element).closest?.('a[href^="/donate"], button[type="submit"]')) ambient("excited", LINES.donateHover);
    };
    const onFocus = (e: FocusEvent) => { if ((e.target as Element).matches?.("input, textarea")) setMood("listening"); };
    const onBlur = (e: FocusEvent) => { if ((e.target as Element).matches?.("input, textarea")) setMood(base.current); };
    let leftAt = 0;
    const onVis = () => {
      if (document.hidden) leftAt = Date.now();
      else if (leftAt && Date.now() - leftAt > 20000) show("hello", LINES.welcomeBack, false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [path, ambient, show]);

  const saveHidden = (h: boolean) => { setHidden(h); try { localStorage.setItem(HIDDEN_KEY, h ? "1" : "0"); } catch {} };
  return { mood, text, open, hidden, setOpen, show, rest: () => setMood(base.current), hide: () => saveHidden(true), unhide: () => saveHidden(false) };
}
