(function(){
  'use strict';
  const now=()=>new Date().toISOString();
  const safeArr=x=>Array.isArray(x)?x:[];
  const compact=(t,n=900)=>String(t||'').replace(/\s+/g,' ').trim().slice(0,n);
  function getPage(){return (document.body&&document.body.dataset&&document.body.dataset.page)||((location.pathname.split('/').pop()||'dashboard.html').replace(/\.html$/,''));}
  function lessonFromUrl(){try{return new URLSearchParams(location.search).get('lesson')||''}catch(e){return ''}}
  let timer=null;
  function capture(){clearTimeout(timer);timer=setTimeout(()=>{
    try{
      if(!window.Store||!Store.update)return;
      const fields=[...document.querySelectorAll('textarea,input,select')].filter(el=>el.id||el.name||el.placeholder).slice(0,80).map(el=>({id:el.id||el.name||el.placeholder||el.tagName,type:el.tagName.toLowerCase(),value:compact(el.value,1200),placeholder:el.placeholder||'',page:getPage()})).filter(x=>x.value);
      Store.update(d=>{d.runtimeContext=d.runtimeContext||{};d.runtimeContext.lastCapturedAt=now();d.runtimeContext.page=getPage();d.runtimeContext.lessonId=lessonFromUrl();d.runtimeContext.fields=fields;d.runtimeContext.url=location.href;d.runtimeContext.title=document.title;d.liveLearningEvents=safeArr(d.liveLearningEvents);d.liveLearningEvents.unshift({id:(window.Store.uid?Store.uid('live'):'live-'+Date.now()),createdAt:now(),page:getPage(),lessonId:lessonFromUrl(),fieldCount:fields.length});d.liveLearningEvents=d.liveLearningEvents.slice(0,50);return d;});
    }catch(e){console.warn('v6 capture failed',e)}
  },350)}
  document.addEventListener('input',capture,true);
  document.addEventListener('change',capture,true);
  document.addEventListener('click',e=>{if(e.target&&e.target.closest&&e.target.closest('.btn,.tab,.nav-link,.ask-teacher'))capture()},true);
  function countLiveFields(){try{return ((Store.load().runtimeContext||{}).fields||[]).length}catch(e){return 0}}
  function contextAppendix(ctx={}){let d={};try{d=Store.load()}catch(e){};const r=d.runtimeContext||{},fields=safeArr(r.fields).slice(0,12),events=safeArr(d.liveLearningEvents).slice(0,5),hist=safeArr(d.askTeacherHistory).slice(0,3);return `Live Context Auto-Capture:\n- Current page: ${r.page||getPage()}\n- Current URL: ${r.url||location.href}\n- Last captured at: ${r.lastCapturedAt||'not captured yet'}\n- Current typed fields:\n${fields.length?fields.map((f,i)=>`${i+1}. ${f.id}: ${f.value}`).join('\n'):'- No typed field captured yet.'}\n- Recent learning events:\n${events.length?events.map(e=>`- ${e.createdAt}: ${e.page} (${e.fieldCount} fields)`).join('\n'):'- No live event yet.'}\n- Previous Ask Chị prompts:\n${hist.length?hist.map(h=>`- ${h.date}: ${h.level} / ${h.source} / ${h.chars} chars`).join('\n'):'- No prompt history yet.'}`}
  function enrichPrompt(prompt,ctx={},level='Standard',opts={}){return String(prompt||'')+"\n\n"+contextAppendix(ctx)+"\n\nV7 Teacher Instruction:\n- Please use the live captured data if it is relevant.\n- Do not ask the student to retype information already available above.\n- Stay inside the current lesson skill unless the prompt level is Full Context or Essay Review."}
  window.V7Context={capture,countLiveFields,contextAppendix,enrichPrompt};
})();
