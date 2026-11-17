// Mascot "Appu": a small animated boy who guides visitors. No AI — fixed tips, answers and reactions.

// Each mood is a CSS animation set (globals.css, [data-mood=...]).
export const MOODS = [
  "idle", "hello", "happy", "celebrate", "thinking", "presenting", "worried", "sleepy", "sorry",
  "shy", "love", "dizzy", "wink", "surprised", "excited", "listening",
] as const;
export type Mood = (typeof MOODS)[number];

// One-shot moods play this long (ms), then he goes back to idle.
export const ONE_SHOT: Partial<Record<Mood, number>> = {
  hello: 2600, celebrate: 4200, sorry: 3500, shy: 2600, love: 3200, dizzy: 3200, wink: 1400, surprised: 1800, excited: 2600,
};

export const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

// Tip shown when the visitor lands on a page (longest matching prefix wins). {greeting} is filled in.
export const PAGE_TIPS: { path: string; mood: Mood; text: string }[] = [
  { path: "/", mood: "hello", text: "{greeting}! I'm Appu 👋 We care for elders, children, health, disability, careers and farms. Tap a question to learn more." },
  { path: "/about", mood: "presenting", text: "Meet the team behind APPLE — tap any person to read about them." },
  { path: "/activities", mood: "presenting", text: "Open any programme to see exactly what we do and how your gift helps." },
  { path: "/reports", mood: "thinking", text: "Every report opens right here — tap “View report”." },
  { path: "/success-stories", mood: "happy", text: "These are real lives your support has changed." },
  { path: "/gallery", mood: "happy", text: "Tap an album to see all 5 photos from that programme." },
  { path: "/caretakers", mood: "presenting", text: "Tap a caretaker to see their profile and contact details." },
  { path: "/donate", mood: "happy", text: "Pick a cause, pick an amount, and you're done in under a minute!" },
  { path: "/status", mood: "thinking", text: "This page checks our website, server and database live." },
];

// Quick questions: fixed answers, optional link.
export const FAQ: { q: string; a: string; href?: string; label?: string; mood: Mood }[] = [
  { q: "How do I donate?", a: "Choose a cause, pick an amount and add your name and email. Our team contacts you to complete it.", href: "/donate", label: "Donate now", mood: "excited" },
  { q: "Where does my money go?", a: "Straight to the programme you choose. Our reports show every rupee.", href: "/reports", label: "See reports", mood: "presenting" },
  { q: "What do you work on?", a: "Elder care, education, community health, disability wellbeing, careers and agriculture.", href: "/activities", label: "Our activities", mood: "presenting" },
  { q: "Who runs APPLE?", a: "A team of caretakers from the villages we serve, led by our founders.", href: "/about", label: "Meet the team", mood: "happy" },
  { q: "How can I contact you?", a: "Every caretaker's profile has email and phone buttons, and our contact is in the footer.", href: "/caretakers", label: "Caretakers", mood: "presenting" },
];

// What he says when you play with him.
export const LINES = {
  tap: ["Hehe! How can I help? 😊", "Hi hi! 👋", "You found me!"],
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

export const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
