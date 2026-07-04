
(function(){
const KEY='ieltsAcademyV2';
const OLD='ieltsAcademyV1';
const flow=['locked','learn','practice','homework','reviewed','rewrite','mastered'];
function today(){return new Date().toISOString().slice(0,10)}
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
function uid(prefix='id'){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7)}
function clone(x){return JSON.parse(JSON.stringify(x));}
function isObj(x){return x&&typeof x==='object'&&!Array.isArray(x)}
function merge(base, incoming){const out=clone(base);Object.keys(incoming||{}).forEach(k=>{if(isObj(out[k])&&isObj(incoming[k]))out[k]=merge(out[k],incoming[k]);else out[k]=incoming[k];});return out}
const defaults={
 version:'4.0',
 settings:{theme:'dark',developerMode:false,teacherMode:false,firstRun:true},
 studentProfile:{name:'',currentBand:5.5,targetBand:6.5,startDate:today(),expectedExamDate:addDays(90),sessionsPerWeek:4,dailyGoal:{lessons:1,minutes:45,exercises:5,essaysPerWeek:1},onboarded:false},
 completedLessons:{},
 lessonStatus:{},
 lessonHistory:[],
 studySessions:[],
 homework:{},
 essays:[],
 revisionHistory:{},
 errors:[],
 reviewQueue:[],
 vocabulary:{},
 ideaBank:{},
 teacherNotes:[],
 feedback:[],
 bandHistory:[],
 customAssignments:[],
 studyBuddy:[],
 exerciseAnswers:{},
 exerciseStatus:{},
 customExercises:[],
 courseQAFeedback:[],
 practice:{},
 lessonWork:{},
 promptStatus:{},
 settingsLog:[],
 badges:{},
 xp:0,
 streak:{count:0,lastStudyDate:null},
 featureRequests:[{id:'fr-seed-1',title:'Printable weekly report for teacher',status:'planned',note:'Export progress + errors + homework as PDF later.'}],
 selectedPromptId:null,
 currentEssayId:null,
 activeSession:null
};
function normalize(raw){let data=merge(defaults,raw||{});data.version='3.0';
 if(raw&&raw.settings){if(raw.settings.studentName&&!data.studentProfile.name)data.studentProfile.name=raw.settings.studentName;if(raw.settings.currentBand)data.studentProfile.currentBand=Number(raw.settings.currentBand)||5.5;if(raw.settings.targetBand)data.studentProfile.targetBand=Number(raw.settings.targetBand)||6.5;if(raw.settings.testDate&&!raw.studentProfile?.expectedExamDate)data.studentProfile.expectedExamDate=raw.settings.testDate;}
 if(raw&&raw.lessonStates&&!raw.lessonStatus)data.lessonStatus=raw.lessonStates;
 if(raw&&raw.completedLessons){Object.keys(raw.completedLessons).forEach(id=>{if(raw.completedLessons[id]&&!data.lessonStatus[id])data.lessonStatus[id]='mastered'})}
 ['lessonHistory','studySessions','essays','errors','reviewQueue','teacherNotes','feedback','bandHistory','customAssignments','studyBuddy','customExercises','featureRequests','courseQAFeedback'].forEach(k=>{if(!Array.isArray(data[k]))data[k]=[]});
 ['completedLessons','lessonStatus','homework','revisionHistory','vocabulary','ideaBank','practice','lessonWork','promptStatus','badges','exerciseAnswers','exerciseStatus'].forEach(k=>{if(!isObj(data[k]))data[k]={}});
 if(!data.studentProfile.expectedExamDate&&data.studentProfile.testDate)data.studentProfile.expectedExamDate=data.studentProfile.testDate;
 if(!data.studentProfile.dailyGoal)data.studentProfile.dailyGoal=clone(defaults.studentProfile.dailyGoal);
 // Hotfix v2.0.1: dữ liệu cũ từ v1/v1.1 chưa có cờ onboarded nên không được ép quay lại onboarding khi bấm sidebar.
 if(raw && !data.studentProfile.onboarded){
   const hasOldProgress=Boolean((raw.completedLessons&&Object.keys(raw.completedLessons).length)||(raw.lessonStatus&&Object.keys(raw.lessonStatus).length)||(raw.homework&&Object.keys(raw.homework).length)||(Array.isArray(raw.essays)&&raw.essays.length)||(Array.isArray(raw.errors)&&raw.errors.length));
   const hasOldProfile=Boolean(raw.studentProfile&&raw.studentProfile.name)||Boolean(raw.settings&&raw.settings.studentName);
   if(hasOldProgress||hasOldProfile)data.studentProfile.onboarded=true;
 }
 return data;
}
function load(){try{let raw=localStorage.getItem(KEY);if(!raw&&localStorage.getItem(OLD)){raw=localStorage.getItem(OLD)}return raw?normalize(JSON.parse(raw)):normalize({})}catch(e){console.warn(e);return normalize({})}}
function save(d){localStorage.setItem(KEY,JSON.stringify(normalize(d)));}
function get(path,fallback){const d=load();if(!path)return d;const val=path.split('.').reduce((o,k)=>o&&o[k],d);return val===undefined?fallback:val}
function set(path,value){const d=load();const keys=path.split('.');let cur=d;keys.slice(0,-1).forEach(k=>{if(!cur[k]||typeof cur[k]!=='object')cur[k]={};cur=cur[k];});cur[keys[keys.length-1]]=value;save(d);return d}
function update(fn){const d=load();const next=fn(d)||d;save(next);return load()}
function reset(){localStorage.removeItem(KEY);return load()}
function exportData(){return JSON.stringify(load(),null,2)}
function importData(text){const parsed=JSON.parse(text);save(normalize(parsed));return load()}
function touchStudy(){const date=today();update(d=>{if(d.streak.lastStudyDate!==date){const y=new Date(Date.now()-86400000).toISOString().slice(0,10);d.streak.count=d.streak.lastStudyDate===y?(Number(d.streak.count)||0)+1:1;d.streak.lastStudyDate=date}return d})}
function weekStart(){const d=new Date();const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);d.setHours(0,0,0,0);return d}
function weeklyStats(){const d=load(), start=weekStart();const h=d.lessonHistory.filter(x=>new Date(x.startedAt||x.completedAt||0)>=start);const sessions=d.studySessions.filter(x=>new Date(x.startedAt||0)>=start);const essays=d.essays.filter(x=>new Date(x.createdAt||0)>=start);const hw=Object.values(d.homework).filter(x=>new Date(x.updatedAt||x.submittedAt||0)>=start);return {uniqueLessons:new Set(h.map(x=>x.lessonId)).size,minutes:sessions.reduce((s,x)=>s+Number(x.timeSpent||0),0)+h.reduce((s,x)=>s+Number(x.timeSpent||0),0),homework:hw.length,essays:essays.length,sessions:sessions.length}}
window.Store={KEY,OLD,flow,defaults:normalize({}),load,save,get,set,update,reset,exportData,importData,touchStudy,weeklyStats,uid,today,addDays};
})();
