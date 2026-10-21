(() => {
  try {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealSelectors = [
      '.inner-hero-copy', '.product-hero-content', '.section-head > *',
      '.editorial-grid > *', '.identity-grid > *', '.capability-grid > *',
      '.proof-grid > *', '.hydro-grid > *', '.selector-grid > *', '.closing-grid > *',
      '.record-heading > *', '.project-showcase > .project-card', '.project-page-grid > *',
      '.project-page-card', '.project-record > *', '.installed-layout > *',
      '.installed-sector-grid > *', '.client-directory > *', '.sector-grid > .sector-card',
      '.service-grid > .service-card', '.catalog-grid > .catalog-card',
      '.product-rail > .product-card', '.range-tiles > .range-tile',
      '.process-list > .process-station', '.stations-list > .manufacturing-station',
      '.bay-list > .bay-card', '.inspection-list > *', '.company-timeline > *',
      '.product-overview-grid > *', '.product-facts > *', '.construction-list > *',
      '.product-gallery figure', '.related-products', '.product-cta-inner > *',
      '.spec-heading > *', '.spec-table-wrap', '.quote-aside', '.footer-top > *'
    ];
    const found = new Set();
    revealSelectors.forEach(selector => document.querySelectorAll(selector).forEach(item => found.add(item)));
    const items = [...found];
    if (reduceMotion || !items.length || !('IntersectionObserver' in window)) return;

    const variants = ['rv-up','rv-left','rv-scale','rv-right','rv-up','rv-skew'];
    const groups = new Map();
    items.forEach((item,index) => {
      const parent = item.parentElement;
      const groupIndex = groups.get(parent) || 0;
      groups.set(parent,groupIndex + 1);
      item.classList.add('scroll-reveal',variants[index % variants.length]);
      item.style.setProperty('--reveal-delay',`${Math.min(groupIndex * 75,300)}ms`);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    items.forEach(item => observer.observe(item));
    document.documentElement.classList.add('reveal-ready');

    const bayList = document.querySelector('.bay-list');
    const bays = bayList ? [...bayList.querySelectorAll('.bay-card')] : [];
    if (!reduceMotion && bays.length > 1) {
      let activeBay = 0;
      let timer = null;
      const showBay = index => {
        activeBay = index % bays.length;
        bays.forEach((bay,i) => bay.classList.toggle('is-live',i === activeBay));
      };
      const pauseBays = () => { if (timer) { window.clearInterval(timer); timer = null; } };
      const playBays = () => {
        if (timer || document.hidden) return;
        showBay(activeBay);
        timer = window.setInterval(() => showBay(activeBay + 1),2800);
      };
      const bayObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) playBays();
        else pauseBays();
      },{threshold:.12});
      bayObserver.observe(bayList);
      document.addEventListener('visibilitychange',() => document.hidden ? pauseBays() : playBays());
    }

    const hero = document.querySelector('.hero');
    const heroPhoto = hero?.querySelector('.hero-photo');
    if (hero && heroPhoto) {
      let queued = false;
      const updateParallax = () => {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const shift = Math.max(-28,Math.min(28,-rect.top * .055));
          heroPhoto.style.setProperty('--scroll-shift',`${shift.toFixed(1)}px`);
        }
        queued = false;
      };
      const requestParallax = () => {
        if (!queued) { queued = true; window.requestAnimationFrame(updateParallax); }
      };
      window.addEventListener('scroll',requestParallax,{passive:true});
      window.addEventListener('resize',requestParallax,{passive:true});
      requestParallax();
    }
  } catch (error) {
    document.documentElement.classList.remove('reveal-ready');
    console.error('motion.js initialization failed',error);
  }
})();
