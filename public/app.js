// Renders every page from the CMS. Nothing here is content: all text comes from /api.
const api = (p) => fetch('/api/' + p).then((r) => (r.ok ? r.json() : Promise.reject(r)));
let site = {};

// Tiny DOM builder. Uses textContent everywhere, so CMS text can't inject HTML.
function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === '') continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'text') el.textContent = v;
    else el.setAttribute(k, v);
  }
  el.append(...kids.flat().filter((k) => k != null && k !== ''));
  return el;
}
const list = (s) => (s || '').split(',').map((x) => x.trim()).filter(Boolean);
const head = (s, cls) => [s.heading && h('h2', { text: s.heading }), (s.intro || s.text) && h('p', { class: cls || 'lead', text: s.intro || s.text })];
const button = (text, href) => text && href && h('a', { class: 'btn', href, text });

const SECTIONS = {
  'sections.hero': (s) => h('section', { class: 'hero' }, h('div', { class: 'wrap' }, h('h1', { text: s.heading }), h('p', { text: s.subheading }), button(s.buttonText, s.buttonLink))),
  'sections.text-block': (s) => h('section', { class: 'text' }, h('div', { class: 'wrap' }, head(s), (s.body || '').split(/\n\s*\n/).map((p) => h('p', { text: p })))),
  'sections.cards': (s) => h('section', {}, h('div', { class: 'wrap' }, head(s), h('div', { class: 'grid' }, (s.items || []).map((c) => h('div', { class: 'card' }, h('div', { class: 'icon', text: c.icon }), h('h3', { text: c.title }), h('p', { text: c.description })))))),
  'sections.stats': (s) => h('section', {}, h('div', { class: 'wrap' }, head(s), h('div', { class: 'grid' }, (s.items || []).map((x) => h('div', { class: 'stat' }, h('b', { text: x.value }), h('span', { text: x.label })))))),
  'sections.cta': (s) => h('section', { class: 'cta' }, h('div', { class: 'wrap' }, head(s, ' '), button(s.buttonText, s.buttonLink))),
  'sections.contact-info': (s) => h('section', { class: 'contact' }, h('div', { class: 'wrap' }, head(s), h('dl', {},
    [['📍', s.address], ['✉️', s.email && h('a', { href: 'mailto:' + s.email, text: s.email })], ['📞', s.phone && h('a', { href: 'tel:' + s.phone.replace(/\s/g, ''), text: s.phone })], ['🕘', s.hours]]
      .filter(([, v]) => v).map(([k, v]) => [h('dt', { text: k }), h('dd', {}, v)])))),
  'sections.donation-form': donationForm,
};

function donationForm(s) {
  const box = h('div', { class: 'wrap' });
  const field = (label, name, attrs = {}) => h('label', {}, label, h('input', { name, required: '', ...attrs }));
  const amount = h('input', { name: 'amount', type: 'number', min: '1', step: '1', required: '' });
  const pills = list(s.amountOptions).map((a) => h('button', { type: 'button', text: (s.currency || '') + a, onclick: (e) => {
    amount.value = a.replace(/[^\d.]/g, '');
    pills.forEach((p) => p.classList.toggle('on', p === e.currentTarget));
  } }));
  amount.addEventListener('input', () => pills.forEach((p) => p.classList.remove('on')));
  const err = h('p', { class: 'err', role: 'alert' });
  const submit = h('button', { class: 'btn', type: 'submit', text: s.submitText });

  const form = h('form', { onsubmit: async (e) => {
    e.preventDefault();
    err.textContent = '';
    submit.disabled = true;
    submit.textContent = s.sendingText || s.submitText;
    const data = Object.fromEntries(new FormData(form));
    data.amount = Number(data.amount);
    try {
      await fetch('/api/donations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data }) }).then((r) => (r.ok ? r : Promise.reject(r)));
      box.replaceChildren(h('div', { class: 'success' }, h('div', { class: 'tick', text: '✓' }), h('h2', { text: s.successTitle }), h('p', { text: s.successMessage }), button(s.successButtonText, '/')));
      scrollTo(0, 0);
    } catch {
      err.textContent = s.errorText;
      submit.disabled = false;
      submit.textContent = s.submitText;
    }
  } },
    h('div', { class: 'row' }, field(s.nameLabel, 'fullName', { maxlength: '120', autocomplete: 'name' }), field(s.emailLabel, 'email', { type: 'email', autocomplete: 'email' })),
    h('div', { class: 'row' }, field(s.phoneLabel, 'phone', { type: 'tel', maxlength: '20', autocomplete: 'tel' }), h('label', {}, s.cityLabel, h('input', { name: 'city', maxlength: '80', autocomplete: 'address-level2' }))),
    list(s.helpTypeOptions).length > 0 && h('label', {}, s.helpTypeLabel, h('select', { name: 'helpType' }, list(s.helpTypeOptions).map((o) => h('option', { text: o })))),
    h('label', {}, s.amountLabel, h('div', { class: 'amounts' }, pills), amount),
    h('label', {}, s.messageLabel, h('textarea', { name: 'message', rows: '4', maxlength: '2000' })),
    err, h('div', {}, submit));
  box.append(...head(s), form);
  return h('section', {}, box);
}

async function render() {
  const slug = decodeURIComponent(location.pathname.replace(/^\/|\/$/g, '')) || 'home';
  const app = document.getElementById('app');
  document.querySelectorAll('nav a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === location.pathname));
  try {
    const { data } = await api(`pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[sections][populate]=*`);
    const page = data[0];
    document.title = page ? `${page.title} · ${site.siteName || site.logoText || ''}` : site.notFoundText || '';
    document.querySelector('meta[name=description]').content = page?.metaDescription || '';
    app.replaceChildren(...(page ? page.sections.map((s) => SECTIONS[s.__component]?.(s)).filter(Boolean) : [h('p', { class: 'msg', text: site.notFoundText })]));
  } catch {
    app.replaceChildren(h('p', { class: 'msg', text: site.errorText }));
  }
}

async function init() {
  const [siteRes, navRes] = await Promise.all([api('site').catch(() => ({})), api('pages?fields[0]=title&fields[1]=slug&filters[showInNav][$eq]=true&sort=navOrder:asc').catch(() => ({ data: [] }))]);
  site = siteRes.data || {};
  const root = document.documentElement.style;
  if (site.primaryColor) root.setProperty('--blue', site.primaryColor);
  if (site.darkColor) root.setProperty('--dark', site.darkColor);
  if (site.lightColor) root.setProperty('--light', site.lightColor);
  document.getElementById('logo').textContent = site.logoText || '';
  document.getElementById('footer').textContent = site.footerText || '';
  const menu = document.getElementById('menu');
  menu.replaceChildren(...navRes.data.map((p) => h('a', { href: p.slug === 'home' ? '/' : '/' + p.slug, text: p.title })));
  const burger = document.getElementById('burger');
  burger.onclick = () => burger.setAttribute('aria-expanded', menu.classList.toggle('open'));

  // Client-side navigation: internal links re-render without a full reload.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || a.origin !== location.origin || a.target || e.ctrlKey || e.metaKey || /^\/(api|admin|uploads)/.test(a.pathname)) return;
    e.preventDefault();
    menu.classList.remove('open');
    if (a.pathname !== location.pathname) history.pushState(null, '', a.pathname);
    render();
    scrollTo(0, 0);
  });
  addEventListener('popstate', render);
  render();
}
init();
