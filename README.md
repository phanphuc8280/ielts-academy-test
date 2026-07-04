
## v5.1 - 10MB Learner Motivation Pack

Bản này được làm nặng hơn khoảng 10MB để chứa thêm visual assets, workbook PDF, tài liệu luyện tập, và giao diện có chiều sâu hơn. Nội dung không chỉ là pad file: có thêm IELTS Overload Workbook, practice route, prompt packs và assets dùng cho theme.

# IELTS Academy v5.1 – Learner Experience Upgrade

Bản v5.1 tập trung sửa trải nghiệm học thật:

- Sidebar gọn hơn, không còn loạn quá nhiều menu.
- Router an toàn hơn: trang lỗi không làm chết toàn bộ sidebar.
- Fix Prompt Bank lỗi `Cannot read properties of undefined (reading length)`.
- Login được redesign: seed accounts, tạo user mới, switch account rõ hơn.
- Dashboard tập trung vào Today’s Mission: học gì, làm bài nào, review gì, hỏi chị ở đâu.
- Giữ dữ liệu v4.0: lessons, PDFs, prompts, sample database, exercise bank, multi-user localStorage.
- UI style mới: GitHub + VS Code + Duolingo + Coursera + AI dashboard, glassmorphism, glow, hover lift, responsive.

## Cách mở offline

Giải nén file zip, mở:

```text
ielts-academy-v5.1/index.html
```

## Cách update lên GitHub Pages

Copy toàn bộ nội dung bên trong thư mục `ielts-academy-v5.1` vào repo GitHub Pages của bạn, giữ `.git` và `.nojekyll`, sau đó Commit → Push bằng GitHub Desktop.

## Account test

- Student: `phuc` / PIN `1234`
- Teacher: `teacher` / PIN `2222`
- Admin: `admin` / PIN `0000`

## Lưu ý dữ liệu

Đây vẫn là static web demo. Dữ liệu học tập lưu trong browser localStorage của từng máy. PIN chỉ để mô phỏng LMS offline, không phải bảo mật thật.

## Changelog

### v5.1

Learner Experience Upgrade: giảm menu, sửa render safety, nâng login, fix Prompt Bank, polish UI.

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
