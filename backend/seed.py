"""Reset page content to the starting set. Donations and site settings are untouched."""
import os
from pathlib import Path

import psycopg

A = {  # activity slug -> (image, label)
    "elder-care": ("/assets/elder.jpg", "Elder Care"),
    "education": ("/assets/education.jpg", "Education"),
    "community-health": ("/assets/health.jpg", "Community Health"),
    "disability-wellbeing": ("/assets/disability.jpg", "Disability Wellbeing"),
    "careers": ("/assets/careers.jpg", "Careers & Livelihood"),
    "agriculture": ("/assets/agriculture.jpg", "Agriculture"),
}

ACTIVITIES = [
    ("elder-care", "Elder Care", "Day-care centres, home visits, meals and medical check-ups for senior citizens who live alone.", """## What we do
Many older people in our villages live alone after their children move to the cities. We make sure no senior citizen goes a day without a meal, a check-up or someone to talk to.

- Elder day-care centres open six days a week with meals, games and prayer time
- Weekly home visits for seniors who cannot leave the house
- Free monthly medical camps: blood pressure, sugar, eyes and joints
- Help applying for old-age pensions and government health cards

## How we do it
Each village has a trained caretaker who knows every senior by name. Volunteers keep a simple register of health readings and needs, and our medical team follows up on anyone whose readings change.

## Your support provides
- ₹500 feeds one senior for a week
- ₹2,500 covers a month of medicines for one person
- ₹5,000 sponsors a full medical camp for a village"""),
    ("education", "Education for Every Child", "Free schooling support, books, uniforms and evening tuition for children from poor families.", """## What we do
Poverty should never decide whether a child learns. We keep children from low-income families in school and help them catch up when they fall behind.

- Evening learning centres with trained tutors in 12 villages
- School kits: books, uniforms, bags and stationery every June
- Scholarships for high-school and college students
- Digital literacy classes on donated laptops

## How we do it
Our tutors are young people from the same villages, many of them former students. Parents meet the team every month to see their child's progress, and we work with government schools so children never have to choose between us and their class.

## Your support provides
- ₹1,000 gives a child a full school kit
- ₹2,500 funds a month of evening tuition for ten children
- ₹10,000 sponsors a college scholarship for a year"""),
    ("community-health", "Community Health", "Mobile clinics, health camps, mother-and-child care and health awareness in rural villages.", """## What we do
The nearest hospital can be hours away. We bring basic healthcare to the village itself.

- A mobile clinic that visits each partner village twice a month
- Pregnancy check-ups, nutrition support and newborn care
- Screening camps for diabetes, blood pressure, anaemia and eyesight
- Clean water and hygiene awareness in schools and homes

## How we do it
Our doctors and nurses work with local health workers who follow up between visits. Serious cases are referred to partner hospitals, and we arrange transport so cost never stops treatment.

## Your support provides
- ₹500 pays for a mother's pregnancy check-up and supplements
- ₹2,500 runs the mobile clinic for one day
- ₹5,000 sponsors a full screening camp"""),
    ("disability-wellbeing", "Disability Wellbeing", "Assistive devices, therapy and inclusive skill training for persons with disabilities.", """## What we do
We help persons with disabilities live with independence, dignity and a place in their community.

- Wheelchairs, hearing aids, crutches and other assistive devices
- Physiotherapy and speech therapy sessions at our centre and at home
- Inclusive skill training and help finding work
- Support with disability certificates and government benefits

## How we do it
Every person gets a care plan made with their family. Our therapists train family members to continue exercises at home, and we visit regularly to adjust the plan.

## Your support provides
- ₹1,000 covers four therapy sessions
- ₹5,000 provides a wheelchair
- ₹10,000 supports a year of skill training for one person"""),
    ("careers", "Careers & Livelihood", "Vocational training, job fairs and small-business support for young people and women.", """## What we do
A steady income changes everything for a family. We train young people and women for real jobs and help them start small businesses.

- Courses in tailoring, computer skills, electrical work and mobile repair
- Spoken English and interview preparation
- Job fairs with local employers
- Small grants and mentoring for first-time entrepreneurs

## How we do it
Courses run for three to six months and are designed with local employers so the skills match real openings. After training we stay in touch for a year to help with placement and growth.

## Your support provides
- ₹2,500 funds a month of training for one student
- ₹5,000 provides a sewing machine for a new tailor
- ₹10,000 seeds a small business"""),
    ("agriculture", "Agriculture Development", "Training farmers in sustainable methods, with seeds, irrigation and better market access.", """## What we do
Most families we serve depend on farming. We help small farmers grow more, spend less and sell at a fair price.

- Training in organic and low-cost farming methods
- Quality seeds and saplings at the start of each season
- Drip irrigation and rainwater harvesting for dry lands
- Farmer groups that sell together for better prices

## How we do it
Demonstration plots in each village let farmers see results before they change their own fields. Our field officers visit through the season, and farmer groups meet monthly to share what works.

## Your support provides
- ₹1,000 gives a farmer seeds for one season
- ₹5,000 helps install drip irrigation on a small plot
- ₹10,000 sets up a village demonstration plot"""),
]

