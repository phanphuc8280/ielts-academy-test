
(function(){
function esc(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function attr(x){return esc(x).replace(/`/g,'&#96;')}
function pct(a,b){return Math.max(0,Math.min(100,Math.round((Number(a)||0)/(Number(b)||1)*100)))}
function toast(msg){let t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2800)}
function modal(title,body,actions=''){const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.innerHTML=`<div class="modal"><div style="display:flex;justify-content:space-between;gap:12px;align-items:center"><h3>${esc(title)}</h3><button class="btn ghost" data-close>✕</button></div><div>${body}</div><div class="mini-actions">${actions}</div></div>`;document.body.appendChild(wrap);wrap.querySelector('[data-close]').onclick=()=>wrap.remove();wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.remove()});return wrap}
async function copy(text){try{await navigator.clipboard.writeText(text);toast('Đã copy prompt vào clipboard.')}catch(e){modal('Copy thủ công',`<pre>${esc(text)}</pre>`)} }
function wordCount(text){return (String(text||'').trim().match(/\b[\w'-]+\b/g)||[]).length}
function selectOptions(arr,selected=''){return arr.map(x=>`<option ${String(x)===String(selected)?'selected':''}>${esc(x)}</option>`).join('')}
function statusPill(s){return `<span class="pill status-${esc(s)}">${esc(s)}</span>`}
window.UI={esc,attr,pct,toast,modal,copy,wordCount,selectOptions,statusPill};
})();
