(function(){
  'use strict';
  window.IELTS_ACADEMY_VERSION='5.5';
  function arr(x){return Array.isArray(x)?x:[]}
  function asArr(x){if(Array.isArray(x))return x;if(x==null||x==='')return [];return [x]}
  function safeId(prefix,i){return prefix+'-'+String(i+1).padStart(4,'0')}
  function normalizeData(){
    const D=window.IELTS_DATA=window.IELTS_DATA||{};
    D.lessons=arr(D.lessons).map((l,i)=>({
      id:l.id||safeId('lesson',i),
      chapterNo:Number(l.chapterNo||l.chapter||1),
      lessonNo:Number(l.lessonNo||l.number||i+1),
      title:l.title||`Lesson ${i+1}`,
      skill:l.skill||l.skillName||'IELTS Writing',
      skillName:l.skillName||l.skill||'IELTS Writing',
      estimatedMinutes:Number(l.estimatedMinutes||l.time||35),
      difficulty:l.difficulty||'Medium',
      objective:l.objective||l.lessonObjective||'Understand and practise one IELTS Writing Task 2 skill.',
      lessonObjective:l.lessonObjective||l.objective||'Understand and practise one IELTS Writing Task 2 skill.',
      theory:l.theory||l.longTheory||l.explanation||'',
      examples:asArr(l.examples),
      commonMistakes:asArr(l.commonMistakes),
      successCriteria:asArr(l.successCriteria).length?asArr(l.successCriteria):['Learn','Skill Practice','Homework','Feedback','Rewrite','Reflection'],
      homeworkItems:asArr(l.homeworkItems),
      prerequisites:asArr(l.prerequisites),
      ...l
    }));
    D.chapters=arr(D.chapters).map((c,i)=>({id:c.id||`chapter-${i+1}`,chapterNo:Number(c.chapterNo||i+1),title:c.title||`Chapter ${i+1}`,objective:c.objective||c.chapterObjective||'',estimatedTime:c.estimatedTime||'2–3 hours',skills:asArr(c.skills),...c}));
    D.prompts=arr(D.prompts).map((p,i)=>({
      id:p.id||safeId('prompt',i),
      question:p.question||p.prompt||p.context||'IELTS Writing Task 2 prompt',
      essayType:p.essayType||p.type||'Opinion',
      topic:p.topic||'General',
      difficulty:p.difficulty||'Medium',
      suggestedMainIdeas:asArr(p.suggestedMainIdeas||p.mainIdeas),
      usefulVocabulary:asArr(p.usefulVocabulary||p.vocabularySuggestions),
      recommendedStructure:asArr(p.recommendedStructure||p.possibleStructure).length?asArr(p.recommendedStructure||p.possibleStructure):['Introduction','Body 1','Body 2','Conclusion'],
      relatedLessons:asArr(p.relatedLessons),
      status:p.status||'unused',
      ...p
    }));
    D.exerciseBank=arr(D.exerciseBank||D.practiceExercises).map((e,i)=>({
      id:e.id||safeId('exercise',i), lessonId:e.lessonId||((D.lessons[0]||{}).id)||'lesson-0001',
      skill:e.skill||e.skillName||'IELTS Writing', type:e.type||'guided', difficulty:e.difficulty||'Medium',
      objective:e.objective||'Practise the target IELTS skill.', situation:e.situation||'You are practising one small writing skill.',
      task:e.task||e.title||'Complete the exercise.', requirement:e.requirement||'Answer clearly and briefly.',
      example:e.example||'', checklist:asArr(e.checklist).length?asArr(e.checklist):['Stay on skill','Answer the exact task','Keep it clear'],
      expectedOutcome:e.expectedOutcome||'A clear answer that matches the target skill.', ...e
    }));
    D.practiceExercises=D.exerciseBank;
    D.ideaBank=arr(D.ideaBank||D.ideas).map((x,i)=>({id:x.id||safeId('idea',i),topic:x.topic||'General',commonIssue:x.commonIssue||x.commonQuestion||'',mainIdea:x.mainIdea||'',supportingIdea:x.supportingIdea||'',example:x.example||'',usefulVocabulary:asArr(x.usefulVocabulary||x.vocabulary),relatedPrompts:asArr(x.relatedPrompts),...x}));
    D.ideas=D.ideaBank;
    D.vocabulary=arr(D.vocabulary).map((v,i)=>({id:v.id||safeId('vocab',i),phrase:v.phrase||v.word||'',meaning:v.meaning||v.vietnameseMeaning||'',topic:v.topic||'General',status:v.status||'new',collocation:v.collocation||'',exampleSentence:v.exampleSentence||v.example||'',...v}));
    D.sampleDatabase=arr(D.sampleDatabase||D.sampleEssays).map((s,i)=>({id:s.id||safeId('sample',i),topic:s.topic||'General',essayType:s.essayType||s.type||'Opinion',introduction:s.introduction||'',body1:s.body1||'',body2:s.body2||'',conclusion:s.conclusion||'',...s}));
    D.sampleEssays=D.sampleDatabase;
    D.lessonResources=arr(D.lessonResources);
    D.chapterReviews=arr(D.chapterReviews);
    D.topics=Array.from(new Set(arr(D.topics).concat(D.prompts.map(p=>p.topic)).filter(Boolean)));
    D.essayTypes=Array.from(new Set(arr(D.essayTypes).concat(D.prompts.map(p=>p.essayType||p.type)).filter(Boolean)));
  }
  function migration(){
    try{
      const key='ieltsAcademyV55MigrationDone';
      if(localStorage.getItem(key)) return;
      // Soft migration only: never delete learner data.
      const sysKey='ieltsAcademyV22System';
      const sys=JSON.parse(localStorage.getItem(sysKey)||'{}');
      if(!Array.isArray(sys.users)||!sys.users.length){
        sys.users=[
          {id:'phuc',name:'Phúc',username:'phuc',role:'student',pin:'1234',avatar:'PH',currentBand:5.5,targetBand:6.5,createdAt:new Date().toISOString(),status:'active'},
          {id:'teacher',name:'Teacher',username:'teacher',role:'teacher',pin:'2222',avatar:'TC',createdAt:new Date().toISOString(),status:'active'},
          {id:'admin',name:'Admin',username:'admin',role:'admin',pin:'0000',avatar:'AD',createdAt:new Date().toISOString(),status:'active'}
        ];
        sys.currentUserId='phuc';
        sys.dataByUser=sys.dataByUser||{};
        localStorage.setItem(sysKey,JSON.stringify(sys));
      }
      localStorage.setItem(key,'1');
    }catch(e){console.warn('v5.5 migration skipped',e)}
  }
  normalizeData(); migration();
  window.addEventListener('error',function(ev){
    try{console.warn('[IELTS Academy v5.5 safety]', ev.message)}catch(e){}
  });
  window.IA55={normalizeData,migration,version:'5.5'};
})();
