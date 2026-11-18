"""Reset page content to the starting set. Donations and site settings are untouched."""
import os
from pathlib import Path

import psycopg

A = {  # activity slug -> (image, label). Slugs stay the same so image file names stay the same.
    "elder-care": ("/assets/elder.jpg", "Elder Care"),
    "education": ("/assets/education.jpg", "Education"),
    "community-health": ("/assets/health.jpg", "Mental Health"),
    "disability-wellbeing": ("/assets/disability.jpg", "Women & Child"),
    "careers": ("/assets/careers.jpg", "Livelihoods"),
    "agriculture": ("/assets/agriculture.jpg", "Natural Farming"),
}

# Content from APPLES' own documents (WEB Pages Content, Organisation Profile, Brief Report 2021-22).
ACTIVITIES = [
    ("elder-care", "Care & Support for Elderly and Orphans",
     "Restoring dignity, rebuilding families, reconnecting lives. A community-based care, protection and family reintegration initiative for vulnerable elderly people in Anantapur district.",
     """## Our belief: no elderly person should be left alone

Growing old should be a journey of dignity, love, security and belonging. Unfortunately, for many elderly people, particularly those who are abandoned, neglected, socially isolated or without adequate family support, old age becomes a period of loneliness, insecurity and uncertainty.

Some are left without a safe place to stay, some struggle with health problems, and others suffer silently because they have lost meaningful relationships with their families and communities. Beyond their immediate physical needs, what many of them desperately need is someone who listens to them, understands their feelings, offers emotional support and makes them feel that they still matter.

At APPLES, we believe that every elderly person deserves more than shelter; they deserve respect, affection, companionship and the right to live with dignity. With this belief, APPLES has initiated a community-based care and family reintegration programme for vulnerable elderly and abandoned persons in Anantapur district.

Our vision is simple but powerful: to transform abandoned lives into valued lives, loneliness into companionship, and separation into family reunion.

## Our approach: care first, reconnect next, reintegrate always

Unlike an approach that treats institutional shelter as the final solution, APPLES follows a community-oriented and relationship-centred model. Shelter is sometimes necessary, but restoring a person's sense of belonging and reconnecting them with their family and society is equally important. Our programme brings together five essential dimensions of care.

## A. Community identification and outreach

We identify vulnerable, abandoned, neglected and homeless elderly people through community outreach in Bukkarayasamudram, Narpala and Garladinne Mandals and the urban slum areas of Anantapur district. We work with local government representatives, community members, volunteers and concerned citizens to identify people who need immediate attention and support.

## B. Immediate protection and temporary shelter

For elderly people who have no safe place to stay, we facilitate temporary and night-shelter support. This provides immediate protection, a safe environment and an opportunity to address their urgent needs while exploring sustainable care solutions.

## C. Emotional support, counselling and health care

Loneliness, emotional distress and social isolation can be as painful as physical hardship. Through compassionate interaction, counselling, companionship and health support, we help elderly people regain confidence, emotional stability and a sense of self-worth. We also facilitate access to appropriate health services and support systems.

## D. Family tracing, counselling and reintegration

This is the heart of our programme. Instead of treating separation from family as irreversible, we make sincere efforts to identify family members, understand the circumstances behind the separation and begin a dialogue.

We counsel family members and help them understand their moral, emotional and social responsibility towards their elderly parents and relatives. Through continuous communication, mediation and follow-up, we encourage families to accept their responsibilities and provide a caring environment. Whenever it is safe, appropriate and in the best interests of the elderly person, we facilitate family reunification and support their transition back into family life.

## E. Social reintegration and community participation

For those who cannot return to their families, we explore alternative community-based support and care arrangements. We encourage community participation, social connections and volunteer involvement so that no elderly person feels forgotten or excluded. Our objective is not simply to extend someone's life, but to make that life meaningful, respected and connected.

## Our impact: 48 lives reconnected with families

Through sustained community outreach, emotional support, counselling and family intervention, APPLES has so far facilitated the reintegration of nearly 48 elderly and abandoned persons with their families. They have returned to family life and are now leading more dignified and happier lives with their family members.

At present, APPLES is extending care and support services to 42 vulnerable elderly and abandoned persons.

Each successful reunion represents a relationship restored, a family encouraged to accept responsibility and a human life given another opportunity for happiness and belonging. Our impact is not just about providing shelter; it is about helping people find their way back to a home, a family and a community.

## Our vision for the future: building a caring community

Caring for elderly people cannot rest with one organisation alone. It requires a collective commitment from families, local communities, government institutions, volunteers, civil society organisations and philanthropic supporters. We aspire to strengthen and expand this programme by:

- Extending community outreach to identify more abandoned, neglected and vulnerable elderly people
- Strengthening temporary shelter and essential care facilities
- Improving access to health services, counselling and emotional support
- Building a systematic family tracing, counselling and reintegration mechanism
- Developing a network of trained community volunteers and local support groups
- Establishing regular follow-up to promote sustainable family reintegration
- Creating greater public awareness about the rights, dignity and care of elderly people

Our long-term vision is a sustainable community-based elderly care model that can be strengthened locally and replicated in other vulnerable communities.

## Become a partner in restoring dignity

The need for elderly care and protection is increasing, and sustaining this programme requires committed partnerships and continuous financial and community support. APPLES invites CSR partners, philanthropic foundations, individual donors, corporate employees, local institutions, volunteers and socially responsible citizens to join hands with us.

Your contribution can help provide temporary shelter, nutritious food, health support, counselling, family tracing, transport for family reunification, community outreach and essential care services. We particularly welcome long-term partnerships and programme sponsorships that ensure continuity of care for the 42 elderly people currently receiving our support.

Every contribution can become a source of hope. Every act of compassion can restore a relationship. Every partnership can help an elderly person rediscover the meaning of home.

## Our commitment

We do not believe that an elderly person should spend the final chapter of life in loneliness, neglect or uncertainty. Every elderly person deserves to be heard, cared for, respected and loved. Let us build a society where growing old does not mean growing alone.

"A shelter may protect a life, but a family can restore its happiness."

APPLES – Together, let us bring them home."""),

    ("education", "Education & Child Rights",
     "Protecting childhood, enabling inclusion, building brighter futures. An integrated child rights, inclusive education and family-based development initiative.",
     """## Our vision: every child deserves a safe, inclusive and happy childhood

Childhood is the foundation of every human life. Every child, irrespective of family background, disability, economic circumstances or social identity, deserves the opportunity to learn, grow, play and build a bright future.

However, children from poor, vulnerable and marginalised communities continue to face many challenges. Poverty, parental migration, lack of educational opportunities, disability-related barriers, child labour, child trafficking, early marriage and exploitation deprive many children of their fundamental rights.

Children with intellectual and developmental disabilities need special educational attention, learning materials and continuous support from parents and teachers. Children whose parents migrate for work often face interrupted schooling, nutritional insecurity and emotional distress. Girls and other vulnerable children are particularly exposed to exploitation, trafficking, child labour and early marriage.

These challenges cannot be addressed through education alone. Children need protection, inclusive learning, nutritional support, emotional care and a supportive family and community. APPLES has therefore developed an integrated approach that connects child rights protection, inclusive education, family support and community awareness. Our commitment is that no child is denied education, protection, dignity or the chance to realise their potential because of poverty, disability or family circumstances.

## Our approach: protect, include, educate and empower

APPLES implements its child development initiatives in Bukkarayasamudram, Narpala and Garladinne Mandals and Anantapur urban slum areas, with the cooperation of local government institutions, community organisations and development partners. Our approach focuses on four connected areas.

## A. Inclusive education for children with special needs

Every child learns differently, and children with intellectual and developmental disabilities deserve equal opportunities to learn and develop according to their abilities.

In collaboration with NIPED, Hyderabad, APPLES organised a specialised screening and assessment camp for children below 18 years at the MPDO Office, Bukkarayasamudram. Specialists from NIPED Hyderabad, RDT and AVHV Anantapur took part in the assessment.

A total of 124 children from different villages of Bukkarayasamudram Mandal attended the camp. After assessment, 89 eligible children received educational kits for children with special needs, supported by NIPED Hyderabad. Parents were oriented on using the materials regularly and taking an active part in their children's learning, because educational materials become meaningful only with continuous practice, parental involvement and the right guidance.

## B. Child rights protection and prevention of exploitation

Children should never become victims of poverty, neglect, exploitation or social injustice. In vulnerable communities, economic hardship, lack of awareness, family difficulties and social inequality increase the risks of child labour, trafficking, sexual exploitation and early marriage.

In collaboration with HANDS NGO under the GAA Programme, APPLES is creating awareness among families and communities in the project villages about child protection, children's rights and the importance of education. Our focus includes:

- Creating awareness about child rights and protection
- Preventing child labour, trafficking and sexual exploitation
- Addressing the risks of early marriage, particularly among girls
- Encouraging parents to prioritise children's education and safety
- Strengthening community responsibility for identifying and responding to child protection concerns
- Encouraging collective action by local institutions, community leaders and development organisations

Protecting children requires not only responding to exploitation but also addressing the reasons that make children vulnerable.

## C. Seasonal hostel: keeping children in school and families together

When parents migrate for seasonal and daily-wage work, children may face interrupted education, poor nutrition, emotional insecurity and separation from their families.

To address this, APPLES runs a Seasonal Hostel at Dayyalakuntapalli MPPS, Narpala Mandal, with the support of Andhra Pradesh Samagra Shiksha, for children from the Buduga Jangala community. The hostel is designed to support 50 children and provides:

- Quality, nutritious food
- A safe and supportive learning environment
- Special teaching and academic support after school hours
- Educational and study materials
- Extra-curricular and recreational activities
- Emotional support and opportunities for social development
- Encouragement to continue education without interruption

We also encourage parents to find and continue local livelihood opportunities so that families can stay together instead of being separated by seasonal migration. Children feel more secure, confident and motivated when they grow up with the love and support of their parents. A child's education becomes stronger when the family becomes stronger.

## D. Family and community-based child development

Sustainable child development needs active participation from parents, teachers, community members and local institutions. Through counselling, community interaction, educational support and awareness activities, we encourage families to create safe and supportive environments where children can learn, build confidence and pursue their aspirations. Our aim is communities where children are protected, families are strengthened and education is a shared responsibility.

## Our achievements

- 124 children took part in the screening and assessment camp for intellectual and developmental disabilities
- 89 eligible children received special educational kits supported by NIPED Hyderabad
- 50 children are supported through the Seasonal Hostel at Dayyalakuntapalli MPPS, Narpala Mandal
- 74 children whose parents migrate for work are supported through our education interventions

## Our future priorities

- Expanding inclusive education for children with disabilities
- Increasing access to educational materials and specialised learning support
- Strengthening child protection and community vigilance against exploitation
- Extending seasonal hostel support to more vulnerable children
- Promoting nutrition, health and emotional wellbeing
- Strengthening parental counselling and family-based livelihood opportunities
- Developing community volunteers and child protection awareness networks
- Strengthening coordination with schools, government departments and development organisations

## Join hands with APPLES: invest in children, invest in the future

APPLES invites CSR partners, philanthropic foundations, international development organisations, educational institutions, individual donors, volunteers and socially responsible citizens to join us. Your support can contribute to seasonal hostel facilities and nutritious food, inclusive learning materials, special educational support for children with disabilities, child rights awareness and protection, health and counselling support, extra-curricular activities and parental awareness.

When we protect a child, we protect a future. When we educate a child, we empower a generation. When we strengthen a family, we build a stronger community."""),

    ("community-health", "Community Mental Health & Wellbeing",
     "Community awareness, inclusion and access to mental health services for persons with disabilities, persons with mental health conditions and their caregivers.",
     """## Community awareness, inclusion and access to mental health services

As part of our community-based development programme in two mandals of Anantapur district, Andhra Pradesh, APPLES organised community awareness and inclusion activities in the project villages to mark World Mental Health Day (10 October) and the International Day of Persons with Disabilities (3 December).

More than 200 people took part, including persons with disabilities, persons with mental health conditions, their parents, family members and caregivers. The programmes brought the community together to promote inclusion, address stigma and build awareness of the rights, needs and challenges of persons with disabilities and persons with mental health conditions.

## Rallies, meetings and cultural programmes

The events began with awareness rallies through the village streets, carrying colourful banners and placards on disability inclusion, mental health awareness, access to healthcare, caregiver support and community responsibility. Public meetings followed, where caregivers, community members and other stakeholders shared their experiences and discussed the challenges faced by vulnerable people and their families.

The cultural programmes were particularly effective in drawing public attention. Through performances and awareness presentations, participants highlighted the emotional, social and economic challenges caregivers face, the difficulty of reaching the right referral services for persons with mental health conditions, and the care needs of persons with profound disabilities.

## 92 people referred for treatment

As a result of the awareness and referral work, 92 persons with mental health conditions and other general health problems were identified and referred to government hospitals for psychiatric and general medical consultations. They received medical services and medicines, and the project team continues to support their medication follow-up.

This follow-up has brought noticeable improvements in the wellbeing and daily functioning of several persons with mental health conditions. Caregivers report positive changes in behaviour, daily functioning and confidence, and less anxiety and burden for the family. Some caregivers now feel confident enough to leave their family member at home for reasonable periods while they attend to their livelihoods and household responsibilities.

## More health and wellbeing work

- Medical assistance: a general health camp for senior citizens and persons with profound disabilities, where 48 people received medicines for fever, body pain, blood pressure and sugar, supported by medical representatives, medical shop owners, village leaders, health staff and individual donors
- Mobility aids: physically disabled persons and senior citizens who struggle with daily mobility were identified and referred to the orthopaedic workshop for mobility aids, so they can live without depending on others
- Blood and organ donation awareness: public awareness camps for youth, college students and self-help groups of farmers and women through meetings, rallies, posters and cultural events

## What this shows

These community programmes have strengthened awareness, reduced social barriers, promoted inclusion and improved links between vulnerable people and government health services. Combining community awareness, cultural communication, healthcare referrals and continuous family support promotes the wellbeing, dignity and social participation of persons with disabilities and persons with mental health conditions."""),

    ("disability-wellbeing", "Women & Child Empowerment",
     "Promoting health, family wellbeing and economic independence for women and adolescent girls, with SERP-supported women's self-help groups.",
     """## Promoting health, family wellbeing and economic independence

APPLES, in collaboration with women's self-help groups supported by SERP (Society for Elimination of Rural Poverty), is implementing women's empowerment and livelihood development initiatives in two mandals of Anantapur district, Andhra Pradesh. The programme aims to empower women and adolescent girls by strengthening their health awareness, family care, skills, financial inclusion and economic independence.

## Health and family wellbeing

The programme places special emphasis on women's understanding of healthcare, family wellbeing, child care and a healthy, supportive home environment. Through community awareness activities and engagement with women's groups, women and adolescent girls are encouraged to make informed decisions about their health, their families and their future.

## Skills and livelihoods

Women are motivated and supported to identify income-generating activities that suit their skills, interests, local market opportunities and family circumstances. Training and skill development are provided in activities such as:

- Running petty shops
- Vegetable vending
- Tailoring
- Other small-scale enterprises

The programme also links women with banks to access financial assistance for starting or strengthening their livelihood activities.

## 92 women running their own livelihoods

92 women have taken part in skill development and livelihood initiatives, accessed financial support through banks and set up their own income-generating activities. Many now manage their businesses independently and contribute to household expenses, children's education, family healthcare and other essential needs.

The initiative has brought positive changes in women's confidence, decision-making, financial management and social participation. By earning their own income, women are reducing their economic dependence on others and gaining greater recognition and respect in their families and communities. Their work is also strengthening family stability and improving quality of life.

## Our commitment

With SERP-linked women's groups and financial institutions, APPLES continues to build an environment where women and adolescent girls can develop their potential, access opportunities and lead dignified, independent and economically secure lives, through health awareness, family wellbeing, skill development, financial inclusion and sustainable livelihoods."""),

    ("careers", "Sustainable Livelihood Development",
     "Empowering the rural poor through economic independence and dignified living.",
     """## Empowering the rural poor through economic independence

APPLES is implementing the Sustainable Livelihood Development Programme in two mandals of Anantapur district, Andhra Pradesh, to improve the economic conditions, living standards and social dignity of rural poor families. The programme helps vulnerable individuals and families build sustainable income-generating activities, strengthen their financial security and lead independent lives with dignity and self-confidence.

## How it works

Through community-based identification, motivation, guidance and livelihood support, the programme encourages people to explore opportunities that suit their skills, local resources and market demand. It aims to reduce economic dependency, improve household income and help people take an active part in family and community development.

## 54 members earning independently

A total of 54 members have benefited by setting up and managing their own livelihood activities. They now earn independently and use their income for household expenses, their children's education, healthcare and their family's overall wellbeing. Earning has also made them more financially responsible and more confident in decisions about their families and livelihoods.

## More than income

Beneficiaries report greater self-confidence, social recognition and respect within their families and communities. Earning independently has strengthened their place in household decisions and helped them lead more dignified, self-reliant lives. Their success is also motivating other rural families to explore livelihood opportunities.

Sustainable livelihood development is not only about earning an income; it is about building confidence, resilience, self-reliance and dignity. By helping the rural poor develop their own livelihoods, the programme contributes to stronger families, inclusive communities and sustainable rural development.

## Related work: MGNREGS

APPLES and government MGNREGS staff jointly organised awareness meetings on the Mahatma Gandhi National Rural Employment Guarantee Scheme, which provides guaranteed wage employment to rural households to increase family income, provide work locally and reduce migration. About 1,640 beneficiaries have obtained job cards and are working under the scheme in the project villages."""),

    ("agriculture", "Zero Budget Natural Farming (ZBNF)",
     "Promoting sustainable agriculture, farmer empowerment and ecological wellbeing with Rythu Sadhikara Samstha (RySS).",
     """## Sustainable agriculture for small and marginal farmers

APPLES is committed to sustainable agriculture and better livelihoods for rural farming communities through environmentally friendly, low-cost farming practices. With the support of Rythu Sadhikara Samstha (RySS), APPLES is implementing the Andhra Pradesh Zero Budget Natural Farming (APZBNF) programme among small, marginal and Below Poverty Line (BPL) farmers in the Venkatapuram Cluster of Anantapur district, Andhra Pradesh.

The Government of Andhra Pradesh, through the Department of Agriculture, implements APZBNF through RySS, an organisation dedicated to farmers' empowerment. APPLES has signed a Memorandum of Understanding (MoU) with RySS to implement natural farming at the grassroots level and help farmers move to sustainable, low-cost and ecologically responsible agriculture.

## Programme objectives

The programme aims to reduce farmers' dependence on chemical fertilisers, pesticides and costly external inputs by promoting locally available natural resources and traditional farming knowledge combined with scientific approaches. It encourages practices that protect soil health, conserve water, improve biodiversity, reduce cultivation costs and strengthen the economic resilience of farming households, with special focus on small, marginal and economically vulnerable farmers.

## Capacity building and knowledge transfer

APPLES staff have attended a series of state- and district-level training programmes under APZBNF, building their technical knowledge and practical understanding of natural farming. They pass these skills on to farmers through village meetings, demonstrations, practical training, field visits and continuous follow-up, encouraging farmers to learn by doing and to combine different practices on their own land.

## Natural farming practices we promote

- Ghana Jeevamrutham and Drava Jeevamrutham: solid and liquid natural inputs made from local ingredients to support soil life, improve fertility and encourage beneficial micro-organisms
- Dry sowing: timely sowing and efficient use of soil moisture under rain-fed conditions, with guidance on crop selection and moisture management
- Kitchen gardens: fresh vegetables grown with natural farming methods around homes, for household food security, nutrition and lower vegetable costs
- Five-layer model: different plants and crops grown together on the same land for better land use, diversified production, biodiversity and year-round produce

## Achievements and community impact

A total of 640 farmers in the Venkatapuram Cluster are actively practising Zero Budget Natural Farming methods: preparing natural inputs, developing kitchen gardens, practising dry sowing and implementing the five-layer model according to their needs and resources.

Farmers are gradually reducing their dependence on expensive external inputs, lowering cultivation costs, improving soil health and managing resources more efficiently. Regular interaction with field staff, training and peer learning have built their confidence, and farmers now encourage others in their villages to adopt sustainable practices. Kitchen gardens have also improved household food production and nutrition awareness.

## Way forward

In partnership with RySS, APPLES continues to strengthen natural farming through capacity building, technical guidance, field demonstrations and community engagement, building a strong foundation for sustainable agriculture that uses local resources, protects the environment, improves soil health, reduces costs and strengthens livelihoods.

Healthy soil, sustainable farming and empowered farmers are the foundations of a prosperous and environmentally responsible rural community."""),
]

