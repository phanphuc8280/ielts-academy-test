# localStorage Schema v1.1

Key chính: `ieltsAcademyV1`.

## studentProfile

```json
{
  "name": "Học viên IELTS",
  "currentBand": 5.5,
  "targetBand": 6.5,
  "startDate": "2026-07-04",
  "testDate": "2026-10-02",
  "sessionsPerWeek": 3,
  "dailyGoal": {"lessons": 1, "minutes": 30, "exercises": 2}
}
```

## teacherNotes

Mảng note giáo viên: `date`, `lessonId`, `studentName`, `strengths`, `weaknesses`, `nextHomework`, `teacherComment`, `status`.

## lessonHistory

Mảng lịch sử học lesson: `lessonId`, `startedAt`, `completedAt`, `timeSpent`, `status`, `reflection`.

## bandHistory

Mảng lịch sử band: `date`, `essayId`, `taskResponse`, `coherence`, `lexical`, `grammar`, `overallBand`, `teacherComment`.

## reviewQueue

Mảng ôn tập lỗi: `errorType`, `relatedLessonId`, `priority`, `nextReviewDate`, `status`.

## revisionHistory

Object theo `essayId`, mỗi essay có `versions` gồm draft, teacher feedback, rewrite, final.
