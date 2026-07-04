(function(){
function getLesson(id){return IELTS_DATA.lessons.find(l=>l.id===id)||IELTS_DATA.lessons[0]}
function lessonsByChapter(chapterId){return IELTS_DATA.lessons.filter(l=>l.chapterId===chapterId)}
function firstIncomplete(){const done=Store.get('completedLessons',{});return IELTS_DATA.lessons.find(l=>!done[l.id])||IELTS_DATA.lessons[0]}
function askTeacherPrompt(l){return `Chị ơi, em đang học:\nChapter: ${l.chapterTitle}\nLesson: ${l.title}\nSkill: ${l.skill}\nTask: ${l.homework.title}\n\nEm cần chị giải thích/chữa phần này:\n...\n\nBài làm/ý tưởng của em:\n...`}
function chapterProgress(chapterId){const done=Store.get('completedLessons',{});const list=lessonsByChapter(chapterId);return {done:list.filter(l=>done[l.id]).length,total:list.length,percent:UI.pct(list.filter(l=>done[l.id]).length,list.length)}}
window.Lessons={getLesson,lessonsByChapter,firstIncomplete,askTeacherPrompt,chapterProgress};
})();
