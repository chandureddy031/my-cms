'use strict';

const fs = require('fs');
const path = require('path');

const card = (icon, title, description) => ({ icon, title, description });

// Starter content, created once on first boot. After that everything is edited in /admin.
const PAGES = [
  {
    title: 'Home', slug: 'home', navOrder: 1,
    metaDescription: 'CARE is a non-profit working for education, health and dignity for every child and family.',
    sections: [
      { __component: 'sections.hero', heading: 'Every child deserves a fair start', subheading: 'CARE works with communities to provide education, healthcare and clean water to families who need it most.', buttonText: 'Help us today', buttonLink: '/donate' },
      { __component: 'sections.stats', heading: 'Our impact so far', items: [{ value: '12,000+', label: 'Children in school' }, { value: '85', label: 'Villages reached' }, { value: '40,000', label: 'Health check-ups' }, { value: '320', label: 'Volunteers' }] },
      { __component: 'sections.cards', heading: 'What we do', intro: 'Three areas where your support changes lives.', items: [card('📚', 'Education', 'Books, uniforms and learning centres for children from low-income families.'), card('🩺', 'Healthcare', 'Free medical camps, nutrition support and maternal care.'), card('💧', 'Clean Water', 'Wells and filters so families have safe drinking water.')] },
      { __component: 'sections.cta', heading: 'Be the reason someone smiles today', text: 'Even a small contribution goes a long way.', buttonText: 'Donate now', buttonLink: '/donate' },
    ],
  },
  {
    title: 'About Us', slug: 'about', navOrder: 2,
    metaDescription: 'Learn about CARE, our mission and our team.',
    sections: [
      { __component: 'sections.hero', heading: 'About CARE', subheading: 'A community-driven NGO founded on the belief that dignity is a right, not a privilege.' },
      { __component: 'sections.text-block', heading: 'Our mission', body: 'We partner with local communities to break the cycle of poverty through education, health and sustainable livelihoods.\n\nEvery programme is designed with the people it serves, so the change lasts long after we leave.' },
      { __component: 'sections.cards', heading: 'Our values', items: [card('🤝', 'Community first', 'Local people lead every project.'), card('🔍', 'Transparency', 'Every rupee is accounted for and reported.'), card('🌱', 'Sustainability', 'We build solutions that last.')] },
    ],
  },
  {
    title: 'Programs', slug: 'programs', navOrder: 3,
    metaDescription: 'CARE programmes in education, health and water.',
    sections: [
      { __component: 'sections.hero', heading: 'Our programs', subheading: 'Focused, measurable work in the areas that matter most.' },
      { __component: 'sections.cards', heading: 'Current programs', items: [card('🏫', 'Learning Centres', 'After-school centres with tutors, meals and digital literacy.'), card('🍎', 'Nutrition Drive', 'Monthly nutrition kits for children under five.'), card('🏥', 'Mobile Clinics', 'Doctors travelling to remote villages every week.'), card('🚰', 'Water for All', 'Building and maintaining community wells.')] },
      { __component: 'sections.cta', heading: 'Want to support a program?', text: 'Choose an amount and we will put it to work.', buttonText: 'Support a program', buttonLink: '/donate' },
    ],
  },
  {
    title: 'Contact', slug: 'contact', navOrder: 4,
    metaDescription: 'Get in touch with CARE.',
    sections: [
      { __component: 'sections.hero', heading: 'Contact us', subheading: 'We would love to hear from you.' },
      { __component: 'sections.contact-info', heading: 'Reach us', address: '12 Hope Street\nHyderabad, India', email: 'hello@care.org', phone: '+91 90000 00000', hours: 'Mon – Sat, 9:00 AM – 6:00 PM' },
    ],
  },
  {
    title: 'Donate', slug: 'donate', navOrder: 5,
    metaDescription: 'Help CARE with a donation.',
    sections: [
      {
        __component: 'sections.donation-form', heading: 'Do you want to help us?', intro: 'Fill in your details and choose an amount. Our team will contact you to complete your contribution.',
        nameLabel: 'Full name', emailLabel: 'Email', phoneLabel: 'Phone', cityLabel: 'City',
        amountLabel: 'Amount', amountOptions: '500, 1000, 2500, 5000', currency: '₹',
        helpTypeLabel: 'I want to support', helpTypeOptions: 'Where it is needed most, Education, Healthcare, Clean Water',
        messageLabel: 'Message (optional)', submitText: 'Send', sendingText: 'Sending…', errorText: 'Something went wrong. Please check your details and try again.',
        successTitle: 'Thank you! 💙', successMessage: 'Your details have been received. Our team will reach out to you shortly.', successButtonText: 'Back to home',
      },
    ],
  },
];

const PUBLIC_ACTIONS = ['api::page.page.find', 'api::page.page.findOne', 'api::site.site.find', 'api::donation.donation.create'];

module.exports = {
  register({ strapi }) {
    // Serve the website shell for page routes (/about, /donate, ...) that nothing else handled.
    const shell = path.join(strapi.dirs.static.public, 'index.html');
    // "/" is handled up front because Strapi's public middleware always redirects it to /admin.
    strapi.server.use(async (ctx, next) => {
      if (!(ctx.method === 'GET' && ctx.path === '/')) {
        await next();
        if (ctx.status !== 404 || ctx.method !== 'GET' || path.extname(ctx.path) || /^\/(api|admin)(\/|$)/.test(ctx.path)) return;
      }
      ctx.type = 'html';
      ctx.status = 200;
      ctx.body = fs.createReadStream(shell);
    });
  },

  async bootstrap({ strapi }) {
    const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
    for (const action of PUBLIC_ACTIONS) {
      const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: role.id } });
      if (!exists) await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: role.id } });
    }

    if (!(await strapi.documents('api::site.site').findFirst())) {
      await strapi.documents('api::site.site').create({
        data: { logoText: 'CARE', siteName: 'CARE Foundation', footerText: '© CARE Foundation. Together we care.', notFoundText: 'Page not found.', errorText: 'Could not load the page. Please refresh.' },
      });
    }
    if ((await strapi.documents('api::page.page').count()) === 0) {
      for (const data of PAGES) await strapi.documents('api::page.page').create({ data, status: 'published' });
    }
  },
};
