(() => {
  try {
const rail = document.querySelector('.product-rail');
document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
  rail?.scrollBy({left: Number(button.dataset.scroll) * rail.clientWidth * .8, behavior: 'smooth'});
}));

document.querySelectorAll('.category-tabs button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.category-tabs button').forEach(tab => tab.classList.toggle('active', tab === button));
  document.querySelectorAll('.product-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  });
  rail?.scrollTo({left: 0, behavior: 'smooth'});
}));

const selectorProducts = {
  cranes: {name:'Double Girder E.O.T. Crane', url:'products/double-girder-eot.html', capacity:'Up to 150 t'},
  hoists: {name:'Electric Wire Rope Hoist', url:'products/electric-wire-rope-hoist.html', capacity:'250 kg – 30 t'},
  winches: {name:'Electric Power Driven Winch', url:'products/power-electric-winch.html', capacity:'1 t – 20 t rope pull'},
  hydro: {name:'Gates & Hydro-Mechanical Equipment', url:'products/gates-hydro-mechanical.html', capacity:'Hydro and irrigation projects'},
  handling: {name:'Hydraulic Operated Stacker', url:'products/hydraulic-stacker.html', capacity:'500 – 2000 kg'}
};
const selector = document.querySelector('.selector-form');
selector?.addEventListener('submit', event => {
  event.preventDefault();
  const type = document.querySelector('#selector-type').value;
  const chosen = selectorProducts[type];
  const capacity = document.querySelector('#selector-capacity').value;
  const span = document.querySelector('#selector-span').value;
  const application = document.querySelector('#selector-application').value;
  const query = new URLSearchParams({product: chosen.name, capacity, span, application});
  const result = document.querySelector('.selector-result');
  result.innerHTML = `Suggested line: <a href="${chosen.url}">${chosen.name}</a> · ${chosen.capacity} &nbsp; <a href="enquiry.html?${query.toString()}">Discuss your requirement ↗</a>`;
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const counters = [...document.querySelectorAll('[data-count]')];
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target; const target = Number(el.dataset.count); const suffix = el.dataset.suffix || '';
    const started = performance.now(); const duration = 1100;
    const tick = now => {
      const progress = Math.min(1, (now - started) / duration);
      const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      el.textContent = value.toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick); observer.unobserve(el);
  }), {threshold:.45});
  counters.forEach(el => observer.observe(el));
}
  } catch (error) {
    console.error('home.js initialization failed', error);
  }
})();
