# 🚀 Spelling Galaxy – Game học từ vựng tiếng Anh

Game **bắn quái học từ vựng** tiếng Anh chơi trực tiếp trên web, kiểu Chicken Invaders / ZType:
quái vật mang **nghĩa tiếng Việt** (và định nghĩa tiếng Anh) rơi từ trên xuống, bạn **gõ đúng từ tiếng Anh rồi Enter** để tàu bắn laser hạ chúng.
Để quái lọt qua vạch đỏ là mất 1 mạng; hết 3 mạng là thua.

## Tính năng

- **390 từ · 39 unit · 3 cấp độ** (A1–A2, B1–B2, C1), mỗi unit 10 từ theo chủ đề, gồm các unit chuyên đề **tài chính** (Money basics, Personal finance, Banking & markets, Corporate finance, Investing) và **tâm lý học** (Feelings & mind, Psychology basics, Cognitive psychology, Clinical psychology).
- **2 chế độ chơi**
  - ⌨️ **Gõ từ**: quái hiện nghĩa tiếng Việt + định nghĩa tiếng Anh + số chữ cái, gõ từ để bắn.
  - 🎧 **Nghe & gõ**: quái không hiện nghĩa, chỉ phát âm (Web Speech API); nghe rồi gõ lại đúng chính tả. Bấm vào quái để nghe lại.
- **Cơ chế game**: tối đa 3 quái cùng lúc, tốc độ rơi tăng dần theo cấp độ và unit; điểm + thưởng combo + thưởng bắn sớm; 3 mạng; gợi ý 1 chữ cho quái gần nhất (-2 điểm, phím Tab); tạm dừng (Esc); laser, nổ, âm thanh.
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

Repo có sẵn workflow `.github/workflows/pages.yml`: mỗi lần push lên `main`, GitHub Actions tự deploy toàn bộ thư mục lên GitHub Pages.
Game chạy tại **https://capizerbino.github.io/EnglishGame/**.

Nếu Pages chưa bật, vào **Settings → Pages**, chọn Source là **GitHub Actions** rồi chạy lại workflow.

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