# Photo per story: the most relevant of APPLES' own photos for that result.
STORY_IMAGES = {
    "48-elders-back-home": "/assets/elder-care-3.jpg",          # elders gathered at the centre
    "89-children-learning-kits": "/assets/education-2.jpg",     # educational kit handover
    "92-people-reach-care": "/assets/community-health-3.jpg",   # awareness rally
    "92-women-own-business": "/assets/disability-wellbeing-1.jpg",  # women's group meeting
    "54-families-earning": "/assets/careers-4.jpg",             # tailoring class
    "640-farmers-natural-farming": "/assets/agriculture-5.jpg", # checking crops with farmers
}

# Real programme results from APPLES' documents (no invented people or quotes).
STORIES = [
    ("48-elders-back-home", "48 elders back with their families", "elder-care",
     "Through outreach, counselling and family tracing, nearly 48 abandoned elderly people have returned to family life.",
     "Many of the elderly people APPLES meets in Anantapur district have been abandoned, neglected or left without a safe place to stay.\n\nOur team identifies them through community outreach, arranges temporary shelter where needed, and offers counselling, companionship and health support. Then comes the heart of the work: tracing their families, understanding why they separated and counselling family members about their responsibility towards their elders.\n\nSo far, nearly 48 elderly and abandoned persons have been reunited with their families and are leading more dignified and happier lives. APPLES is currently caring for 42 more.\n\n\"A shelter may protect a life, but a family can restore its happiness.\""),
    ("89-children-learning-kits", "89 children receive special learning kits", "education",
     "A screening camp with NIPED Hyderabad assessed 124 children; 89 received educational kits for children with special needs.",
     "Children with intellectual and developmental disabilities need the right learning materials and continuous support at home.\n\nAPPLES, with NIPED Hyderabad, organised a screening and assessment camp at the MPDO Office, Bukkarayasamudram, with specialists from NIPED Hyderabad, RDT and AVHV Anantapur. 124 children under 18 from villages across Bukkarayasamudram Mandal attended.\n\nAfter assessment, 89 eligible children received special educational kits supported by NIPED Hyderabad, and their parents were shown how to use the materials with their children every day."),
    ("92-people-reach-care", "92 people reach mental health care", "community-health",
     "Awareness and referral work connected 92 people with mental health conditions and other health problems to government hospitals.",
     "On World Mental Health Day and the International Day of Persons with Disabilities, more than 200 people joined APPLES' rallies, meetings and cultural programmes in the project villages.\n\nThe awareness and referral work identified 92 persons with mental health conditions and other health problems, who were referred to government hospitals for psychiatric and general consultations and received treatment and medicines.\n\nWith continued follow-up, caregivers report better behaviour, daily functioning and confidence, and some can now leave their family member at home for a while to go to work."),
    ("92-women-own-business", "92 women start their own livelihoods", "disability-wellbeing",
     "With SERP-supported self-help groups and bank linkages, 92 women now run their own income-generating activities.",
     "Through APPLES' women's empowerment programme with SERP-supported self-help groups, women received training in petty shops, vegetable vending, tailoring and other small enterprises, and help to access bank finance.\n\n92 women have set up their own income-generating activities. Many now manage their businesses independently and contribute to household expenses, their children's education and family healthcare.\n\nThey report greater confidence, a stronger voice in family decisions and more respect in their communities."),
    ("54-families-earning", "54 members earning on their own", "careers",
     "The Sustainable Livelihood Development Programme helped 54 members set up and manage their own livelihoods.",
     "The Sustainable Livelihood Development Programme helps rural poor families find income-generating activities that suit their skills, local resources and market demand.\n\n54 members have set up and are managing their own livelihood activities. They use their earnings for household expenses, children's education and healthcare.\n\nBeyond income, they report more self-confidence and respect at home and in the community, and their success is encouraging other families to follow."),
    ("640-farmers-natural-farming", "640 farmers practise natural farming", "agriculture",
     "In the Venkatapuram Cluster, 640 farmers are using Zero Budget Natural Farming methods with APPLES and RySS.",
     "Under the Andhra Pradesh Zero Budget Natural Farming programme, APPLES works with small, marginal and BPL farmers in the Venkatapuram Cluster of Anantapur district.\n\nAfter village meetings, demonstrations and field visits by trained staff, 640 farmers are now preparing Ghana and Drava Jeevamrutham, practising dry sowing, growing kitchen gardens and using the five-layer model.\n\nThey are reducing their dependence on costly chemical inputs, improving soil health and sharing what they have learned with other farmers in their villages."),
]

