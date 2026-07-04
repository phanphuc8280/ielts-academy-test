# IELTS Academy v5.5 – Learner Experience Stability Upgrade

Bản v5.5 tập trung vào trải nghiệm học thật và độ ổn định khi chạy online bằng GitHub Pages.

## Điểm mới v5.5

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
2. Copy toàn bộ nội dung bên trong thư mục `ielts-academy-v5.5` vào repo GitHub Pages.
3. Giữ lại `.git` và `.nojekyll` trong repo.
4. Commit: `Update IELTS Academy to v5.5`.
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
