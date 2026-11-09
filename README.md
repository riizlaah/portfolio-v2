# Katalog Kerja — Naf'an Rizkilah

Situs portofolio statis dan katalog PDF A4. Semua halaman memakai HTML, CSS hasil kompilasi Tailwind, dan JavaScript modular tanpa framework.

## Halaman

- `index.html` — beranda: ringkasan, tiga karya pilihan, profil, pencapaian, kontak.
- `projects.html` — ledger 33 karya dengan pencarian, filter disiplin, pratinjau, dan tautan langsung (`#slug`).
- `techstack.html` — timeline tool yang dihitung dari bulan mulai pemakaian.
- `print.html` — katalog A4 13 halaman: cover, daftar isi, profil, pencapaian, tools, empat karya pilihan, indeks 33 karya, dan kontak.

## Menjalankan

```bash
python3 -m http.server 4173 --bind 127.0.0.1
# buka http://127.0.0.1:4173
```

## Build CSS

`output.css` ikut disimpan agar situs bisa langsung di-hosting statis. Setelah mengubah `input.css` atau class Tailwind di HTML/JS:

```bash
tailwindcss -i ./input.css -o ./output.css --minify
# saat mengembangkan:
tailwindcss -i ./input.css -o ./output.css --watch
```

Proyek ini tidak memakai `package.json`; cukup Tailwind CLI yang tersedia di sistem.

Font Archivo dan Newsreader disimpan di `assets/fonts/`; tidak ada permintaan font ke pihak ketiga.

## Membuat PDF

1. Jalankan `python3 -m http.server 4173 --bind 127.0.0.1`, lalu buka `http://127.0.0.1:4173/print.html`.
2. Tunggu tombol **Cetak / Simpan PDF** aktif (halaman menunggu font dan gambar selesai dimuat).
3. Klik tombol, pilih **Save as PDF** dengan:
   - Paper size: **A4**
   - Margins: **None**
   - Scale: **100%**
   - **Background graphics: ON**

Atau lewat Chrome headless:

```bash
google-chrome --headless=new --no-pdf-header-footer \
  --virtual-time-budget=12000 \
  --print-to-pdf=portfolio.pdf \
  http://127.0.0.1:4173/print.html
```

Setiap `.sheet` berukuran tetap 210 × 297 mm, sehingga jumlah halaman PDF sama dengan jumlah `.sheet` (13 halaman).

## Sumber data

`data.js` adalah satu-satunya sumber data:

- `profile` — identitas, kontak, bio, fokus.
- `projects` — 33 proyek; `thumb` untuk web (WebP), `full` untuk PDF (PNG asli).
- `techStacks` — 16 tool beserta bulan mulai dan status.
- `featured` — empat karya yang tampil di beranda dan PDF.
- `achievements` — empat pencapaian 2025—2026; `achievementYears` mengelompokkannya per tahun untuk beranda dan PDF.

`projects.js` hanya mengekspor ulang `data.js` untuk kompatibilitas.

## Catatan aset

- `assets/thumbs/` — thumbnail WebP untuk web.
- `assets/thumbnails/` — tangkapan layar PNG resolusi penuh untuk PDF.
- `assets/opt/` — potret teroptimasi untuk web dan cetak.
- `assets/certs/thumbs/` — pratinjau WebP sertifikat dengan nomor sensitif disamarkan. PDF asli di `assets/certs/` hanya menjadi sumber, tidak ditautkan dari situs, dan sebaiknya tidak diunggah ke hosting publik.
- `assets/icons.svg` — sprite ikon antarmuka.
- `assets/icons/` — logo tool untuk timeline.
- `assets/favicon.svg` — favicon sekaligus logomark.

Tidak ada klien, metrik, testimoni, atau pencapaian yang dibuat-buat. Empat pencapaian di `data.js` berasal dari sertifikat dan hasil lomba yang disediakan pemilik portofolio. Angka pengalaman dan durasi tool dihitung dari tanggal mulai yang tercatat.