STORIES = [
    ("lakshmi", "Lakshmi, 72", "elder-care", "After losing her family, Lakshmi found companionship and daily meals at our elder centre.",
     "Lakshmi lived alone for three years after her husband passed away and her son moved to the city. She often skipped meals.\n\nA caretaker found her during a home visit. Today she comes to the day-care centre every morning, has her blood pressure checked every week and leads the afternoon singing group.\n\n\"I have a family again,\" she says."),
    ("ravi", "Ravi, 14", "education", "A farmer's son who now tops his class and dreams of becoming an engineer.",
     "Ravi was about to drop out of school to help on his father's farm. Our evening tutors helped him catch up in maths and science.\n\nThis year he came first in his class and won a district science fair. He now helps younger children at the learning centre."),
    ("meena", "Meena's Farm", "agriculture", "Drip irrigation doubled Meena's harvest and income in one season.",
     "Meena farms two acres of dry land. Every summer her crops failed for lack of water.\n\nWith drip irrigation and training from our field officers, she grew vegetables through the summer for the first time. Her income doubled, and three neighbours have now installed the same system."),
    ("anjali", "Anjali's First Steps", "disability-wellbeing", "Six months of physiotherapy helped eight-year-old Anjali walk to school on her own.",
     "Anjali was born with weak leg muscles and was carried everywhere by her mother.\n\nOur therapists worked with her twice a week and taught her mother exercises for home. After six months, Anjali walked into her classroom by herself."),
    ("sunitha", "Sunitha's Tailoring Shop", "careers", "From a training course to her own shop employing three women.",
     "Sunitha joined our tailoring course with no income of her own. After six months she received a sewing machine and a small grant.\n\nToday she runs a tailoring shop in her village and has hired three women she trained herself."),
    ("venkatamma", "A Safe Delivery", "community-health", "Regular check-ups at our mobile clinic caught a risk early for Venkatamma and her baby.",
     "During a routine check-up, our nurse found that Venkatamma had severe anaemia in her seventh month.\n\nWe arranged treatment and nutrition support and a hospital delivery. Mother and baby are healthy today."),
]

TEAM = [  # name, role, intro, details  (ponytail: placeholder bios and contact; edit in /apple)
    ("Madanmohan Reddy", "Founder & Chairman", "Founded APPLE to bring care, schooling and health services to the villages he grew up in.",
     "Madanmohan Reddy leads the organisation's vision and partnerships. He started the first elder day-care centre and continues to visit villages every week to listen to families."),
    ("Chandrakanth Reddy", "Director of Programmes", "Plans and runs all six programmes, from elder care to agriculture.",
     "Chandrakanth Reddy oversees programme planning, field teams and reporting. He makes sure every rupee donated reaches the work it was given for."),
    ("S. Thirupal", "Head of Field Operations", "Leads the field officers and caretakers who work in our villages every day.",
     "S. Thirupal coordinates village caretakers, the mobile clinic schedule and farmer groups. He is often the first person families call when they need help."),
    ("Lakshmidevi", "Head of Women & Child Welfare", "Leads our education, mother-and-child health and women's livelihood work.",
     "Lakshmidevi runs the learning centres and the tailoring and skill courses for women. She mentors many of the young tutors who were once students themselves."),
    ("Ramesh Naidu", "Community Health Coordinator", "Coordinates health camps, the mobile clinic and hospital referrals.",
     "Ramesh Naidu works with our doctors, nurses and local health workers to plan health camps and follow up on every referral."),
]

