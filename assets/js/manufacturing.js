(() => {
  try {
    const stations=[...document.querySelectorAll('.manufacturing-station')];
    const section=document.querySelector('.stations-section');
    const list=document.querySelector('.stations-list');
    const counter=document.querySelector('.station-progress strong');
    if(!stations.length||!section)return;
    const drawings=[
      '<rect x="25" y="12" width="86" height="66"/><path d="M38 27h57M38 39h45M38 51h57M38 63h32"/><path d="M18 84h100"/>',
      '<path d="M20 76h100M30 65h80M43 64V40h62v24M65 39l18-24 8 5M74 29l-8 10"/><path d="m92 36 8-7m-7 17 10-1"/>',
      '<path d="M20 25h100v51H20zM20 41h100M44 25v51M96 25v51M20 60h100"/>',
      '<path d="M20 72h100M32 58h78M70 17v27M61 44h18M70 47l-11 13M85 39l9-9m-7 24h11"/>',
      '<path d="M20 73h100M35 61V40h20v21M85 61V40h20v21M55 39h30M70 21v18M63 21h14"/><circle cx="45" cy="50" r="7"/><circle cx="95" cy="50" r="7"/>',
      '<path d="M18 67h104M28 51h84M40 51v16m60-16v16"/><circle cx="42" cy="69" r="10"/><circle cx="98" cy="69" r="10"/><path d="M42 69h56M71 51V38h23v13"/>',
      '<path d="M26 29h92M43 29v20m66-20v20M43 49h66"/><ellipse cx="59" cy="49" rx="16" ry="10"/><path d="M75 49c0 20 26 20 26 0M88 59v19q0 8 8 8t8-8"/>',
      '<path d="M19 25h102M34 25v53M106 25v53M34 38h72M61 38v24m19-24v24M61 62v7"/><rect x="53" y="69" width="34" height="17"/><path d="M59 75h22m-22 6h22"/>'
    ];
    stations.forEach((station,index)=>{
      station.dataset.station=String(index+1).padStart(2,'0');
      const art=document.createElement('div');art.className='station-visual';art.setAttribute('aria-hidden','true');
      art.innerHTML=`<svg viewBox="0 0 140 95" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${drawings[index]}</svg>`;
      station.prepend(art);
    });
    if(!('IntersectionObserver'in window))return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      stations.forEach(station=>station.classList.toggle('is-current',station===entry.target));
      const index=stations.indexOf(entry.target)+1;
      if(counter)counter.textContent=String(index).padStart(2,'0');
      section.style.setProperty('--station-progress',`${index/stations.length*100}%`);
      list?.style.setProperty('--station-progress',`${index/stations.length*100}%`);
    }),{rootMargin:'-35% 0px -45% 0px',threshold:0});
    stations.forEach(station=>observer.observe(station));
  } catch(error) { console.error('manufacturing.js initialization failed',error); }
})();
