(() => {
  try {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = document.querySelectorAll('main > section:not(.hero), .catalog-card, .product-card, .sector-card, .service-card, .manufacturing-station, .project-row');
    if (!items.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:.12, rootMargin:'0px 0px -24px 0px'});
    items.forEach(item => { item.classList.add('scroll-reveal'); observer.observe(item); });
    document.documentElement.classList.add('reveal-ready');
  } catch (error) {
    document.documentElement.classList.remove('reveal-ready');
    console.error('motion.js initialization failed', error);
  }
})();
