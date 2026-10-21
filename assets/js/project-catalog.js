(() => {
  try {
    const buttons=[...document.querySelectorAll('[data-project-filter]')];
    const cards=[...document.querySelectorAll('.project-page-card')];
    const status=document.querySelector('.project-filter-status');
    buttons.forEach(button=>button.addEventListener('click',()=>{
      const type=button.dataset.projectFilter;let count=0;
      buttons.forEach(item=>{const active=item===button;item.setAttribute('aria-pressed',String(active));item.classList.toggle('is-active',active)});
      cards.forEach(card=>{const show=type==='all'||card.dataset.projectType===type;card.hidden=!show;if(show)count++});
      if(status)status.textContent=`Showing ${count} of ${cards.length} projects.`;
    }));
  } catch(error) { console.error('project-catalog.js initialization failed',error); }
})();
