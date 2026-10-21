(() => {
  try {
    const rail = document.querySelector('.product-rail');
    document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => {
      rail?.scrollBy({left: Number(button.dataset.scroll) * rail.clientWidth * .8, behavior: 'smooth'});
    }));

    document.querySelectorAll('.category-tabs button').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('.category-tabs button').forEach(tab => {
        const active = tab === button;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      document.querySelectorAll('.product-card').forEach(card => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      });
      rail?.scrollTo({left: 0, behavior: 'smooth'});
    }));

    // Mouse users can grab the horizontal product rail; touch scrolling stays native.
    if (rail) {
      let dragStart = null;
      rail.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        dragStart = {x:event.clientX, scroll:rail.scrollLeft, moved:false};
        rail.classList.add('is-grabbing');
        rail.setPointerCapture(event.pointerId);
      });
      rail.addEventListener('pointermove', event => {
        if (!dragStart) return;
        const distance = event.clientX - dragStart.x;
        if (Math.abs(distance) > 6) dragStart.moved = true;
        if (dragStart.moved) rail.scrollLeft = dragStart.scroll - distance;
      });
      const stopDrag = event => {
        if (!dragStart) return;
        const moved = dragStart.moved;
        dragStart = null;
        rail.classList.remove('is-grabbing');
        if (moved) {
          const blockClick = click => { click.preventDefault(); click.stopPropagation(); };
          rail.addEventListener('click', blockClick, {capture:true, once:true});
          window.setTimeout(() => rail.removeEventListener('click', blockClick, true), 0);
        }
        if (event.pointerId && rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
      };
      rail.addEventListener('pointerup', stopDrag);
      rail.addEventListener('pointercancel', stopDrag);
      rail.addEventListener('lostpointercapture', () => { dragStart = null; rail.classList.remove('is-grabbing'); });
    }

    const selectorProducts = {
      cranes: {name:'Double Girder E.O.T. Crane',url:'products/double-girder-eot.html',capacity:'Up to 150 t',image:'assets/img/dwg-double-girder-eot.png',alt:'Double girder E.O.T. crane drawing'},
      hoists: {name:'Electric Wire Rope Hoist',url:'products/electric-wire-rope-hoist.html',capacity:'250 kg – 30 t',image:'assets/img/wire-rope-hoist.jpg',alt:'Electric wire rope hoist'},
      winches: {name:'Electric Power Driven Winch',url:'products/power-electric-winch.html',capacity:'1 t – 20 t rope pull',image:'assets/img/crab-winch-gold.jpg',alt:'Electric power winch'},
      hydro: {name:'Gates & Hydro-Mechanical Equipment',url:'products/gates-hydro-mechanical.html',capacity:'Up to 180 t SWL',image:'assets/img/hydro-spillway.jpg',alt:'Hydro spillway gates'},
      handling: {name:'Hydraulic Operated Stacker',url:'products/hydraulic-stacker.html',capacity:'500 – 2000 kg',image:'assets/img/hydraulic-stacker.jpg',alt:'Hydraulic stacker'}
    };
    const selector = document.querySelector('.selector-form');
    if (selector) {
      const result = selector.querySelector('.selector-result');
      const updateResult = () => {
        const type = document.querySelector('#selector-type').value;
        const chosen = selectorProducts[type] || selectorProducts.cranes;
        const query = new URLSearchParams({product:chosen.name,capacity:document.querySelector('#selector-capacity').value,span:document.querySelector('#selector-span').value,application:document.querySelector('#selector-application').value});
        result.innerHTML = `<article class="selector-result-card"><img src="${chosen.image}" alt="${chosen.alt}" width="120" height="90" loading="lazy"><div><span class="mono">SUGGESTED PRODUCT</span><h3><a href="${chosen.url}">${chosen.name}</a></h3><p>${chosen.capacity}</p><a class="result-enquiry" href="enquiry.html?${query.toString()}">Request a quote for this product <span aria-hidden="true">↗</span></a></div></article>`;
      };
      selector.querySelectorAll('select,input').forEach(field => field.addEventListener('input', updateResult));
      selector.querySelectorAll('select').forEach(field => field.addEventListener('change', updateResult));
      selector.addEventListener('submit', event => { event.preventDefault(); updateResult(); });
      updateResult();
    }

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

    const gsapReady = window.gsap && window.ScrollTrigger && !reduceMotion;
    const hero = document.querySelector('.hero');
    const bridge = document.querySelector('.crane-bridge');
    const trolley = document.querySelector('.crane-trolley');
    const hoist = document.querySelector('.crane-hoist');
    const load = document.querySelector('.crane-load');
    if (gsapReady && hero && bridge && trolley && hoist && load) {
      gsap.registerPlugin(ScrollTrigger);
      const trolleyPosition = {x:170};
      const hookPosition = {y:78};
      const loadPosition = {y:178};
      const draw = (element, position, axis) => { const x = axis === 'x' || axis === 'both' ? position.x : 0; const y = axis === 'y' || axis === 'both' ? position.y : 0; element.setAttribute('transform', `translate(${x} ${y})`); };
      draw(hoist,hookPosition,'y');
      draw(load,{x:-26,y:loadPosition.y},'both');
      gsap.set(load,{opacity:1});
      const timeline = gsap.timeline({repeat:-1,repeatDelay:.45,defaults:{ease:'power2.inOut'}});
      timeline
        .to(hookPosition,{y:0,duration:.95,onUpdate:()=>draw(hoist,hookPosition,'y')})
        .to(loadPosition,{y:95,duration:.95,onUpdate:()=>draw(load,{x:-26,y:loadPosition.y},'both')},'<')
        .to(trolleyPosition,{x:340,duration:2.5,onUpdate:()=>draw(trolley,trolleyPosition,'x')})
        .to(hookPosition,{y:78,duration:1.1,onUpdate:()=>draw(hoist,hookPosition,'y')})
        .to(loadPosition,{y:178,duration:.85,onUpdate:()=>draw(load,{x:-26,y:loadPosition.y},'both')},'<')
        .to(load,{opacity:0,duration:.2})
        .to(hookPosition,{y:0,duration:.8,onUpdate:()=>draw(hoist,hookPosition,'y')})
        .to(trolleyPosition,{x:170,duration:1.6,onUpdate:()=>draw(trolley,trolleyPosition,'x')})
        .to(hookPosition,{y:78,duration:.8,onUpdate:()=>draw(hoist,hookPosition,'y')})
        .to(load,{opacity:1,duration:.2},'<');
      document.documentElement.classList.add('gsap-ready');

    }

    const process = document.querySelector('.process-section');
    const processGrid = process?.querySelector('.process-grid');
    const viewport = process?.querySelector('[data-process-viewport]');
    const list = process?.querySelector('.process-list');
    const stations = [...(process?.querySelectorAll('.process-station') || [])];
    const readout = process?.querySelector('.trace-readout');
    const progress = process?.querySelector('.process-progress');
    const progressFill = progress?.querySelector('i');
    let activeStation = -1;
    const drawnStations = new WeakSet();
    const setActiveStation = index => {
      const next = Math.max(0,Math.min(stations.length - 1,index));
      if (next === activeStation) return;
      activeStation = next;
      stations.forEach((station,i)=>{station.classList.toggle('is-current',i===next);station.setAttribute('aria-current',i===next?'step':'false');});
      const current = next + 1;
      if (readout) readout.textContent = `${String(current).padStart(2,'0')} / ${String(stations.length).padStart(2,'0')}`;
      progress?.setAttribute('aria-valuenow',String(current));
      if (progressFill) progressFill.style.transform = `scaleX(${stations.length > 1 ? next/(stations.length-1) : 1})`;
      if (stations[next].querySelector('.station-art.fab-sc')) return;
      if (!gsapReady || drawnStations.has(stations[next])) return;
      drawnStations.add(stations[next]);
      const strokes = [...stations[next].querySelectorAll('.station-art svg path')];
      strokes.forEach((path,i)=>{
        try {
          const length = path.getTotalLength();
          gsap.set(path,{strokeDasharray:length,strokeDashoffset:length});
          gsap.to(path,{strokeDashoffset:0,duration:.72,delay:Math.min(i*.025,.2),ease:'power2.out',overwrite:true});
        } catch(error) { /* Unsupported SVG geometry stays visible as a static drawing. */ }
      });
    };
    if (process && processGrid && viewport && list && stations.length) {
      setActiveStation(0);
      const stationObserver = new IntersectionObserver(entries=>{
        const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(visible)setActiveStation(stations.indexOf(visible.target));
      },{root:viewport,rootMargin:'0px',threshold:[.2,.45,.7]});
      stations.forEach(station=>stationObserver.observe(station));
      const goToStation=target=>{
        if(viewport.scrollWidth>viewport.clientWidth){
          viewport.scrollTo({left:stations[target].offsetLeft-list.offsetLeft,behavior:'smooth'});
        }else stations[target].scrollIntoView({behavior:'smooth',block:'center'});
      };
      process.querySelectorAll('[data-process-step]').forEach(button=>button.addEventListener('click',()=>{
        const target=Math.max(0,Math.min(stations.length-1,activeStation+Number(button.dataset.processStep)));
        goToStation(target);
      }));
      viewport.addEventListener('keydown',event=>{
        if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
        event.preventDefault();
        const target=Math.max(0,Math.min(stations.length-1,activeStation+(event.key==='ArrowRight'?1:-1)));
        goToStation(target);
      });
    }
  } catch (error) {
    console.error('home.js initialization failed', error);
  }
})();
