# IELTS Academy v6.0 – Learner Experience Stability Upgrade

Bản v6.0 tập trung vào trải nghiệm học thật và độ ổn định khi chạy online bằng GitHub Pages.

## Điểm mới v6.0

- Sidebar gọn hơn: Học hôm nay / Ôn tập / Kho học liệu / AI Tutor & Account.
- Thêm `v55-learner-experience.js` để chuẩn hóa dữ liệu trước khi render.
- Giảm lỗi `undefined`, `length`, thiếu field trong Prompt Bank / Exercise Bank / Idea Bank / Sample Database.
- Login giữ phong cách v5 nhưng rõ hơn cho account demo.
- Soft migration: không reset localStorage cũ.
- Style polish: learner-first dashboard, neon focus, hover mượt hơn.

## Cách mở offline

Mở `index.html` bằng Chrome hoặc Edge.

## Cách đưa lên GitHub Pages

1. Giải nén zip.
2. Copy toàn bộ nội dung bên trong thư mục `ielts-academy-v6.0` vào repo GitHub Pages.
3. Giữ lại `.git` và `.nojekyll` trong repo.
4. Commit: `Update IELTS Academy to v6.0`.
5. Push origin.
6. Đợi Actions xanh rồi mở link GitHub Pages cũ.

## Account demo

- Student: `phuc` / PIN `1234`
- Teacher: `teacher` / PIN `2222`
- Admin: `admin` / PIN `0000`

## Lưu ý dữ liệu

Bản này vẫn là static web, dữ liệu học tập lưu trong browser localStorage của từng máy. PIN chỉ là mô phỏng, không phải bảo mật thật.

## Khi update bản mới

Trước khi update bản lớn, học viên nên vào Profile & Backup để xuất dữ liệu JSON.


## v6.0 – Ask Chị Context Engine + Theme Studio

Bản v6.0 tập trung nâng cấp phần Ask Chị và trải nghiệm giao diện:

- Ask Chị không còn copy âm thầm: khi bấm sẽ mở modal **Prompt Preview** để học viên xem prompt trước khi copy.
- Prompt tự cập nhật từ student profile, current lesson, lesson status, homework, practice answers, essays, revision history, error log, review queue, teacher notes, band history, study sessions, vocabulary, reflection và dữ liệu vừa gõ trên trang.
- AI Context Builder có Prompt Level, Context Source, Lesson selector, toggles Teacher Notes / Error Log / Band History / Review Queue, Generate Prompt, Copy Prompt, Open ChatGPT.
- Thêm `askTeacherHistory`, `runtimeContext`, `liveLearningEvents` để chị/AI tutor hiểu hành trình học gần nhất.
- Sửa Light Theme để dễ đọc hơn, không bị quá tối/thiếu tương phản.
- Thêm Style Presets: Lập trình code, Anime, Minecraft, Ocean, Minimal, Neon.
- Package có thêm Theme Studio assets và tài liệu context pack để đạt khoảng 20MB.

### Lưu ý khi dùng online bằng GitHub Pages

Web vẫn là static/offline-first. Dữ liệu học nằm trong localStorage của từng trình duyệt. Muốn teacher/admin xem dữ liệu thật từ máy khác thì cần backend như Firebase/Supabase ở bản sau.
