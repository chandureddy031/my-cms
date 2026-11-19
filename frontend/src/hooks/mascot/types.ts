import type { MOODS } from "@/constants/mascot";

export type Mood = (typeof MOODS)[number];

export interface MascotEvent {
  mood: Mood;
  text?: string;
}

/** Changes the mood and optionally says something; the bubble opens unless openBubble is false. */
export type ShowMascot = (mood: Mood, text?: string, openBubble?: boolean) => void;
