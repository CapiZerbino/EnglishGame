# 🚀 Spelling Galaxy – Game học từ vựng tiếng Anh

Game học từ vựng tiếng Anh chơi trực tiếp trên web, lấy cảm hứng từ các game "spelling bee" phong cách vũ trụ:
xem nghĩa tiếng Việt + định nghĩa tiếng Anh, gõ đúng từ để phóng tàu bay lên cao.

## Tính năng

- **300 từ · 30 unit · 3 cấp độ** (A1–A2, B1–B2, C1), mỗi unit 10 từ theo chủ đề.
- **3 chế độ chơi**
  - ⌨️ **Gõ từ**: xem nghĩa tiếng Việt, định nghĩa và câu ví dụ, gõ từ tiếng Anh.
  - 🎧 **Nghe & gõ**: nghe phát âm (Web Speech API) rồi gõ lại đúng chính tả.
  - 🎯 **Trắc nghiệm**: chọn 1 trong 4 đáp án, hỗ trợ phím 1–4.
- **Cơ chế game**: điểm, combo, 3 mạng, gợi ý từng chữ (-2 điểm), bỏ qua, hiệu ứng tàu bay + pháo hoa, âm thanh.
- **Lưu tiến độ** bằng `localStorage`: XP, sao từng unit, từ đã thuộc, chuỗi ngày học, danh sách từ hay sai để **ôn tập lại**.
- Giao diện tiếng Việt, **dark/light mode**, responsive cho điện thoại.
- Không cần build, không phụ thuộc thư viện ngoài (chỉ dùng Google Fonts).

## Chạy thử

Mở thẳng `index.html` bằng trình duyệt, hoặc chạy một server tĩnh bất kỳ:

```bash
npx serve .
# hoặc
python3 -m http.server 8080
```

## Deploy lên GitHub Pages

1. Vào **Settings → Pages** của repo.
2. Chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`.
3. Vài phút sau game sẽ chạy tại `https://<user>.github.io/<repo>/`.

## Cấu trúc

```
index.html      # giao diện 3 màn hình: trang chủ, chơi, kết quả
css/style.css   # style, theme sáng/tối, responsive
js/data.js      # dữ liệu từ vựng (VOCAB_LEVELS)
js/game.js      # logic game, lưu tiến độ, âm thanh, TTS
```

## Thêm từ vựng

Mở `js/data.js`, thêm một mảng vào `words` của unit tương ứng (hoặc tạo unit mới):

```js
["word", "n", "nghĩa tiếng Việt", "English definition", "Example sentence with ___ for the word."]
```

Phần tử lần lượt là: từ, loại từ (`n`, `v`, `adj`, `adv`, `prep`), nghĩa tiếng Việt, định nghĩa tiếng Anh, câu ví dụ (dùng `___` ở vị trí từ).