CARETAKERS = [
    ("Dr. Anita Rao", "Medical Lead", "/assets/care1.jpg", "Medical lead with 15 years in rural healthcare.", "Dr. Anita Rao leads the mobile clinic and health camps and trains local health workers."),
    ("Suresh Kumar", "Elder Care Coordinator", "/assets/care2.jpg", "Coordinates elder day-care centres and home visits.", "Suresh Kumar manages the elder day-care centres and the weekly home-visit rota."),
    ("Priya Nair", "Wellbeing Lead", "/assets/care3.jpg", "Special educator and disability rights advocate.", "Priya Nair runs therapy sessions and inclusive skill training for persons with disabilities."),
]

GALLERY_CAPTIONS = {
    "elder-care": ["Morning at the day-care centre", "Weekly health check", "Home visit", "Lunch together", "Pension help desk"],
    "education": ["Evening learning centre", "School kit day", "Science fair", "Digital literacy class", "Reading circle"],
    "community-health": ["Mobile clinic visit", "Mother-and-child check-up", "Eye screening camp", "Hygiene awareness at school", "Health worker training"],
    "disability-wellbeing": ["Physiotherapy session", "Wheelchair handover", "Speech therapy", "Skill training", "Family training at home"],
    "careers": ["Tailoring course", "Computer class", "Job fair", "Mobile repair workshop", "New business opening"],
    "agriculture": ["Demonstration plot", "Seed distribution", "Drip irrigation", "Farmer group meeting", "Harvest day"],
}

REPORTS = [
    ("annual-2025", "Annual Report 2025", "2025", "Reached 48,000 beneficiaries across 120 villages. 92% of funds went directly to programmes."),
    ("annual-2024", "Annual Report 2024", "2024", "Opened 4 new elder day-care centres and 12 learning hubs."),
    ("audit-2025", "Audit & Compliance 2025", "2025", "Independently audited financial statements and governance disclosures."),
]

STATS = [("Beneficiaries", "48,000+"), ("Villages", "120"), ("Volunteers", "1,500"), ("Years of service", "18")]


def slugify(s: str) -> str:
    return "".join(c if c.isalnum() else "-" for c in s.lower()).strip("-").replace("--", "-")


def rows():
    for n, (slug, title, body, details) in enumerate(ACTIVITIES, 1):
        yield dict(section="activities", slug=slug, title=title, body=body, details=details, image=A[slug][0], meta=A[slug][1], position=n)
    for n, (slug, title, parent, body, details) in enumerate(STORIES, 1):
        yield dict(section="stories", slug=slug, title=title, body=body, details=details, image=A[parent][0], meta=A[parent][1], parent=parent, position=n)
    for n, (name, role, body, details) in enumerate(TEAM, 1):
        s = slugify(name)
        yield dict(section="caretakers", slug=s, title=name, body=body, details=details, meta=role, parent="team", position=n,
                   email=f"{s.replace('-', '.')}@apple-foundation.org", phone="+91 00000 00000")
    for n, (name, role, img, body, details) in enumerate(CARETAKERS, len(TEAM) + 1):
        s = slugify(name)
        yield dict(section="caretakers", slug=s, title=name, body=body, details=details, meta=role, image=img, position=n,
                   email=f"{s.replace('-', '.')}@apple-foundation.org", phone="+91 00000 00000")
    for slug, caps in GALLERY_CAPTIONS.items():
        for n, cap in enumerate(caps, 1):
            yield dict(section="gallery", title=cap, body=f"{A[slug][1]} · {cap.lower()}.", image=A[slug][0], meta=A[slug][1], parent=slug, position=n)
    for n, (slug, title, year, body) in enumerate(REPORTS, 1):
        yield dict(section="reports", slug=slug, title=title, body=body, meta=year, position=n)
    for n, (title, value) in enumerate(STATS, 1):
        yield dict(section="stats", title=title, body=value, position=n)


COLS = ["section", "slug", "title", "body", "details", "image", "meta", "parent", "email", "phone", "position"]

if __name__ == "__main__":
    with psycopg.connect(os.getenv("DATABASE_URL", "dbname=foodwave")) as c:
        c.execute(Path(__file__).with_name("schema.sql").read_text())
        c.execute("TRUNCATE content RESTART IDENTITY")
        data = [{k: r.get(k, "" if k in ("body", "details") else None) for k in COLS} for r in rows()]
        with c.cursor() as cur:
            cur.executemany(f"INSERT INTO content ({','.join(COLS)}) VALUES ({','.join('%(' + k + ')s' for k in COLS)})", data)
        counts = c.execute("SELECT section, count(*) FROM content GROUP BY section ORDER BY 1").fetchall()
        print(dict(counts))
