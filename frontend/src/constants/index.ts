// From APPLES' Organisation Profile and website content documents.
export const SITE = {
  name: "APPLES",
  tagline: "Agriculture People Poverty Line Coaching Education Society",
  about:
    "APPLES is a non-profit, non-political, secular and charitable organisation built on love and concern for poor, vulnerable and marginalised communities. Registered in 1995 under the Societies Registration Act XXI of 1860 (Reg. No. 154), we work in rural villages and urban slums of Anantapur district, Andhra Pradesh.",
  mission: "Improve the lives of women, children, youth and the farming community through education, health, economic empowerment and social amenities.",
  vision:
    "Economic, social and environmentally sustainable development among deprived and marginalised people, so they lead lives of dignity and quality by accessing the resources and services of government and other service providers.",
  email: "applesngo4u@gmail.com",
  phone: "+91 94901 94281",
  address: "Edulamustur Village & Post, Bathalapalli Mandal, Anantapuramu District, Andhra Pradesh 515661",
  office: "Field office: D.No. 13-3-274, RF Road, Anantapuramu 515001",
};

// About page "Our story" (Rich text: blank line = new block, "## " = heading, "- " = list).
export const ABOUT_STORY = `## Our inspiration

APPLES was founded in 1995 by Mr S. Thirupal with a motto of social justice and community development, inspired by Sri S.R. Sankaran IAS.

Sri S.R. Sankaran (1934–2010) was an Indian civil servant and social worker who served as Chief Secretary of Tripura and twice as Principal Secretary for Social Welfare in Andhra Pradesh. He worked on atrocities against women and education for Dalits, and set up dedicated schools and hostels that grew into the Andhra Pradesh Social Welfare Residential Schools. He dedicated his whole life to the welfare of poor, deprived and marginalised communities. He declined the Padma Bhushan awarded to him in 2005, and in 2011 the Government of Andhra Pradesh installed his statue in front of the Department of Social Welfare, the first time a civil servant was honoured with a statue.

## Who we are

Agriculture People Poverty Line Coaching Education Society (APPLES) is a non-profit, non-political, secular and charitable organisation, registered on 31 January 1995 under the Societies Registration Act XXI of 1860, Registration No. 154. We work in rural villages and urban slums of Anantapur district, Andhra Pradesh, with local government institutions, like-minded volunteers and the public.

Our work is funded by government grants and schemes and by contributions from individuals, firms, companies, associations, charitable trusts, institutions and the general public.

## Our aims and objectives

- To stimulate people's involvement and organise community action for social, economic and cultural development
- To improve the quality of life of the farming community by promoting sustainable agriculture
- To seek the collaboration of other voluntary organisations and government agencies for development programmes
- To educate women and youth on their rights, for equal status in health, social, political and economic development
- To build networks with NGOs and government organisations working in the same field

## More of our work

- School children awareness: role-plays, rallies and songs in project villages to show children and parents the right to and importance of education, which has increased the number of children continuing in school
- Community awareness: cultural programmes such as Chekka Bhajana and Kolatam, and workshops on health, MGNREGS, natural farming and tree planting
- Wall writings: messages in public places on child trafficking, girls' education, natural farming and MGNREGS, so people can use government and NGO schemes
- Special days: Women's Day, Environment Day, Children's Day, World Disability Day and S.R. Sankaran Day, with rallies, banners and cultural programmes
- Summer camps: drawing, craft, painting, origami and puppet shows for school children, with parents taking part
- COVID-19 relief: with other NGOs we taught children, migrants and the community about prevention and gave out masks, sanitisers and soap; 1,000 families received relief kits (rice, dal, oil and basic needs) supported by Walmart Foundation through Tanager
- Networking: strong ties with HANDS, JSDS, GRDS and other like-minded NGOs, to build better programmes and raise people's issues with government and service providers`;

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
export const REVALIDATE = 60;

// One colour per letter of the logo; cycles if the name is longer.
export const LOGO_COLORS = ["#15803d", "#65a30d", "#0d9488", "#ca8a04", "#16a34a", "#059669"];

export const NAV = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about", label: "About Us", icon: "info" },
  { href: "/activities", label: "Activities", icon: "spark" },
  { href: "/reports", label: "Reports", icon: "doc" },
  { href: "/success-stories", label: "Success Stories", icon: "star" },
  { href: "/gallery", label: "Gallery", icon: "image" },
  { href: "/caretakers", label: "Caretakers", icon: "people" },
  { href: "/donate", label: "Donate", icon: "heart" },
] as const;

export const AMOUNTS = [500, 1000, 2500, 5000, 10000];

export const SECTIONS = ["activities", "reports", "stories", "gallery", "caretakers", "stats"] as const;
export const SECTION_LABELS: Record<(typeof SECTIONS)[number], string> = {
  activities: "Activities", reports: "Reports", stories: "Success Stories", gallery: "Gallery", caretakers: "Caretakers", stats: "Home Stats",
};
// Which fields the CMS shows per section, with what label.
export const FIELDS: Record<(typeof SECTIONS)[number], Partial<Record<"title" | "slug" | "meta" | "body" | "details" | "image" | "parent" | "email" | "phone" | "position", string>>> = {
  activities: { title: "Title", slug: "URL slug", meta: "Label", body: "Summary", details: "Full page text", image: "Image path", position: "Order" },
  reports: { title: "Title", slug: "URL slug", meta: "Year", body: "Summary", image: "PDF file path (e.g. /assets/report-2025.pdf)", position: "Order" },
  stories: { title: "Title", slug: "URL slug", parent: "Activity slug", meta: "Label", body: "Summary", details: "Full story", image: "Image path", position: "Order" },
  gallery: { title: "Caption", parent: "Activity slug (album)", meta: "Label", body: "Description", image: "Image path", position: "Order" },
  caretakers: { title: "Name", slug: "URL slug", meta: "Role", parent: "Group (\"team\" shows on About Us)", body: "Short intro", details: "About", image: "Photo path (blank = initials)", email: "Email", phone: "Phone", position: "Order" },
  stats: { title: "Label", body: "Value", position: "Order" },
};
export const ADMIN_COOKIE = "apple_admin";
