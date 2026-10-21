(() => {
  try {
    const cards = [...document.querySelectorAll('.catalog-card')];
    const filters = [...document.querySelectorAll('[data-category-filter]')];
    const capacity = document.querySelector('#capacity-ceiling');
    const status = document.querySelector('.catalog-filter-status');
    let category = 'all';
    const apply = () => {
      const limit = capacity?.value.trim() ? Number(capacity.value) : null;
      let visible = 0;
      cards.forEach(card => {
        const cap = card.dataset.capacity === undefined ? null : Number(card.dataset.capacity);
        const show = (category === 'all' || card.dataset.category === category) && (limit === null || cap === null || cap <= limit);
        card.hidden = !show;
        if (show) visible++;
      });
      if (status) status.textContent = `Showing ${visible} of 17 product lines. Products without a published capacity remain listed.`;
    };
    filters.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.categoryFilter;
      filters.forEach(filter => {
        const active = filter === button;
        filter.classList.toggle('is-active', active);
        filter.setAttribute('aria-pressed', String(active));
      });
      apply();
    }));
    capacity?.addEventListener('input', apply);
    document.querySelector('.filter-reset')?.addEventListener('click', () => {
      category='all'; if(capacity)capacity.value='';
      filters.forEach((button,index)=>{button.classList.toggle('is-active',index===0);button.setAttribute('aria-pressed',String(index===0));});
      apply();
    });
    apply();
  } catch(error) { console.error('catalog.js initialization failed',error); }
})();
