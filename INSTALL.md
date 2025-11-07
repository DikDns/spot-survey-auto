# Cara Install Extension

## Langkah-langkah:

1. **Buka Chrome Extensions Page**

   - Buka browser Chrome
   - Ketik di address bar: `chrome://extensions/`
   - Atau klik menu (⋮) → More tools → Extensions

2. **Aktifkan Developer Mode**

   - Toggle switch "Developer mode" di pojok kanan atas halaman

3. **Load Extension**

   - Klik tombol "Load unpacked"
   - Pilih folder `chrome-extension` dari project ini
   - Extension akan langsung terinstall

4. **Gunakan Extension**
   - Buka halaman survey UPI: https://survey.upi.edu/*
   - Klik icon extension di toolbar Chrome (atau klik puzzle icon untuk melihat semua extensions)
   - Klik "Survey Auto Filler"
   - Pilih opsi yang diinginkan:
     - **Isi Jawaban Kosong**: Hanya mengisi pertanyaan yang belum dijawab
     - **Isi Semua**: Mengisi semua pertanyaan dengan jawaban random

## Troubleshooting

- **Extension tidak muncul?**

  - Pastikan Developer mode sudah aktif
  - Refresh halaman extensions
  - Cek apakah ada error di console (F12)

- **Tidak bisa mengisi survey?**

  - Pastikan Anda berada di halaman survey UPI (https://survey.upi.edu/*)
  - Pastikan halaman sudah dimuat sepenuhnya
  - Refresh halaman survey dan coba lagi

- **Error "Cannot access chrome.tabs"?**
  - Pastikan manifest.json sudah benar
  - Reload extension di chrome://extensions/

## Catatan Penting

⚠️ Extension ini hanya untuk keperluan testing dan edukasi. Pastikan penggunaan sesuai dengan kebijakan institusi.
