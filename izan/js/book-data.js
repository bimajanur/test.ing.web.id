/**
 * DATA KONTEN BUKU INTERAKTIF - MISI RAHASIA HARI RAYA
 * Berisi data halaman buku, teks cerita, berkas gambar JPG, dan kuis interaktif.
 * Anda dapat mengedit teks, nama file gambar, atau pertanyaan kuis dengan mudah di sini.
 */

const bookData = {
  title: "Misi Rahasia Hari Raya",
  spreads: [
    // Halaman-1: Sampul Depan & Halaman Judul Dalam
    {
      type: "waving-animation",
      bgColor: "#FFFDF7",
      bgImage: "images/halaman-1/badan-izan.png",
      handImage: "images/halaman-1/tangan-izan.png",
      text: "Misi Rahasia Hari Raya",
      handTop: "51%",
      handLeft: "28%",
      handWidth: "12%",
      handOrigin: "bottom left",
      speechBubbles: [
        {
          text: "Misi Rahasia Hari Raya!",
          audio: "audio/halaman-1.mp3",
          top: "72%",
          left: "22%",
          hideText: true
        }
      ]
    },

    // Halaman 2: Petunjuk Penggunaan
    {
      bgColorLeft: "#FFFDF7",
      bgColorRight: "#FFFDF7",
      left: {
        type: "story-image",
        image: "images/halaman-2.jpg",
        alt: "Petunjuk Penggunaan",
        speechBubbles: [
          {
            text: "Ayah, Ibu, ayo main!",
            audio: "audio/halaman-2.mp3",
            top: "10%",
            left: "10%"
          }
        ]
      },
      right: {
        type: "guide-list",
        title: "Panduan Penggunaan 📖",
        items: [
          { icon: "images/halaman-2/button-prev.png", text: "Tekan untuk membuka halaman sebelumnya." },
          { icon: "images/halaman-2/button-next.png", text: "Tekan untuk membuka halaman selanjutnya." },
          { icon: "images/halaman-2/button-sound.png", text: "Tekan untuk menghidupkan/mematikan suara." },
          { icon: "images/halaman-2/button-info.png", text: "Tekan untuk melihat informasi buku." }
        ]
      }
    },

    // halaman 3: Bosan coklat lagi!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-3.jpg",
      speechBubbles: [
        {
          text: "Bosan, cokelat lagi, cokelat lagi!",
          audio: "audio/halaman-3.mp3",
          top: "80%",
          left: "10%",
          bgColor: "#FFFDEB",
          btnColor: "#83BD75"
        }
      ]
    },

    // halaman 4: Ayah bawa harta karun!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-4.jpg",
      speechBubbles: [
        {
          text: "Lihat... Ayah bawa harta karun!",
          audio: "audio/halaman-4-1.mp3",
          top: "20%",
          left: "10%"
        },
        {
          text: "Wah, asyik sekali!",
          audio: "audio/halaman-4-2.mp3",
          top: "60%",
          left: "60%",
          bgColor: "#FFD56B",
          btnColor: "#FF7B54"
        }
      ]
    },

    // halaman 5: GAME 1 - Buka buka buka!
    {
      bgColorLeft: "#F9FBF7",
      bgColorRight: "#F9FBF7",
      left: {
        type: "quiz-question",
        image: "images/kuis1.jpg",
        question: "izan : Buka! Buka!Buka!\nibu : ayo keluarkan kuenya, nak"
      },
      right: {
        type: "quiz-options",
        options: [
          { text: "Ketupat 🍙", correct: true },
          { text: "Roti Pizza 🍕", correct: false }
        ],
        feedbackCorrect: "Hebat! Kamu benar! Ketupat dibungkus anyaman daun janur kuning kelapa.",
        feedbackIncorrect: "Ayo coba lagi! Ketupat dibungkus daun kelapa muda yang dianyam."
      }
    },

    // halaman 6: bening kenyal dingin!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-6.jpg",
      speechBubbles: [
        {
          text: "Bening kenyal dingin!",
          audio: "audio/halaman-6.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 7: GAME 2 - Teteskan sirup!
    {
      type: "drag-drop-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-7/cerita.png",
      introSpeechBubbles: [
        {
          text: "Izan siap mencampur sirup!",
          audio: "audio/halaman-7-intro.mp3",
          top: "10%",
          left: "55%"
        }
      ],
      title: "Bantu Izan Teteskan Sirup, Yuk!",
      subtitle: "Tuang Botol Sirup Sesuai Warna Mangkok Kolang-Kaling",
      speechBubbles: [
        {
          text: "Bantu Izan Teteskan Sirup, Yuk!",
          audio: "audio/halaman-7.mp3",
          top: "6%",
          left: "77%",
          hideText: true
        },
        {
          text: "Tuang Botol Sirup Sesuai Warna Mangkok 🔴🟢🟡",
          audio: "audio/halaman-7.mp3",
          top: "14%",
          left: "74%",
          hideText: true
        }
      ],
      draggables: [
        { id: "botol-merah", src: "images/halaman-7/botol-merah.png", target: "merah" },
        { id: "botol-hijau", src: "images/halaman-7/botol-hijau.png", target: "hijau" },
        { id: "botol-kuning", src: "images/halaman-7/botol-kuning.png", target: "kuning" }
      ],
      dropZones: [
        {
          id: "hijau",
          startSrc: "images/halaman-7/mangkok-hijau-start.png",
          doneSrc: "images/halaman-7/mangkok-hijau-done.png",
          decoration: { src: "images/halaman-7/angka-1.png", className: "drop-zone-deco" }
        },
        {
          id: "kuning",
          startSrc: "images/halaman-7/mangkok-kuning-start.png",
          doneSrc: "images/halaman-7/mangkok-kuning-done.png",
          decoration: { src: "images/halaman-7/angka-2.png", className: "drop-zone-deco" }
        },
        {
          id: "merah",
          startSrc: "images/halaman-7/mangkok-merah-start.png",
          doneSrc: "images/halaman-7/mangkok-merah-done.png",
          decoration: { src: "images/halaman-7/angka-3.png", className: "drop-zone-deco" }
        }
      ],
      feedbackCorrect: "Benar sekali!",
      feedbackIncorrect: "Warna sirup tidak cocok, coba lagi!"
    },

    // halaman 8: Manis, legit, lengket sekali!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-8.jpg",
      speechBubbles: [
        {
          text: "Manis, legit, lengket sekali!",
          audio: "audio/halaman-8.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 9: GAME 3 - Cari yang sama!
    {
      bgColorLeft: "#FFFDF7",
      bgColorRight: "#FCFAF5",
      left: {
        type: "quiz-question",
        image: "images/kuis3.jpg",
        question: "ayah : Cari yang bentuknya sama yuk!"
      },
      right: {
        type: "quiz-options",
        options: [
          { text: "Selai Nanas 🍍", correct: true },
          { text: "Selai Cokelat 🍫", correct: false }
        ],
        feedbackCorrect: "Luar biasa! Kue Nastar diisi dengan selai buah nanas asam manis yang lezat.",
        feedbackIncorrect: "Ayo tebak lagi! Nastar klasik khas hari raya menggunakan selai buah nanas berserat."
      }
    },

    // halaman 10: Garis cokelat, garis emas
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-10.jpg",
      speechBubbles: [
        {
          text: "Ajaib! Garis cokelat, garis emas!",
          audio: "audio/halaman-10.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 11: GAME 4 - Tumpuk tinggi sekali!
    {
      bgColorLeft: "#FFFDF7",
      bgColorRight: "#FFFDF7",
      left: {
        type: "story-image",
        image: "images/halaman-11.jpg",
        alt: "Merayakan Bersama Teman"
      },
      right: {
        type: "story-text",
        text: "ibu : Bantu ibu susun lapisan kue lapis ya\nizan : Tumpuk lapis legit, tinggi sekali!\nizan : Wah, kamu hebat! Kuenya jadi tinggi sekali!"
      }
    },

    // halaman 12: Daun hijau, bungkus rapi!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-12.jpg",
      speechBubbles: [
        {
          text: "Burasa! Daun hijau, bungkus rapi!",
          audio: "audio/halaman-12.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 13: GAME 5 - Selalu berdua!
    {
      bgColorLeft: "#FFFDF7",
      bgColorRight: "#FFFDF7",
      left: {
        type: "story-image",
        image: "images/halaman-13.jpg",
        alt: "Merayakan Bersama Teman"
      },
      right: {
        type: "story-text",
        text: "izan : Bantu pasangkan yuk!\nizan : Selalu berdua, tidak berpisah!"
      }
    },

    // halaman 14: GAME 6 - Ikut garis, ikat erat!
    {
      bgColorLeft: "#FFFDF7",
      bgColorRight: "#FFFDF7",
      left: {
        type: "story-image",
        image: "images/halaman-14.jpg",
        alt: "Merayakan Bersama Teman"
      },
      right: {
        type: "story-text",
        text: "izan : Ikuti garisnya, ikat erat!"
      }
    },

    // halaman 15: Jaring kuning, jaring ajaib
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-15.jpg",
      speechBubbles: [
        {
          text: "Jaring kuning, lezat rasanya!",
          audio: "audio/halaman-15.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 16: GAME 7 - Putar putar, coret bebas, lukis! 
    {
      bgColorLeft: "#FFFDF7",
      bgColorRight: "#FFFDF7",
      left: {
        type: "story-image",
        image: "images/halaman-16.jpg",
        alt: "Merayakan Bersama Teman"
      },
      right: {
        type: "story-text",
        text: "izan : Putar-putar, coret bebas, seru!"
      }
    },

    // halaman 17: Semua sudah siap!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-17.jpg",
      speechBubbles: [
        {
          text: "Wah, semua sudah siap!",
          audio: "audio/halaman-17.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 18: Nyam nyam, enak sekali!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-18.jpg",
      speechBubbles: [
        {
          text: "Nyam-nyam, izan suka semua kue!",
          audio: "audio/halaman-18.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // Halaman 19: Misi berhasil!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-19.jpg",
      speechBubbles: [
        {
          text: "Misi Rahasia Hari Raya, Berhasil!",
          audio: "audio/halaman-19.mp3",
          top: "20%",
          left: "45%",
        },
        {
          text: "Besok kita coba cari makanan tradisional asli di pasar, ya!",
          audio: "audio/halaman-19-1.mp3",
          top: "50%",
          left: "10%",
        },
        {
          text: "Aku mau bagi kuenya juga ke teman-teman di sekolah nanti ibu",
          audio: "audio/halaman-19-2.mp3",
          top: "70%",
          left: "10%",
        }
      ]
    },

    // Halaman 20: Penutup & Sampul Belakang
    {
      bgColorLeft: "#FFB26B",
      bgColorRight: "#FFDEB4",
      left: {
        type: "back-cover",
        title: "MISI SELESAI 🎉",
        message: "Terima kasih sudah membantu Izan menyelesaikan Misi Rahasia Hari Raya! Sampai jumpa lagi!"
      }
    }
  ]
};