TEAM = [  # name, role, intro, details. Only S. Thirupal's bio is from the Organisation Profile; the rest are placeholders to edit in /apple.
    ("S. Thirupal", "Founder & Secretary", "Founded APPLES in 1995, inspired by Sri S.R. Sankaran IAS, with a motto of social justice and community development.",
     "S. Thirupal is the founder and Secretary (chief functionary) of APPLES. Inspired by Sri S.R. Sankaran IAS, who dedicated his life to the welfare of poor, deprived and marginalised communities, he founded the society in 1995 to work for social justice and community development in the rural villages and urban slums of Anantapur district."),
    ("Madanmohan Reddy", "Chairman", "Guides APPLES' programmes and partnerships.",
     "Madanmohan Reddy guides the organisation's programmes and partnerships and works closely with the field team and partner organisations."),
    ("Chandrakanth Reddy", "Director of Programmes", "Plans and runs APPLES' programmes, from elder care to natural farming.",
     "Chandrakanth Reddy oversees programme planning, field teams and reporting. "),
    ("Lakshmidevi", "Head of Women & Child Welfare", "Leads our education, women and child work.",
     "Lakshmidevi works on APPLES' education, child rights and women's empowerment programmes."),
    ("Ramesh Naidu", "Community Health Coordinator", "Coordinates health camps and hospital referrals.",
     "Ramesh Naidu works with local health staff to organise health camps and follow up on referrals."),
]

