const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.mobile-menu');
function menu(open){toggle?.setAttribute('aria-expanded',String(open));if(nav)nav.hidden=!open;document.body.classList.toggle('menu-open',open);for(const el of document.querySelectorAll('main,footer,.mobile-actions'))el.toggleAttribute('inert',open);if(open)nav.querySelector('a')?.focus();else toggle?.focus()}
toggle?.addEventListener('click',()=>menu(toggle.getAttribute('aria-expanded')!=='true'));
nav?.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
document.addEventListener('keydown',e=>{if(toggle?.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape')menu(false);if(e.key==='Tab'){const links=[toggle,...nav.querySelectorAll('a')],first=links[0],last=links.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches&&toggle?.getAttribute('aria-expanded')==='true')menu(false)});
const filterButtons=[...document.querySelectorAll('[data-filter]')],items=[...document.querySelectorAll('[data-category]')];
filterButtons.forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.filter;filterButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));let n=0;for(const item of items){item.hidden=key!=='alla'&&item.dataset.category!==key;if(!item.hidden)n++}const status=document.querySelector('.gallery-status');if(status)status.textContent=`Visar ${n} bilder`;}));
const dialog=document.querySelector('.lightbox');let gallery=[],current=0,trigger=null;
function render(){const a=gallery[current],img=dialog.querySelector('.lightbox-image');img.src=a.href;img.alt=a.dataset.caption||a.querySelector('img').alt;dialog.querySelector('.lightbox-top p').textContent=img.alt;dialog.querySelector('.lightbox-count').textContent=`${current+1} av ${gallery.length}`;dialog.querySelectorAll('[data-direction]').forEach(b=>b.hidden=gallery.length<2)}
document.querySelectorAll('[data-lightbox]').forEach(a=>a.addEventListener('click',e=>{if(!dialog?.showModal)return;e.preventDefault();trigger=a;gallery=[...document.querySelectorAll('[data-lightbox]')].filter(a=>!a.closest('[hidden]'));current=gallery.indexOf(a);render();dialog.showModal()}));
dialog?.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
dialog?.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>{current=(current+Number(b.dataset.direction)+gallery.length)%gallery.length;render()}));
dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();current=(current+(e.key==='ArrowRight'?1:-1)+gallery.length)%gallery.length;render()}});
dialog?.addEventListener('close',()=>trigger?.focus());
