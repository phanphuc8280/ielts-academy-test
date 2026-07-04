# IELTS Academy v4.0 - Instructional Design Upgrade

IELTS Academy v4.0 upgrades the course from a content-heavy LMS into an instructional-design IELTS Task 2 learning system.

## Philosophy

Every lesson must teach -> practice -> evaluate -> improve.

A lesson is not Mastered because the student has read the theory. A lesson is Mastered only after:

1. Overview and Learning Objective are understood
2. Theory is studied
3. Examples are analysed
4. Guided Analysis is completed
5. Skill Practice is saved
6. Homework is submitted
7. AI/Teacher Feedback is pasted
8. Rewrite is completed
9. Reflection and Review Quiz are completed

## What changed in v4.0

- New lesson structure: Overview, Learning Objective, Theory, Examples, Guided Analysis, Skill Practice, Homework, AI Feedback, Rewrite, Reflection, Mastered.
- Theory is expanded into What / Why / When / How / Common Mistakes / Band 6.5 Difference / Checklist / Mini Example.
- Skill Practice and Homework are no longer copies of each other.
- Skill Practice is scaffolded with hints and immediate feedback.
- Homework uses a new context and no hints.
- Each lesson has a downloadable PDF in `resources/lesson-pdfs/`.
- Each lesson has Vocabulary Sheet, Grammar Notes, Band 9 Example and Reference files.
- Prompt Bank expanded to 8,400 IELTS Task 2 contexts.
- Sample Database stores Band 9-style snippets by topic, type and paragraph section.
- Chapter Review system added: summary, mindmap, common mistakes, mini test, reflection, AI review.
- Migration keeps existing localStorage progress from v2/v3.

## How to open offline

Unzip the package and open:

`ielts-academy-v4.0/index.html`

Use Chrome or Edge.

## Test accounts

- Student: `phuc` / PIN `1234`
- Teacher: `teacher` / PIN `2222`
- Admin: `admin` / PIN `0000`

PIN is only a demo. Data is stored in browser localStorage. Do not use real passwords.

## How to use a lesson

Open Lesson Classroom. Follow the tabs in order:

Overview -> Theory -> Examples -> Guided Analysis -> Skill Practice -> Homework -> AI Feedback -> Rewrite -> Reflection -> Mastered.

Use `Download Lesson PDF` when you want a centre-style handout.

## How to update content

Edit:

- `data/lessons.json`
- `data/exercise-bank.json`
- `data/prompts.json`
- `data/chapter-reviews.json`
- `data/sample-database.json`

Then rebuild `assets/js/data.js` if you want the app to load new offline data without fetch.

## Backup / restore

Use Profile & Backup. Student Export exports the current user. Admin Export exports the whole offline system.
