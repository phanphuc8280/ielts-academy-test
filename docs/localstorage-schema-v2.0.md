# LocalStorage Schema v2.0

Storage key: `ieltsAcademyV2`

Workflow: Learn → Practice → Homework → Teacher Feedback → Rewrite → Review → Mastered.

## Keys

- `studentProfile`: name, currentBand, targetBand, startDate, expectedExamDate, sessionsPerWeek, dailyGoal, onboarded.
- `lessonStatus`: per lesson workflow status.
- `lessonHistory`: every lesson session with startedAt, completedAt, timeSpent, status, reflection.
- `studySessions`: daily timer sessions.
- `homework`: per lesson answer/status/deadline.
- `essays`: essays with draft, feedback, rewrites, finalVersion, bandScores.
- `revisionHistory`: version log per essay.
- `errors`: error book items with frequency, firstSeen, lastSeen, priority.
- `reviewQueue`: review tasks generated manually or by rules.
- `teacherNotes`: teacher notes with active/resolved status.
- `bandHistory`: band entries by essay and IELTS criteria.
- `customAssignments`: manually-created assignments.
- `featureRequests`: changelog and product ideas.
