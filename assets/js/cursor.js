(() => {
  try {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.createElement('span');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.append(dot);

    const isControl = target => target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]');
    const updateTarget = target => {
      document.documentElement.classList.toggle('cursor-native-control', Boolean(isControl(target)));
      const interactive = target instanceof Element && target.closest('a, button, [role="button"], summary');
      dot.classList.toggle('is-hovering', Boolean(interactive));
    };
    document.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      dot.classList.add('is-visible');
    }, {passive:true});
    document.addEventListener('pointerover', event => updateTarget(event.target));
    document.addEventListener('pointerout', event => updateTarget(event.relatedTarget));
    document.addEventListener('pointerleave', () => dot.classList.remove('is-visible'));
    window.addEventListener('blur', () => dot.classList.remove('is-visible'));
    window.addEventListener('focus', () => dot.classList.remove('is-visible'));

    // Hide the system pointer only after the dot and its handlers are ready.
    document.documentElement.classList.add('cursor-ready');
  } catch (error) {
    document.documentElement.classList.remove('cursor-ready', 'cursor-native-control');
    console.error('cursor.js initialization failed', error);
  }
})();
