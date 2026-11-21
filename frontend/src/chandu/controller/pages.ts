/** One CMS page per website page: which sections of content.json each one edits. */
export const CMS_PAGES = [
  { slug: "site", label: "Header, footer & contact info", sections: ["site"], view: "/" },
  { slug: "home", label: "Home", sections: ["home"], view: "/" },
  { slug: "about", label: "About Us", sections: ["about"], view: "/about" },
  { slug: "activities", label: "Activities", sections: ["activities", "programmes"], view: "/activities" },
  { slug: "reports", label: "Impact Reports", sections: ["reports"], view: "/reports" },
  { slug: "stories", label: "Case Studies", sections: ["stories"], view: "/stories" },
  { slug: "gallery", label: "Gallery", sections: ["gallery"], view: "/gallery" },
  { slug: "contact", label: "Contact", sections: ["contact"], view: "/contact" },
  { slug: "donate", label: "Donate", sections: ["donate"], view: "/donate" },
] as const;
