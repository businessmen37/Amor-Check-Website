(() => {
  const cfg = window.AMORCHECK_CONFIG;
  const translations = window.AMORCHECK_TRANSLATIONS;
  const supported = [
    {code:'en',label:'English'}, {code:'de',label:'Deutsch'}, {code:'ru',label:'Русский'},
    {code:'uk',label:'Українська'}, {code:'pl',label:'Polski'}, {code:'cs',label:'Čeština'},
    {code:'fr',label:'Français'}, {code:'nl',label:'Nederlands'}
  ];
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  $('#year').textContent = new Date().getFullYear();

  function chooseInitialLanguage(){
    const stored = localStorage.getItem('amorcheck-language');
    if(stored && translations[stored]) return stored;
    const browser = (navigator.language || 'en').toLowerCase();
    const base = browser.split('-')[0];
    return translations[base] ? base : 'en';
  }

  function setLanguage(code){
    if(!translations[code]) code='en';
    const base = translations.en;
    const dict = translations[code];
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = dict[key] || base[key];
      if(value) el.textContent = value;
    });
    document.documentElement.lang = code;
    $('#activeLanguage').textContent = code.toUpperCase();
    localStorage.setItem('amorcheck-language',code);
  }

  const languageMenu = $('#languageMenu');
  supported.forEach(lang => {
    const btn=document.createElement('button');
    btn.type='button'; btn.textContent=lang.label;
    btn.addEventListener('click',()=>{setLanguage(lang.code);languageMenu.hidden=true;$('#languageBtn').setAttribute('aria-expanded','false');});
    languageMenu.appendChild(btn);
  });
  setLanguage(chooseInitialLanguage());
  $('#languageBtn').addEventListener('click',()=>{
    languageMenu.hidden=!languageMenu.hidden;
    $('#languageBtn').setAttribute('aria-expanded',String(!languageMenu.hidden));
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-actions')){languageMenu.hidden=true;$('#languageBtn').setAttribute('aria-expanded','false');}});

  const menuToggle=$('#menuToggle'), mobileMenu=$('#mobileMenu');
  menuToggle.addEventListener('click',()=>{const open=!mobileMenu.classList.contains('is-open');mobileMenu.classList.toggle('is-open',open);menuToggle.setAttribute('aria-expanded',String(open));});
  $$('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');}));
  window.addEventListener('resize',()=>{if(window.innerWidth>980){mobileMenu.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');}});

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
  $$('.reveal').forEach(el=>observer.observe(el));

  $$('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const wasOpen=item.classList.contains('open');
    $$('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  }));

  let storyIndex=0; const stories=$$('.story-card');
  function showStory(i){stories.forEach((s,idx)=>s.classList.toggle('active',idx===i));}
  $('#storyPrev').addEventListener('click',()=>{storyIndex=(storyIndex-1+stories.length)%stories.length;showStory(storyIndex);});
  $('#storyNext').addEventListener('click',()=>{storyIndex=(storyIndex+1)%stories.length;showStory(storyIndex);});

  function fileLabel(input,label){
    const files=[...input.files];
    label.textContent=files.length ? `${files.length} file${files.length>1?'s':''} selected: ${files.slice(0,2).map(f=>f.name).join(', ')}${files.length>2?'…':''}` : 'PDF, images or documents. Select multiple files if needed.';
  }
  $('#storyFiles').addEventListener('change',e=>fileLabel(e.target,$('#storyFileLabel')));
  $('#caseFiles').addEventListener('change',e=>fileLabel(e.target,$('#caseFileLabel')));

  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200);}

  $('#storyForm').addEventListener('submit', async e=>{
    e.preventDefault();
    if(!cfg.formEndpoint){toast('Demo mode: connect the secure form endpoint before launch.');return;}
    const data=new FormData(e.target);
    try{const r=await fetch(cfg.formEndpoint,{method:'POST',body:data});if(!r.ok)throw new Error();e.target.reset();toast('Your story was sent securely.');}
    catch{toast('The form could not be sent. Please email contact@amorcheck.com.');}
  });

  const modal=$('#caseModal');
  let selectedPlan='relationship';
  function openModal(plan){
    selectedPlan=plan;
    const p=cfg.prices[plan]||cfg.prices.custom;
    $('#selectedPlan').innerHTML=`<span>${p.name}</span><strong>${p.price ? '€'+p.price : 'Custom scope'}</strong>`;
    $$('[data-modal-step]').forEach(s=>s.classList.remove('active'));
    $('[data-modal-step="intake"]').classList.add('active');
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  }
  function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  $$('.plan-btn').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.plan)));
  $('[data-open="customCase"]').addEventListener('click',()=>openModal('custom'));
  $$('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

  $('#caseForm').addEventListener('submit',e=>{
    e.preventDefault();
    const p=cfg.prices[selectedPlan]||cfg.prices.custom;
    $('#paymentSummary').innerHTML=`<span>${p.name}</span><strong>${p.price ? '€'+p.price : 'Custom quote'}</strong>`;
    $$('[data-modal-step]').forEach(s=>s.classList.remove('active'));
    $('[data-modal-step="payment"]').classList.add('active');
    const stripe=(cfg.payments.stripe||{})[selectedPlan]||'';
    const paypal=(cfg.payments.paypal||{})[selectedPlan]||'';
    $('#stripeButton').href=stripe||'#'; $('#paypalButton').href=paypal||'#';
  });
  $$('.payment-link').forEach(link=>link.addEventListener('click',e=>{if(link.getAttribute('href')==='#'){e.preventDefault();toast('Demo mode: add the live payment link in assets/js/config.js.');}}));
})();
