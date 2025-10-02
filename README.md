# Word-Wacko
Proyek Game: Word Scramble - Edisi Trivia Gaming
Latar Belakang
Proyek ini adalah sebuah game "Word Scramble" berbasis web yang dirancang sebagai capstone project. Game ini menantang pemain untuk menyusun kembali huruf-huruf yang diacak menjadi sebuah kata yang benar, berdasarkan petunjuk (trivia) seputar dunia video game. Dibuat dengan antarmuka yang modern dan interaktif, game ini bertujuan untuk memberikan pengalaman bermain yang seru dan mengasah otak bagi para penggemar game.

Fitur Utama
Gameplay Trivia Gaming: Pertanyaan yang disajikan berfokus pada pengetahuan umum seputar video game dari berbagai genre, seperti RPG, FPS, Adventure, Racing, dan klasik.

Dua Mode Jawaban Interaktif: Pemain dapat memilih cara menjawab yang paling nyaman:

Mode Klik Huruf: Memilih huruf satu per satu dari tumpukan huruf acak untuk mengisi kotak jawaban yang telah disediakan.

Mode Ketik Jawaban: Mengetik langsung jawaban menggunakan keyboard, di mana hanya huruf yang tersedia di tumpukan acak yang dapat diinput, memberikan umpan balik visual secara real-time.

Sistem Nyawa dan Waktu: Pemain dibekali 3 nyawa yang akan berkurang setiap kali melakukan kesalahan atau kehabisan waktu. Setiap pertanyaan juga memiliki batas waktu untuk menambah tingkat tantangan.

Verifikasi Jawaban Otomatis: Jawaban akan langsung diperiksa oleh sistem setelah semua huruf terisi, membuat alur permainan menjadi lebih cepat dan mulus tanpa perlu menekan tombol submit.

Desain Modern & UI Jelas: Tampilan game dirancang agar menarik secara visual, dengan semua informasi penting (skor, nyawa, waktu) yang mudah dilihat dan dipahami.

Tumpukan Teknologi (Technology Stack)
Game ini dibangun sepenuhnya di sisi klien (client-side), tanpa memerlukan backend. Teknologi yang digunakan adalah:

HTML5: Sebagai struktur dasar kerangka aplikasi game.

CSS3: Untuk styling, layouting, animasi, dan memastikan tampilan sesuai dengan desain modern yang telah dirancang.

JavaScript (Vanilla): Sebagai otak dari permainan, mengelola semua logika game, interaksi pengguna, state (skor, nyawa, waktu), dan manipulasi DOM.

Penjelasan Dukungan AI: Pemanfaatan IBM watsonx
Dalam pengembangan proyek ini, kecerdasan buatan (AI) dimanfaatkan untuk mempercepat proses dan meningkatkan kualitas kode. Secara spesifik, kami menggunakan IBM watsonx Code Assistant sebagai partner dalam beberapa tahap pengembangan.

1. Generasi Kode Awal
Pada tahap awal, setelah desain visual selesai dirancang, kami memberikan deskripsi detail mengenai logika dan fitur yang diinginkan kepada IBM watsonx. AI kemudian membantu menghasilkan (generate) kerangka kode dasar untuk file index.html, style.css, dan script.js. Ini termasuk struktur elemen, styling awal, dan fungsi-fungsi inti JavaScript seperti logika untuk mengacak kata, memeriksa jawaban, dan mengelola timer. Proses ini secara signifikan memangkas waktu pengembangan awal dan memberikan fondasi yang kuat.

2. Optimisasi dan Refactoring Kode
Setelah semua fitur berhasil diimplementasikan, kami kembali menggunakan IBM watsonx dengan tugas yang lebih spesifik: mengoptimalkan kode yang sudah ada. Kami memberikan prompt yang terstruktur, meminta AI untuk bertindak sebagai seorang expert developer dan merefaktor kode dengan fokus pada:

Manajemen State: Mengusulkan cara yang lebih baik untuk mengelola variabel global agar lebih terstruktur.

Efisiensi Manipulasi DOM: Menyarankan teknik-teknik untuk rendering yang lebih cepat dan efisien.

Keterbacaan (Readability): Memperbaiki nama variabel dan fungsi agar lebih intuitif dan mudah dipelihara di kemudian hari.

Dengan bantuan IBM watsonx, kode akhir dari proyek ini menjadi lebih bersih, terstruktur, dan efisien, sesuai dengan praktik terbaik dalam pengembangan web modern.
I create this word scramble game web-based using ai code generator, IBM Watsonx. I also optimize the code using Watsonx. This project i've make to complete the capstone project assesment on Hacktiv8 x IBM Skillbuild bootcamp of Code Generation and Code Optimization.
