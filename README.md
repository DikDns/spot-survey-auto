# Survey Auto Filler - Chrome Extension

Extension Chrome untuk mengisi survey UPI secara otomatis dengan jawaban random.

## Fitur

- ✨ **Isi Jawaban Kosong**: Mengisi hanya pertanyaan yang belum dijawab
- 🔄 **Isi Semua**: Mengisi semua pertanyaan dengan jawaban random (menimpa yang sudah ada)
- 📊 **Statistik Real-time**: Melihat jumlah pertanyaan yang sudah dan belum dijawab
- 🔍 **Refresh Statistik**: Update statistik kapan saja

## Cara Install

1. Buka Chrome dan masuk ke `chrome://extensions/`
2. Aktifkan **Developer mode** (toggle di pojok kanan atas)
3. Klik **Load unpacked**
4. Pilih folder `chrome-extension` dari project ini
5. Extension siap digunakan!

## Cara Menggunakan

1. Buka halaman survey UPI (https://survey.upi.edu/*)
2. Klik icon extension di toolbar Chrome
3. Pilih salah satu opsi:
   - **Isi Jawaban Kosong**: Untuk mengisi hanya pertanyaan yang belum dijawab
   - **Isi Semua**: Untuk mengisi semua pertanyaan (akan menimpa jawaban yang sudah ada)
4. Extension akan otomatis mengisi jawaban random untuk setiap pertanyaan

## Catatan

- Extension hanya bekerja di halaman survey UPI
- Jawaban dipilih secara random dari opsi yang tersedia
- Pastikan halaman survey sudah dimuat sepenuhnya sebelum menggunakan extension

## Struktur File

```
chrome-extension/
├── manifest.json      # Konfigurasi extension
├── content.js        # Script yang berjalan di halaman survey
├── popup.html        # UI popup extension
├── popup.js          # Logic popup
├── popup.css         # Styling popup
└── README.md         # Dokumentasi
```

## Icons

Anda perlu menambahkan icon files (icon16.png, icon48.png, icon128.png) atau extension akan menggunakan icon default Chrome.

## Lisensi

MIT License
