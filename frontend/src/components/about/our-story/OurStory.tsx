import { RichTextPanel } from "@/components/shared";
import { ABOUT_STORY } from "./constants";

export function OurStory() {
  return <section className="page-x pb-16"><RichTextPanel text={ABOUT_STORY} /></section>;
}
