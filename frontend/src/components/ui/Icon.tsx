const ICON_PATHS = {
  home: "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 7v8m0-11v.01",
  spark: "M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z",
  image: "M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5M15 9.5v.01",
  people: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 10a7 7 0 0 1 14 0M17 11a3 3 0 1 0 0-6M22 21a6 6 0 0 0-4-5.6",
  heart: "M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z",
  menu: "M4 6h16M4 12h16M4 18h16",
  chevron: "M15 6l-6 6 6 6",
  close: "M6 6l12 12M18 6L6 18",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  phone: "M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export type IconName = keyof typeof ICON_PATHS;

interface IconProps {
  name: IconName;
  className?: string;
}

/** Line icon in the current text colour. */
export function Icon({ name, className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
