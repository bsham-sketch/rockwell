(() => {
  try {
const form = document.querySelector('#quote-form');
const params = new URLSearchParams(location.search);
if (form) {
  const product = form.elements.product;
  const initialProduct = params.get('product') || '';
  if (initialProduct) {
    const option = [...product.options].find(item => item.value === initialProduct || item.textContent.trim() === initialProduct);
    if (option) product.value = option.value;
  }
  for (const name of ['capacity','span']) {
    if (params.get(name)) form.elements[name].value = params.get(name);
  }
  const application = params.get('application');
  if (application) form.elements.message.value = `Application: ${application}`;

  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    for (const field of form.querySelectorAll('[required]')) {
      const bad = !field.checkValidity();
      field.setAttribute('aria-invalid', String(bad));
      field.closest('label')?.classList.toggle('has-error', bad);
      valid = valid && !bad;
    }
    const email = form.elements.email;
    const emailBad = !email.checkValidity();
    email.setAttribute('aria-invalid', String(emailBad));
    email.closest('label')?.classList.toggle('has-error', emailBad);
    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      form.querySelector('.form-status').textContent = 'Please check the required fields.';
      return;
    }
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Equipment: ${product.selectedOptions[0].textContent}`,
      `Capacity: ${data.get('capacity')}`,
      `Span: ${data.get('span')}`,
      '',
      String(data.get('message') || '')
    ];
    form.querySelector('.form-status').textContent = 'Your email app will open with the enquiry details ready to send.';
    location.href = `mailto:vijaygupta@rockwellcranes.com?subject=${encodeURIComponent('Enquiry for Rockwell Hoisto Cranes')}&body=${encodeURIComponent(lines.join('\n'))}`;
  });
}
  } catch (error) {
    console.error('enquiry.js initialization failed', error);
  }
})();
