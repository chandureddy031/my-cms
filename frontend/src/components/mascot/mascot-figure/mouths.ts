import type { Mood } from "@/hooks/mascot";

/** Mouth shape per mood (viewBox units). Paths ending in Z are drawn filled: an open mouth. */
export const MOUTHS: Record<Mood, string> = {
  idle: "M53 64 Q60 69 67 64",
  hello: "M52 63 Q60 73 68 63 Z",
  happy: "M52 63 Q60 73 68 63 Z",
  celebrate: "M51 62 Q60 76 69 62 Z",
  thinking: "M55 66 Q60 65 65 66",
  presenting: "M53 63 Q60 70 67 63",
  worried: "M54 68 Q60 63 66 68",
  sleepy: "M56 66 Q60 67 64 66",
  sorry: "M54 68 Q60 64 66 68",
  shy: "M55 65 Q60 68 65 65",
  love: "M51 62 Q60 75 69 62 Z",
  dizzy: "M53 66 Q56.5 63 60 66 Q63.5 69 67 66",
  wink: "M53 63 Q61 71 68 62",
  surprised: "M56 64 Q60 59 64 64 Q60 70 56 64 Z",
  excited: "M50 62 Q60 77 70 62 Z",
  listening: "M55 65 Q60 67 65 65",
};
