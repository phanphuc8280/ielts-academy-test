# Migration v2.x → v3.0

Bản v3.0 giữ localStorage key `ieltsAcademyV22System` để không làm mất dữ liệu từ v2.2.

Khi app mở:

1. `multiuser.js` đọc hệ thống cũ.
2. `normalizeSystem()` nâng `version` lên `3.0`.
3. `normalizeUserData()` thêm field mới nếu thiếu.
4. Dữ liệu user cũ vẫn được giữ theo `userId`.

Field mới:

- `courseQAFeedback`
- structured exercise fields
- expanded prompt levels
- v3 lesson design metadata

Không reset:

- Progress
- XP
- Homework
- Essays
- Teacher Notes
- Errors
- Review Queue
- Band History
- Users
