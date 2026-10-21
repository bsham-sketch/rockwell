(() => {
  try {
    const form = document.querySelector('#quote-form');
    if (!form) return;
    const params = new URLSearchParams(location.search);
    const product = form.elements.product;
    const initialProduct = params.get('product') || '';
    if (initialProduct) {
      const option=[...product.options].find(item=>item.value===initialProduct||item.textContent.trim()===initialProduct);
      if(option)product.value=option.value;
    }
    for(const name of ['capacity','span'])if(params.get(name))form.elements[name].value=params.get(name);
    if(params.get('application'))form.elements.message.value=`Application: ${params.get('application')}`;

    const status=form.querySelector('.form-status');
    const button=form.querySelector('[type="submit"]');
    const mailtoFallback=data=>{
      const lines=[`Name: ${data.get('name')}`,`Company: ${data.get('company')}`,`Phone: ${data.get('phone')}`,`Email: ${data.get('email')}`,`Equipment: ${product.selectedOptions[0]?.textContent||''}`,`Capacity: ${data.get('capacity')}`,`Span: ${data.get('span')}`,'',String(data.get('message')||'')];
      status.textContent='Your email app will open with the enquiry details ready to send.';
      location.href=`mailto:vijaygupta@rockwellcranes.com?subject=${encodeURIComponent('Enquiry for Rockwell Hoisto Cranes')}&body=${encodeURIComponent(lines.join('\n'))}`;
    };
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      let valid=true;
      for(const field of form.querySelectorAll('[required]')){
        const bad=!field.checkValidity();field.setAttribute('aria-invalid',String(bad));field.closest('label')?.classList.toggle('has-error',bad);valid=valid&&!bad;
      }
      if(!valid){form.querySelector('[aria-invalid="true"]')?.focus();status.textContent='Please check the required fields.';return;}
      const data=new FormData(form);
      // TODO: Replace with the access key from the Rockwell Web3Forms workspace.
      const WEB3FORMS_ACCESS_KEY='TODO_ADD_WEB3FORMS_ACCESS_KEY';
      if(WEB3FORMS_ACCESS_KEY.startsWith('TODO_')){mailtoFallback(data);return;}
      data.set('access_key',WEB3FORMS_ACCESS_KEY);
      data.set('subject','Enquiry for Rockwell Hoisto Cranes');
      button.disabled=true;status.textContent='Sending your enquiry…';
      try{
        const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:data});
        const result=await response.json();
        if(!response.ok||!result.success)throw new Error(result.message||'Submission failed');
        status.textContent='Thank you. Your enquiry has been sent to the Rockwell sales desk.';
        form.classList.add('is-submitted');
      }catch(error){
        console.error('Web3Forms submission failed; opening the email fallback.',error);
        mailtoFallback(data);
      }finally{button.disabled=false;}
    });
  } catch(error) { console.error('enquiry.js initialization failed',error); }
})();
