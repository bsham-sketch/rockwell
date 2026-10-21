(() => {
  try {
const productLinks = [
  ['Cranes', [['Double Girder E.O.T. Crane','products/double-girder-eot.html'],['Single Girder E.O.T. Crane','products/single-girder-eot.html'],['Double Girder H.O.T. Crane','products/double-girder-hot.html'],['Single Girder H.O.T. Crane','products/single-girder-hot.html'],['Goliath / Gantry Crane','products/goliath-gantry-crane.html'],['Manual Gantry Crane','products/manual-gantry-crane.html'],['Hydraulic Jib Crane','products/hydraulic-jib-crane.html'],['Manual Jib Crane','products/manual-jib-crane.html']]],
  ['Hoists', [['Electric Wire Rope Hoist','products/electric-wire-rope-hoist.html'],['Chain Pulley Block','products/chain-pulley-block.html']]],
  ['Winches', [['Electric Power Winch','products/power-electric-winch.html'],['Diesel Engine Winch','products/diesel-winch.html'],['Manual Crab Winch','products/crab-winch.html']]],
  ['Hydro-mechanical', [['Gates & Hydro-mechanical','products/gates-hydro-mechanical.html']]],
  ['Handling', [['Hydraulic Lifting Table','products/hydraulic-lifting-table.html'],['Hand Pallet Truck','products/pallet-truck.html'],['Hydraulic Stacker','products/hydraulic-stacker.html']]]
];

const sitePrefix = location.pathname.includes('/products/') ? '../' : '';
const siteUrl = path => `${sitePrefix}${path}`;

const productMenu = productLinks.map(([group, links]) => `<div class="mega-group"><h3>${group}</h3>${links.map(([name,url]) => `<a href="${siteUrl(url)}">${name}</a>`).join('')}</div>`).join('');
const header = `
  <div class="utility-bar"><div class="wrap utility-inner"><span>Manufacturing in Bahadurgarh since 1985</span><div><a href="tel:+919810005456">+91 98100 05456</a><a href="mailto:vijaygupta@rockwellcranes.com">vijaygupta@rockwellcranes.com</a></div></div></div>
  <header class="site-header"><div class="wrap header-inner">
    <a class="brand" href="${siteUrl('index.html')}" aria-label="Rockwell Hoisto Cranes home"><img src="${siteUrl('assets/img/logo.png')}" width="64" height="50" alt=""><span><b>Rockwell</b><small>Hoisto Cranes Pvt. Ltd.</small></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span><span class="visually-hidden">Open menu</span></button>
    <nav id="primary-nav" class="primary-nav" aria-label="Main navigation"><a href="${siteUrl('index.html')}" aria-current="page">Home</a><a href="${siteUrl('about.html')}">About</a><div class="products-nav"><button type="button" aria-haspopup="true" aria-expanded="false" aria-controls="product-mega">Products</button><div class="mega-menu" id="product-mega"><div class="mega-head"><span class="eyebrow">Product families</span><a href="${siteUrl('products.html')}">All 17 product lines</a></div><div class="mega-grid">${productMenu}</div></div></div><a href="${siteUrl('manufacturing.html')}">Manufacturing</a><a href="${siteUrl('projects.html')}">Projects</a><a href="${siteUrl('clients.html')}">Clients</a><a href="${siteUrl('services.html')}">Services</a><a href="${siteUrl('contact.html')}">Contact</a><a class="quote-link" href="${siteUrl('enquiry.html')}">Request a quote</a></nav>
  </div></header>`;

const footer = `
  <footer class="site-footer"><div class="wrap footer-top"><div class="footer-brand"><img src="${siteUrl('assets/img/logo-white.png')}" width="116" height="66" alt="Rockwell"><p>Designing, manufacturing, erecting and commissioning material handling equipment from Bahadurgarh, Haryana since 1985.</p></div><div><h2>Company</h2><a href="${siteUrl('about.html')}">About</a><a href="${siteUrl('manufacturing.html')}">Manufacturing</a><a href="${siteUrl('projects.html')}">Projects</a><a href="${siteUrl('clients.html')}">Clients</a><a href="${siteUrl('services.html')}">Services</a></div><div><h2>Product range</h2><a href="${siteUrl('products.html')}">All products</a><a href="${siteUrl('products/double-girder-eot.html')}">E.O.T. cranes</a><a href="${siteUrl('products/goliath-gantry-crane.html')}">Goliath / gantry cranes</a><a href="${siteUrl('products/electric-wire-rope-hoist.html')}">Hoists</a><a href="${siteUrl('products/gates-hydro-mechanical.html')}">Gates &amp; hydro-mechanical</a></div><div class="footer-contact"><h2>Get in touch</h2><p>Plot No. 14, Sector-16, HSIIDC,<br>Bahadurgarh - 124507,<br>Distt. Jhajjar, Haryana, India</p><a href="tel:+919810005456">+91 98100 05456</a><a href="tel:+918373937858">+91 83739 37858</a><a href="tel:+919871294625">+91 98712 94625</a><a href="mailto:vijaygupta@rockwellcranes.com">vijaygupta@rockwellcranes.com</a><a href="mailto:info@rockwellcranes.com">info@rockwellcranes.com</a></div></div><div class="wrap footer-bottom"><span>Rockwell Hoisto Cranes (Pvt.) Ltd. · Est. 1985</span><a href="${siteUrl('sitemap.html')}">Sitemap</a><a href="#main">Back to top</a></div></footer>
  <a class="whatsapp" href="https://wa.me/919810005456" aria-label="Contact Rockwell on WhatsApp"><span aria-hidden="true">W</span></a>`;

document.querySelector('[data-site-header]')?.insertAdjacentHTML('afterbegin', header);
document.querySelector('[data-site-footer]')?.insertAdjacentHTML('afterbegin', footer);

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('#primary-nav a').forEach(link => {
  if (link.getAttribute('href').split('/').pop() === currentPage) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});
const productsButton = document.querySelector('.products-nav > button');
const isProductsPage = currentPage === 'products.html' || location.pathname.includes('/products/');
if (isProductsPage) productsButton?.setAttribute('aria-current', 'page');
else productsButton?.removeAttribute('aria-current');
const productMenuWrap = document.querySelector('.products-nav');
const productMega = document.querySelector('#product-mega');
const setProductsOpen = open => {
  productsButton?.setAttribute('aria-expanded', String(open));
  productMega?.classList.toggle('is-open', open);
};
productsButton?.addEventListener('click', event => {
  if (window.matchMedia('(pointer: coarse)').matches && event.detail > 0) setProductsOpen(productsButton.getAttribute('aria-expanded') !== 'true');
  else setProductsOpen(true);
});
productMenuWrap?.addEventListener('pointerenter', () => setProductsOpen(true));
productMenuWrap?.addEventListener('pointerleave', () => {
  if (!productMenuWrap.contains(document.activeElement)) setProductsOpen(false);
});
productMenuWrap?.addEventListener('focusin', () => setProductsOpen(true));
productMenuWrap?.addEventListener('focusout', event => {
  if (!productMenuWrap.contains(event.relatedTarget)) setProductsOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const mobileOpen = nav?.classList.contains('is-open');
    const productsOpen = productMega?.classList.contains('is-open');
    nav?.classList.remove('is-open'); document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded','false');
    setProductsOpen(false);
    if (mobileOpen) menuButton?.focus();
    else if (productsOpen) productsButton?.focus();
  }
});
  } catch (error) {
    console.error('site.js initialization failed', error);
  }
})();
