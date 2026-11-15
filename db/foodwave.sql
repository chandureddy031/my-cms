--
-- PostgreSQL database dump
--

\restrict rKdPmOujHtelZfRQioOelnFXlUKSGWEs1QsxlLagKwis7EegNuXqWDhgPm7gF6y

-- Dumped from database version 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)
-- Dumped by pg_dump version 18.6 (Ubuntu 18.6-0ubuntu0.26.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.content (
    id integer NOT NULL,
    section text NOT NULL,
    title text NOT NULL,
    body text DEFAULT ''::text NOT NULL,
    image text,
    meta text,
    "position" integer DEFAULT 0 NOT NULL,
    slug text,
    details text DEFAULT ''::text NOT NULL,
    parent text,
    email text,
    phone text,
    CONSTRAINT content_section_check CHECK ((section = ANY (ARRAY['activities'::text, 'reports'::text, 'stories'::text, 'gallery'::text, 'caretakers'::text, 'stats'::text])))
);


--
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.content_id_seq OWNED BY public.content.id;


--
-- Name: donations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.donations (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    amount numeric(12,2) NOT NULL,
    cause text NOT NULL,
    message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT donations_amount_check CHECK ((amount > (0)::numeric))
);


--
-- Name: donations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.donations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: donations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.donations_id_seq OWNED BY public.donations.id;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.settings (
    key text NOT NULL,
    value text NOT NULL
);


--
-- Name: content id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content ALTER COLUMN id SET DEFAULT nextval('public.content_id_seq'::regclass);


--
-- Name: donations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donations ALTER COLUMN id SET DEFAULT nextval('public.donations_id_seq'::regclass);


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.content (id, section, title, body, image, meta, "position", slug, details, parent, email, phone) FROM stdin;
2	activities	Education for Every Child	Free schooling support, books, uniforms and evening tuition for children from poor families.	/assets/education.jpg	Education	2	education	## What we do\nPoverty should never decide whether a child learns. We keep children from low-income families in school and help them catch up when they fall behind.\n\n- Evening learning centres with trained tutors in 12 villages\n- School kits: books, uniforms, bags and stationery every June\n- Scholarships for high-school and college students\n- Digital literacy classes on donated laptops\n\n## How we do it\nOur tutors are young people from the same villages, many of them former students. Parents meet the team every month to see their child's progress, and we work with government schools so children never have to choose between us and their class.\n\n## Your support provides\n- ₹1,000 gives a child a full school kit\n- ₹2,500 funds a month of evening tuition for ten children\n- ₹10,000 sponsors a college scholarship for a year	\N	\N	\N
3	activities	Community Health	Mobile clinics, health camps, mother-and-child care and health awareness in rural villages.	/assets/health.jpg	Community Health	3	community-health	## What we do\nThe nearest hospital can be hours away. We bring basic healthcare to the village itself.\n\n- A mobile clinic that visits each partner village twice a month\n- Pregnancy check-ups, nutrition support and newborn care\n- Screening camps for diabetes, blood pressure, anaemia and eyesight\n- Clean water and hygiene awareness in schools and homes\n\n## How we do it\nOur doctors and nurses work with local health workers who follow up between visits. Serious cases are referred to partner hospitals, and we arrange transport so cost never stops treatment.\n\n## Your support provides\n- ₹500 pays for a mother's pregnancy check-up and supplements\n- ₹2,500 runs the mobile clinic for one day\n- ₹5,000 sponsors a full screening camp	\N	\N	\N
4	activities	Disability Wellbeing	Assistive devices, therapy and inclusive skill training for persons with disabilities.	/assets/disability.jpg	Disability Wellbeing	4	disability-wellbeing	## What we do\nWe help persons with disabilities live with independence, dignity and a place in their community.\n\n- Wheelchairs, hearing aids, crutches and other assistive devices\n- Physiotherapy and speech therapy sessions at our centre and at home\n- Inclusive skill training and help finding work\n- Support with disability certificates and government benefits\n\n## How we do it\nEvery person gets a care plan made with their family. Our therapists train family members to continue exercises at home, and we visit regularly to adjust the plan.\n\n## Your support provides\n- ₹1,000 covers four therapy sessions\n- ₹5,000 provides a wheelchair\n- ₹10,000 supports a year of skill training for one person	\N	\N	\N
5	activities	Careers & Livelihood	Vocational training, job fairs and small-business support for young people and women.	/assets/careers.jpg	Careers & Livelihood	5	careers	## What we do\nA steady income changes everything for a family. We train young people and women for real jobs and help them start small businesses.\n\n- Courses in tailoring, computer skills, electrical work and mobile repair\n- Spoken English and interview preparation\n- Job fairs with local employers\n- Small grants and mentoring for first-time entrepreneurs\n\n## How we do it\nCourses run for three to six months and are designed with local employers so the skills match real openings. After training we stay in touch for a year to help with placement and growth.\n\n## Your support provides\n- ₹2,500 funds a month of training for one student\n- ₹5,000 provides a sewing machine for a new tailor\n- ₹10,000 seeds a small business	\N	\N	\N
6	activities	Agriculture Development	Training farmers in sustainable methods, with seeds, irrigation and better market access.	/assets/agriculture.jpg	Agriculture	6	agriculture	## What we do\nMost families we serve depend on farming. We help small farmers grow more, spend less and sell at a fair price.\n\n- Training in organic and low-cost farming methods\n- Quality seeds and saplings at the start of each season\n- Drip irrigation and rainwater harvesting for dry lands\n- Farmer groups that sell together for better prices\n\n## How we do it\nDemonstration plots in each village let farmers see results before they change their own fields. Our field officers visit through the season, and farmer groups meet monthly to share what works.\n\n## Your support provides\n- ₹1,000 gives a farmer seeds for one season\n- ₹5,000 helps install drip irrigation on a small plot\n- ₹10,000 sets up a village demonstration plot	\N	\N	\N
7	stories	Lakshmi, 72	After losing her family, Lakshmi found companionship and daily meals at our elder centre.	/assets/elder.jpg	Elder Care	1	lakshmi	Lakshmi lived alone for three years after her husband passed away and her son moved to the city. She often skipped meals.\n\nA caretaker found her during a home visit. Today she comes to the day-care centre every morning, has her blood pressure checked every week and leads the afternoon singing group.\n\n"I have a family again," she says.	elder-care	\N	\N
8	stories	Ravi, 14	A farmer's son who now tops his class and dreams of becoming an engineer.	/assets/education.jpg	Education	2	ravi	Ravi was about to drop out of school to help on his father's farm. Our evening tutors helped him catch up in maths and science.\n\nThis year he came first in his class and won a district science fair. He now helps younger children at the learning centre.	education	\N	\N
9	stories	Meena's Farm	Drip irrigation doubled Meena's harvest and income in one season.	/assets/agriculture.jpg	Agriculture	3	meena	Meena farms two acres of dry land. Every summer her crops failed for lack of water.\n\nWith drip irrigation and training from our field officers, she grew vegetables through the summer for the first time. Her income doubled, and three neighbours have now installed the same system.	agriculture	\N	\N
10	stories	Anjali's First Steps	Six months of physiotherapy helped eight-year-old Anjali walk to school on her own.	/assets/disability.jpg	Disability Wellbeing	4	anjali	Anjali was born with weak leg muscles and was carried everywhere by her mother.\n\nOur therapists worked with her twice a week and taught her mother exercises for home. After six months, Anjali walked into her classroom by herself.	disability-wellbeing	\N	\N
47	gallery	Seed distribution	Agriculture · seed distribution.	/assets/agriculture.jpg	Agriculture	2	\N		agriculture	\N	\N
11	stories	Sunitha's Tailoring Shop	From a training course to her own shop employing three women.	/assets/careers.jpg	Careers & Livelihood	5	sunitha	Sunitha joined our tailoring course with no income of her own. After six months she received a sewing machine and a small grant.\n\nToday she runs a tailoring shop in her village and has hired three women she trained herself.	careers	\N	\N
12	stories	A Safe Delivery	Regular check-ups at our mobile clinic caught a risk early for Venkatamma and her baby.	/assets/health.jpg	Community Health	6	venkatamma	During a routine check-up, our nurse found that Venkatamma had severe anaemia in her seventh month.\n\nWe arranged treatment and nutrition support and a hospital delivery. Mother and baby are healthy today.	community-health	\N	\N
13	caretakers	Madanmohan Reddy	Founded APPLE to bring care, schooling and health services to the villages he grew up in.	\N	Founder & Chairman	1	madanmohan-reddy	Madanmohan Reddy leads the organisation's vision and partnerships. He started the first elder day-care centre and continues to visit villages every week to listen to families.	team	madanmohan.reddy@apple-foundation.org	+91 00000 00000
15	caretakers	S. Thirupal	Leads the field officers and caretakers who work in our villages every day.	\N	Head of Field Operations	3	s-thirupal	S. Thirupal coordinates village caretakers, the mobile clinic schedule and farmer groups. He is often the first person families call when they need help.	team	s.thirupal@apple-foundation.org	+91 00000 00000
16	caretakers	Lakshmidevi	Leads our education, mother-and-child health and women's livelihood work.	\N	Head of Women & Child Welfare	4	lakshmidevi	Lakshmidevi runs the learning centres and the tailoring and skill courses for women. She mentors many of the young tutors who were once students themselves.	team	lakshmidevi@apple-foundation.org	+91 00000 00000
17	caretakers	Ramesh Naidu	Coordinates health camps, the mobile clinic and hospital referrals.	\N	Community Health Coordinator	5	ramesh-naidu	Ramesh Naidu works with our doctors, nurses and local health workers to plan health camps and follow up on every referral.	team	ramesh.naidu@apple-foundation.org	+91 00000 00000
18	caretakers	Dr. Anita Rao	Medical lead with 15 years in rural healthcare.	/assets/care1.jpg	Medical Lead	6	dr-anita-rao	Dr. Anita Rao leads the mobile clinic and health camps and trains local health workers.	\N	dr.anita.rao@apple-foundation.org	+91 00000 00000
19	caretakers	Suresh Kumar	Coordinates elder day-care centres and home visits.	/assets/care2.jpg	Elder Care Coordinator	7	suresh-kumar	Suresh Kumar manages the elder day-care centres and the weekly home-visit rota.	\N	suresh.kumar@apple-foundation.org	+91 00000 00000
20	caretakers	Priya Nair	Special educator and disability rights advocate.	/assets/care3.jpg	Wellbeing Lead	8	priya-nair	Priya Nair runs therapy sessions and inclusive skill training for persons with disabilities.	\N	priya.nair@apple-foundation.org	+91 00000 00000
21	gallery	Morning at the day-care centre	Elder Care · morning at the day-care centre.	/assets/elder.jpg	Elder Care	1	\N		elder-care	\N	\N
22	gallery	Weekly health check	Elder Care · weekly health check.	/assets/elder.jpg	Elder Care	2	\N		elder-care	\N	\N
23	gallery	Home visit	Elder Care · home visit.	/assets/elder.jpg	Elder Care	3	\N		elder-care	\N	\N
24	gallery	Lunch together	Elder Care · lunch together.	/assets/elder.jpg	Elder Care	4	\N		elder-care	\N	\N
25	gallery	Pension help desk	Elder Care · pension help desk.	/assets/elder.jpg	Elder Care	5	\N		elder-care	\N	\N
26	gallery	Evening learning centre	Education · evening learning centre.	/assets/education.jpg	Education	1	\N		education	\N	\N
27	gallery	School kit day	Education · school kit day.	/assets/education.jpg	Education	2	\N		education	\N	\N
28	gallery	Science fair	Education · science fair.	/assets/education.jpg	Education	3	\N		education	\N	\N
29	gallery	Digital literacy class	Education · digital literacy class.	/assets/education.jpg	Education	4	\N		education	\N	\N
30	gallery	Reading circle	Education · reading circle.	/assets/education.jpg	Education	5	\N		education	\N	\N
31	gallery	Mobile clinic visit	Community Health · mobile clinic visit.	/assets/health.jpg	Community Health	1	\N		community-health	\N	\N
32	gallery	Mother-and-child check-up	Community Health · mother-and-child check-up.	/assets/health.jpg	Community Health	2	\N		community-health	\N	\N
33	gallery	Eye screening camp	Community Health · eye screening camp.	/assets/health.jpg	Community Health	3	\N		community-health	\N	\N
34	gallery	Hygiene awareness at school	Community Health · hygiene awareness at school.	/assets/health.jpg	Community Health	4	\N		community-health	\N	\N
35	gallery	Health worker training	Community Health · health worker training.	/assets/health.jpg	Community Health	5	\N		community-health	\N	\N
36	gallery	Physiotherapy session	Disability Wellbeing · physiotherapy session.	/assets/disability.jpg	Disability Wellbeing	1	\N		disability-wellbeing	\N	\N
37	gallery	Wheelchair handover	Disability Wellbeing · wheelchair handover.	/assets/disability.jpg	Disability Wellbeing	2	\N		disability-wellbeing	\N	\N
38	gallery	Speech therapy	Disability Wellbeing · speech therapy.	/assets/disability.jpg	Disability Wellbeing	3	\N		disability-wellbeing	\N	\N
39	gallery	Skill training	Disability Wellbeing · skill training.	/assets/disability.jpg	Disability Wellbeing	4	\N		disability-wellbeing	\N	\N
40	gallery	Family training at home	Disability Wellbeing · family training at home.	/assets/disability.jpg	Disability Wellbeing	5	\N		disability-wellbeing	\N	\N
41	gallery	Tailoring course	Careers & Livelihood · tailoring course.	/assets/careers.jpg	Careers & Livelihood	1	\N		careers	\N	\N
42	gallery	Computer class	Careers & Livelihood · computer class.	/assets/careers.jpg	Careers & Livelihood	2	\N		careers	\N	\N
43	gallery	Job fair	Careers & Livelihood · job fair.	/assets/careers.jpg	Careers & Livelihood	3	\N		careers	\N	\N
44	gallery	Mobile repair workshop	Careers & Livelihood · mobile repair workshop.	/assets/careers.jpg	Careers & Livelihood	4	\N		careers	\N	\N
45	gallery	New business opening	Careers & Livelihood · new business opening.	/assets/careers.jpg	Careers & Livelihood	5	\N		careers	\N	\N
46	gallery	Demonstration plot	Agriculture · demonstration plot.	/assets/agriculture.jpg	Agriculture	1	\N		agriculture	\N	\N
48	gallery	Drip irrigation	Agriculture · drip irrigation.	/assets/agriculture.jpg	Agriculture	3	\N		agriculture	\N	\N
49	gallery	Farmer group meeting	Agriculture · farmer group meeting.	/assets/agriculture.jpg	Agriculture	4	\N		agriculture	\N	\N
50	gallery	Harvest day	Agriculture · harvest day.	/assets/agriculture.jpg	Agriculture	5	\N		agriculture	\N	\N
51	reports	Annual Report 2025	Reached 48,000 beneficiaries across 120 villages. 92% of funds went directly to programmes.	\N	2025	1	annual-2025		\N	\N	\N
52	reports	Annual Report 2024	Opened 4 new elder day-care centres and 12 learning hubs.	\N	2024	2	annual-2024		\N	\N	\N
53	reports	Audit & Compliance 2025	Independently audited financial statements and governance disclosures.	\N	2025	3	audit-2025		\N	\N	\N
54	stats	Beneficiaries	48,000+	\N	\N	1	\N		\N	\N	\N
55	stats	Villages	120	\N	\N	2	\N		\N	\N	\N
56	stats	Volunteers	1,500	\N	\N	3	\N		\N	\N	\N
57	stats	Years of service	18	\N	\N	4	\N		\N	\N	\N
1	activities	Nightshelter	Day-care centres, home visits, meals and medical check-ups for senior citizens who live alone.	/assets/elder.jpg	Elder Care	1	elder-care	## What we do\r\nMany older people in our villages live alone after their children move to the cities. We make sure no senior citizen goes a day without a meal, a check-up or someone to talk to.\r\n\r\n- Elder day-care centres open six days a week with meals, games and prayer time\r\n- Weekly home visits for seniors who cannot leave the house\r\n- Free monthly medical camps: blood pressure, sugar, eyes and joints\r\n- Help applying for old-age pensions and government health cards\r\n\r\n## How we do it\r\nEach village has a trained caretaker who knows every senior by name. Volunteers keep a simple register of health readings and needs, and our medical team follows up on anyone whose readings change.\r\n\r\n## Your support provides\r\n- ₹500 feeds one senior for a week\r\n- ₹2,500 covers a month of medicines for one person\r\n- ₹5,000 sponsors a full medical camp for a village	\N	\N	\N
14	caretakers	Chandrakanth Reddy	So what is already there is the api.go is simply an file which can catch the error once change so what to do now we need to make it a single handed logic to access entire service  \r\n\r\n \r\n\r\nSendNotification → only method that other services need. \r\n\r\n3 Push methods → only needed by the notification handler itself. \r\n\r\nSo api.go has 4 methods total, but external services depend on only 1.	\N	Director of Programmes	2	chandrakanth-reddy	Chandrakanth Reddy oversees programme planning, field teams and reporting. He makes sure every rupee donated reaches the work it was given for.	team	chandrakanth.reddy@apple-foundation.org	+91 9440986843
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.settings (key, value) FROM stdin;
\.


--
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.content_id_seq', 59, true);


--
-- Name: donations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.donations_id_seq', 7, true);


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: donations donations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT donations_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (key);


--
-- Name: content_section_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX content_section_slug ON public.content USING btree (section, slug) WHERE (slug IS NOT NULL);


--
-- PostgreSQL database dump complete
--

\unrestrict rKdPmOujHtelZfRQioOelnFXlUKSGWEs1QsxlLagKwis7EegNuXqWDhgPm7gF6y

