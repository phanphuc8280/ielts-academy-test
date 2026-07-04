(function(){
  const SYS_KEY='ieltsAcademyV22System'; // kept for v2.x → v3.0 migration without reset
  const now=()=>new Date().toISOString();
  const today=()=>new Date().toISOString().slice(0,10);
  const clone=x=>JSON.parse(JSON.stringify(x||{}));
  const isObj=x=>x&&typeof x==='object'&&!Array.isArray(x);
  function merge(base,incoming){const out=clone(base);Object.keys(incoming||{}).forEach(k=>{if(isObj(out[k])&&isObj(incoming[k]))out[k]=merge(out[k],incoming[k]);else out[k]=incoming[k];});return out;}
  const LegacyStore=Object.assign({},window.Store);
  function uid(prefix='id'){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7)}
  function slug(s){return String(s||'user').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'user'}
  function freshUserData(profile={}){
    const d=merge(LegacyStore.defaults||{},{});
    d.version='4.0';
    d.studentProfile=merge(d.studentProfile||{},profile);
    d.studentProfile.onboarded=Boolean(profile.name||profile.onboarded);
    d.updatedAt=now();
    if(!d.lessonStatus)d.lessonStatus={};
    if(!d.homework)d.homework={};
    if(!d.essays)d.essays=[];
    if(!d.errors)d.errors=[];
    if(!d.teacherNotes)d.teacherNotes=[];
    if(!d.reviewQueue)d.reviewQueue=[];
    if(!d.bandHistory)d.bandHistory=[];
    if(!d.studySessions)d.studySessions=[];
    if(!d.customAssignments)d.customAssignments=[];
    if(!d.courseQAFeedback)d.courseQAFeedback=[];
    if(!d.practiceAnswers)d.practiceAnswers=d.practice||{};
    return d;
  }
  function normalizeUserData(data,user){
    let d=merge(freshUserData({}),data||{});
    d.version='4.0';
    if(user){
      d.studentProfile=d.studentProfile||{};
      d.studentProfile.name=d.studentProfile.name||user.name;
      d.studentProfile.currentBand=Number(d.studentProfile.currentBand||user.currentBand||5.5);
      d.studentProfile.targetBand=Number(d.studentProfile.targetBand||user.targetBand||6.5);
      d.studentProfile.expectedExamDate=d.studentProfile.expectedExamDate||user.examDate||'';
    }
    return d;
  }
  function userFromData(id,name,role='student',data){
    const p=(data&&data.studentProfile)||{};
    return {id,userId:id,name:name||p.name||'Học viên IELTS',role,username:id,email:'',pin:'1234',avatar:(name||p.name||'IA').slice(0,2).toUpperCase(),currentBand:Number(p.currentBand||5.5),targetBand:Number(p.targetBand||6.5),examDate:p.expectedExamDate||'',createdAt:now(),updatedAt:now(),lastLogin:null,status:'active'};
  }
  function seedSystem(){
    let legacy={};
    try{legacy=LegacyStore.load?LegacyStore.load():{}}catch(e){legacy={}}
    const hasProgress=legacy && ((legacy.studentProfile&&legacy.studentProfile.name)||Object.keys(legacy.lessonStatus||{}).length||(legacy.essays||[]).length||(legacy.errors||[]).length);
    const phucData=normalizeUserData(hasProgress?legacy:freshUserData({name:'Phúc',currentBand:5.5,targetBand:6.5}), null);
    const phuc=userFromData('phuc','Phúc','student',phucData);
    const teacherData=freshUserData({name:'IELTS Teacher',currentBand:0,targetBand:0,onboarded:true});
    const adminData=freshUserData({name:'Admin',currentBand:0,targetBand:0,onboarded:true});
    const sys={
      version:'4.0',createdAt:now(),updatedAt:now(),currentUserId:'phuc',
      users:[phuc,{...userFromData('teacher','IELTS Teacher','teacher',teacherData),pin:'2222',avatar:'TC'},{...userFromData('admin','Admin','admin',adminData),pin:'0000',avatar:'AD'}],
      userData:{phuc:phucData,teacher:teacherData,admin:adminData},
      courses:[{id:'course-task2-55-65',title:'IELTS Writing Task 2: 5.5 → 6.5',status:'active',createdAt:now(),updatedAt:now()}],
      lessons:(window.IELTS_DATA&&IELTS_DATA.lessons?IELTS_DATA.lessons:[]).map(l=>({id:l.id,courseId:'course-task2-55-65',chapterNo:l.chapterNo,lessonNo:l.lessonNo,title:l.title,skill:l.skillName||l.skill,status:'published',createdAt:now(),updatedAt:now()})),
      assignments:[],submissions:[],feedback:[],errors:[],bandHistory:[],settings:{offlineDemo:true},featureRequests:[{id:'fr-v30-1',title:'Backend sync with real accounts',status:'planned',createdAt:now(),updatedAt:now()}]
    };
    return sys;
  }
  function readSystem(){
    try{const raw=localStorage.getItem(SYS_KEY); if(raw){const sys=JSON.parse(raw); return normalizeSystem(sys)}}catch(e){console.warn(e)}
    const sys=seedSystem(); writeSystem(sys); return sys;
  }
  function normalizeSystem(sys){
    sys=sys||seedSystem();
    if(!Array.isArray(sys.users))sys.users=[];
    if(!sys.userData)sys.userData={};
    if(!sys.users.length){const s=seedSystem(); sys.users=s.users; sys.userData=s.userData; sys.currentUserId=s.currentUserId;}
    sys.users.forEach(u=>{if(!u.id)u.id=u.userId||slug(u.name); if(!u.userId)u.userId=u.id; if(!u.role)u.role='student'; if(!u.pin)u.pin='1234'; if(!u.status)u.status='active'; if(!sys.userData[u.id])sys.userData[u.id]=freshUserData({name:u.name,currentBand:u.currentBand,targetBand:u.targetBand,expectedExamDate:u.examDate,onboarded:true}); sys.userData[u.id]=normalizeUserData(sys.userData[u.id],u);});
    if(!sys.currentUserId || !sys.users.find(u=>u.id===sys.currentUserId))sys.currentUserId=sys.users[0].id;
    ['courses','lessons','assignments','submissions','feedback','errors','bandHistory','featureRequests','courseQAFeedback'].forEach(k=>{if(!Array.isArray(sys[k]))sys[k]=[]});
    sys.version='4.0'; sys.updatedAt=sys.updatedAt||now(); return sys;
  }
  function writeSystem(sys){sys=normalizeSystem(sys);sys.updatedAt=now();localStorage.setItem(SYS_KEY,JSON.stringify(sys));return sys;}
  function currentUser(){const sys=readSystem();return sys.users.find(u=>u.id===sys.currentUserId)||sys.users[0];}
  function role(){return (currentUser()||{}).role||'student'}
  function currentData(){const sys=readSystem(), user=currentUser();return normalizeUserData(sys.userData[user.id],user)}
  function saveCurrentData(d){const sys=readSystem(), user=currentUser();sys.userData[user.id]=normalizeUserData(d,user);const p=sys.userData[user.id].studentProfile||{};Object.assign(user,{name:p.name||user.name,currentBand:p.currentBand||user.currentBand,targetBand:p.targetBand||user.targetBand,examDate:p.expectedExamDate||user.examDate,updatedAt:now(),lastLogin:now()});writeSystem(sys);try{localStorage.setItem(LegacyStore.KEY||'ieltsAcademyV2',JSON.stringify(sys.userData[user.id]))}catch(e){}return sys.userData[user.id];}
  function updateCurrent(fn){const d=currentData();const next=fn(d)||d;return saveCurrentData(next)}
  function userData(id){const sys=readSystem(), user=sys.users.find(u=>u.id===id);return user?normalizeUserData(sys.userData[id],user):null}
  function saveUserData(id,data){const sys=readSystem(), user=sys.users.find(u=>u.id===id);if(!user)return null;sys.userData[id]=normalizeUserData(data,user);writeSystem(sys);return sys.userData[id]}
  function updateUserData(id,fn){const data=userData(id);if(!data)return null;return saveUserData(id,fn(data)||data)}
  function createUser(input={}){const sys=readSystem();let id=slug(input.username||input.name||('user '+(sys.users.length+1)));let base=id,i=2;while(sys.users.some(u=>u.id===id)){id=base+'-'+i++;}const user={id,userId:id,name:input.name||id,role:input.role||'student',username:input.username||id,email:input.email||'',pin:String(input.pin||'1234'),avatar:(input.name||id).slice(0,2).toUpperCase(),currentBand:Number(input.currentBand||5.5),targetBand:Number(input.targetBand||6.5),examDate:input.examDate||'',createdAt:now(),updatedAt:now(),lastLogin:null,status:'active'};sys.users.push(user);sys.userData[id]=freshUserData({name:user.name,currentBand:user.currentBand,targetBand:user.targetBand,expectedExamDate:user.examDate,onboarded:true});writeSystem(sys);return user;}
  function login(usernameOrId,pin){const sys=readSystem();const user=sys.users.find(u=>(u.username===usernameOrId||u.id===usernameOrId)&&u.status!=='archived');if(!user)return {ok:false,message:'Không tìm thấy tài khoản'};if(String(user.pin||'')!==String(pin||''))return {ok:false,message:'PIN không đúng'};user.lastLogin=now();sys.currentUserId=user.id;writeSystem(sys);return {ok:true,user};}
  function switchUser(id){const sys=readSystem();const user=sys.users.find(u=>u.id===id&&u.status!=='archived');if(!user)return false;sys.currentUserId=id;user.lastLogin=now();writeSystem(sys);return true;}
  function updateUser(id,patch){const sys=readSystem(), user=sys.users.find(u=>u.id===id);if(!user)return null;Object.assign(user,patch,{updatedAt:now()});if(user.status==='archived' && sys.currentUserId===id){const next=sys.users.find(u=>u.status!=='archived'); if(next)sys.currentUserId=next.id;}writeSystem(sys);return user;}
  function exportUser(id=currentUser().id){const sys=readSystem(), user=sys.users.find(u=>u.id===id);return JSON.stringify({version:'3.0-user-export',exportedAt:now(),user,data:sys.userData[id]},null,2)}
  function importUser(text,mode='merge',targetId=currentUser().id){const obj=JSON.parse(text);const incoming=obj.data||obj;const data=mode==='replace'?incoming:merge(userData(targetId)||{},incoming);return saveUserData(targetId,data)}
  function exportSystem(){return JSON.stringify(readSystem(),null,2)}
  function importSystem(text,mode='merge'){const incoming=JSON.parse(text);if(mode==='replace')return writeSystem(incoming);return writeSystem(merge(readSystem(),incoming));}
  function resetCurrent(){return saveCurrentData(freshUserData({name:currentUser().name,currentBand:currentUser().currentBand,targetBand:currentUser().targetBand,expectedExamDate:currentUser().examDate,onboarded:true}))}
  function resetAll(){localStorage.removeItem(SYS_KEY);return readSystem()}
  function weeklyStats(){const d=currentData();const start=new Date();const day=(start.getDay()+6)%7;start.setDate(start.getDate()-day);start.setHours(0,0,0,0);const h=(d.lessonHistory||[]).filter(x=>new Date(x.startedAt||x.completedAt||0)>=start);const sessions=(d.studySessions||[]).filter(x=>new Date(x.startedAt||0)>=start);const essays=(d.essays||[]).filter(x=>new Date(x.createdAt||0)>=start);const hw=Object.values(d.homework||{}).filter(x=>new Date(x.updatedAt||x.submittedAt||0)>=start);return {uniqueLessons:new Set(h.map(x=>x.lessonId)).size,minutes:sessions.reduce((s,x)=>s+Number(x.timeSpent||0),0)+h.reduce((s,x)=>s+Number(x.timeSpent||0),0),homework:hw.length,essays:essays.length,sessions:sessions.length}}
  function touchStudy(){const date=today();updateCurrent(d=>{d.streak=d.streak||{count:0,lastStudyDate:null};if(d.streak.lastStudyDate!==date){const y=new Date(Date.now()-86400000).toISOString().slice(0,10);d.streak.count=d.streak.lastStudyDate===y?(Number(d.streak.count)||0)+1:1;d.streak.lastStudyDate=date}return d})}
  function systemSummary(){const sys=readSystem();const students=sys.users.filter(u=>u.role==='student'&&u.status!=='archived');const rows=students.map(u=>{const d=normalizeUserData(sys.userData[u.id],u);const lessons=Object.keys(d.completedLessons||{}).length;const progress=Math.round(lessons/Math.max(1,(window.IELTS_DATA&&IELTS_DATA.lessons?IELTS_DATA.lessons.length:70))*100);const pendingHw=Object.values(d.homework||{}).filter(h=>['Submitted','Doing','Rewrite'].includes(h.status)).length;const pendingEssays=(d.essays||[]).filter(e=>e.status!=='final'&&e.status!=='mastered').length;const weakness=(d.errors||[]).slice().sort((a,b)=>(b.frequency||1)-(a.frequency||1))[0]?.errorType||'—';const lastBand=(d.bandHistory||[])[0]?.overallBand||(d.bandHistory||[])[0]?.overall||d.studentProfile.currentBand||u.currentBand||5.5;const lastActive=(d.studySessions||[])[0]?.startedAt||u.lastLogin||u.createdAt;return {user:u,data:d,lessons,progress,pendingHw,pendingEssays,weakness,lastBand,lastActive};});return {sys,students,rows,totalLessons:rows.reduce((s,r)=>s+r.lessons,0),totalEssays:rows.reduce((s,r)=>s+(r.data.essays||[]).length,0),avgBand:rows.length?rows.reduce((s,r)=>s+Number(r.lastBand||0),0)/rows.length:0};}
  window.Accounts={SYS_KEY,LegacyStore,readSystem,writeSystem,currentUser,role,users:()=>readSystem().users,currentData,saveCurrentData,userData,saveUserData,updateUserData,createUser,login,switchUser,updateUser,exportUser,importUser,exportSystem,importSystem,resetCurrent,resetAll,systemSummary,uid,now,today};
  window.Store=Object.assign({},window.Store,{KEY:SYS_KEY,load:currentData,save:saveCurrentData,update:updateCurrent,get:(path,fallback)=>{const d=currentData();if(!path)return d;const val=path.split('.').reduce((o,k)=>o&&o[k],d);return val===undefined?fallback:val;},set:(path,value)=>{const d=currentData();const keys=path.split('.');let cur=d;keys.slice(0,-1).forEach(k=>{if(!cur[k]||typeof cur[k]!=='object')cur[k]={};cur=cur[k];});cur[keys[keys.length-1]]=value;saveCurrentData(d);return d;},reset:resetCurrent,exportData:()=>exportUser(),importData:(text)=>importUser(text,'merge'),touchStudy,weeklyStats,uid,today,addDays:(n)=>{const d=new Date();d.setDate(d.getDate()+Number(n||0));return d.toISOString().slice(0,10)}});
})();