CARETAKERS = [  # placeholders; image None = initials (no stock portraits)
    ("Dr. Anita Rao", "Medical Lead", None, "Medical lead with 15 years in rural healthcare.", "Dr. Anita Rao leads the mobile clinic and health camps and trains local health workers."),
    ("Suresh Kumar", "Elder Care Coordinator", None, "Coordinates elder day-care centres and home visits.", "Suresh Kumar manages the elder day-care centres and the weekly home-visit rota."),
    ("Priya Nair", "Wellbeing Lead", None, "Special educator and disability rights advocate.", "Priya Nair runs therapy sessions and inclusive skill training for persons with disabilities."),
]

GALLERY_CAPTIONS = {  # one per /assets/<slug>-<n>.jpg
    "elder-care": ["Support for an elderly woman", "Meeting with the community", "Elders gathered at the centre", "With the team", "Elders resting at the shelter"],
    "education": ["Special learning kits for children", "Educational kit handover", "Kit distribution with parents", "Children at an outreach event", "Awareness session"],
    "community-health": ["Health consultation", "Health camp registration", "Awareness rally", "Health check for an elder", "Follow-up support"],
    "disability-wellbeing": ["Women's group meeting", "Self-help group session", "Programme meeting", "Women's awareness programme", "Training session"],
    "careers": ["Equipment for a small enterprise", "Livelihood beneficiaries", "Tailoring training", "Tailoring class", "Women learning tailoring"],
    "agriculture": ["Field visit with farmers", "Ploughing with bullocks", "Bullock-drawn sowing", "Natural farming field visit", "Checking crops with farmers"],
}

