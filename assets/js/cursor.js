(() => {
  try {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.createElement('span');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.append(dot);

    const isControl = target => target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]');
    document.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      dot.classList.add('is-visible');
      document.documentElement.classList.toggle('cursor-native-control', Boolean(isControl(event.target)));
      const interactive = event.target instanceof Element && event.target.closest('a, button, [role="button"], summary');
      dot.classList.toggle('is-hovering', Boolean(interactive));
    }, {passive:true});
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
