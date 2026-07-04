# Editing Content

Dữ liệu chính nằm trong `/data`. Web chạy trực tiếp từ `assets/js/data.js` để tránh lỗi fetch khi mở bằng `file://`.

Nếu muốn phát triển bản nâng cấp:

- Dùng `data/*.json` làm source of truth.
- Generate lại `assets/js/data.js` từ các JSON.
- Không nên viết dữ liệu học viên vào file JSON vì web offline lưu trong localStorage.