REPORTS = [  # PDFs in frontend/public/assets
    ("beauty-demand-2026", "Beauty Customer Demand – India & Bengaluru", "2026", "How customers in India and Bengaluru search for and book beauty services.", "/assets/report-beauty-demand-2026.pdf"),
    ("prospectpilot-guide-short", "ProspectPilot AI – Build Guide (Short)", "2026", "Step-by-step build guide, short version.", "/assets/report-prospectpilot-guide-short.pdf"),
    ("prospectpilot-guide", "ProspectPilot AI – Build Guide", "2026", "Step-by-step build guide, full version.", "/assets/report-prospectpilot-guide.pdf"),
]

STATS = [("Years of service", "31"), ("Farmers practising natural farming", "640"), ("Elders reunited with families", "48"), ("Women running own livelihoods", "92")]


CONTACT = ("applesngo4u@gmail.com", "+91 94901 94281")  # Organisation Profile


def slugify(s: str) -> str:
    return "".join(c if c.isalnum() else "-" for c in s.lower()).strip("-").replace("--", "-")


def rows():
    for n, (slug, title, body, details) in enumerate(ACTIVITIES, 1):
        yield dict(section="activities", slug=slug, title=title, body=body, details=details, image=A[slug][0], meta=A[slug][1], position=n)
    for n, (slug, title, parent, body, details) in enumerate(STORIES, 1):
        yield dict(section="stories", slug=slug, title=title, body=body, details=details, image=STORY_IMAGES[slug], meta=A[parent][1], parent=parent, position=n)
    for n, (name, role, body, details) in enumerate(TEAM, 1):
        s = slugify(name)
        yield dict(section="caretakers", slug=s, title=name, body=body, details=details, meta=role, parent="team", position=n,
                   email=CONTACT[0], phone=CONTACT[1])
    for n, (name, role, img, body, details) in enumerate(CARETAKERS, len(TEAM) + 1):
        s = slugify(name)
        yield dict(section="caretakers", slug=s, title=name, body=body, details=details, meta=role, image=img, position=n,
                   email=CONTACT[0], phone=CONTACT[1])
    for slug, caps in GALLERY_CAPTIONS.items():
        for n, cap in enumerate(caps, 1):  # APPLES' own photos: /assets/<activity>-<n>.jpg
            yield dict(section="gallery", title=cap, meta=A[slug][1], parent=slug, position=n, image=f"/assets/{slug}-{n}.jpg", body="")
    for n, (slug, title, year, body, pdf) in enumerate(REPORTS, 1):
        yield dict(section="reports", slug=slug, title=title, body=body, meta=year, image=pdf, position=n)
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
