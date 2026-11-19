// Appu, the guide mascot: fixed tips, answers and reactions (no AI).
import type { Mood } from "@/hooks/mascot/types";
import { aboutHref, activitiesHref, caretakersHref, donateHref, galleryHref, homeHref, reportsHref, statusHref, storiesHref } from "@/utils/routes";

/** Every mood has its own animation set in styles/mascot.css ([data-mood=…]). */
export const MOODS = [
  "idle", "hello", "happy", "celebrate", "thinking", "presenting", "worried", "sleepy", "sorry",
  "shy", "love", "dizzy", "wink", "surprised", "excited", "listening",
] as const;

/** One-shot moods play this long (ms), then he returns to the page's mood. */
export const ONE_SHOT_MS: Partial<Record<Mood, number>> = {
  hello: 2600, celebrate: 4200, sorry: 3500, shy: 2600, love: 3200, dizzy: 3200, wink: 1400, surprised: 1800, excited: 2600,
};

export const MASCOT_TIMING = {
  /** Idle this long on the page mood and he falls asleep. */
  sleepAfterMs: 45_000,
  /** Minimum gap between reactions to scrolling / hovering. */
  ambientGapMs: 12_000,
  /** Away from the tab this long and he says welcome back. */
  welcomeBackAfterMs: 20_000,
  /** Typewriter speed, ms per letter. */
  typeTickMs: 16,
};

export const MASCOT_GESTURES = {
  /** Pointer travel before a press counts as a drag. */
  dragPx: 10,
  /** Press this long without moving = hug. */
  holdMs: 550,
  /** This many taps inside the window = dizzy. */
  dizzyTaps: 4,
  dizzyWindowMs: 1600,
  /** How far the pupils move towards the pointer (viewBox units). */
  lookReach: 2.2,
};

/** Scrolling faster than this (px per ms) surprises him. */
export const FAST_SCROLL_SPEED = 4;

/** Hovering these makes him excited. */
export const DONATE_TARGETS = 'a[href^="/donate"], button[type="submit"]';

const greeting = () => {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
};

/** Tip for the page the visitor is on (the longest matching path wins). */
export const PAGE_TIPS: { path: string; mood: Mood; text: () => string }[] = [
  { path: homeHref(), mood: "hello", text: () => `${greeting()}! I'm Appu 👋 APPLES works for elders, children, women, mental health, livelihoods and farmers in Anantapur. Tap a question to learn more.` },
  { path: aboutHref(), mood: "presenting", text: () => "Meet the team behind APPLES — tap any person to read about them." },
  { path: activitiesHref(), mood: "presenting", text: () => "Open any programme to see exactly what we do and how your gift helps." },
  { path: reportsHref(), mood: "thinking", text: () => "Every report opens right here — tap “View report”." },
  { path: storiesHref(), mood: "happy", text: () => "These are real lives your support has changed." },
  { path: galleryHref(), mood: "happy", text: () => "Tap an album to see all 5 photos from that programme." },
  { path: caretakersHref(), mood: "presenting", text: () => "Tap a caretaker to see their profile and contact details." },
  { path: donateHref(), mood: "happy", text: () => "Pick a cause, pick an amount, and you're done in under a minute!" },
  { path: statusHref(), mood: "thinking", text: () => "This page checks our website, server and database live." },
];

/** Quick questions in the speech bubble, each with a fixed answer and an optional link. */
export const MASCOT_QUESTIONS: { question: string; answer: string; mood: Mood; link?: { href: string; label: string } }[] = [
  { question: "How do I donate?", answer: "Choose a cause, pick an amount and add your name and email. Our team contacts you to complete it.", mood: "excited", link: { href: donateHref(), label: "Donate now" } },
  { question: "Where does my money go?", answer: "Straight to the programme you choose.", mood: "presenting", link: { href: reportsHref(), label: "See reports" } },
  { question: "What do you work on?", answer: "Elder care, education and child rights, mental health, women and child empowerment, livelihoods and natural farming.", mood: "presenting", link: { href: activitiesHref(), label: "Our activities" } },
  { question: "Who runs APPLES?", answer: "APPLES was founded in 1995 by Mr S. Thirupal, our Secretary, inspired by Sri S.R. Sankaran IAS.", mood: "happy", link: { href: aboutHref(), label: "Meet the team" } },
  { question: "How can I contact you?", answer: "Email applesngo4u@gmail.com or call +91 94901 94281. Our address is in the footer.", mood: "presenting", link: { href: caretakersHref(), label: "Caretakers" } },
];

/** What he says when something happens. */
export const MASCOT_LINES = {
  tickle: ["Hehe, that tickles! 😆", "Stop it, haha!", "Hihihi 🤭", "Okay okay, I'm awake!", "Boop! 👉"],
  dizzy: "Whoa… everything is spinning 😵‍💫",
  hug: "Aww, a hug! 💚 Thank you!",
  drag: "Hey! I like my corner 🙈",
  dragBack: "Home sweet home 🏡",
  wink: "😉",
  donateHover: "Yes! That one! 💚",
  fastScroll: "Whoa, speedy! 💨",
  pageEnd: "You made it to the end! 🎉 Want to make a difference?",
  welcomeBack: "Welcome back! 👋 I missed you.",
  donated: "Thank you so much! Your kindness reaches a real person. 💚",
};
