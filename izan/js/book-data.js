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
        image: "images/halaman-2/cerita.jpg",
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
      image: "images/halaman-3/cerita.jpg",
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
      image: "images/halaman-4/cerita.jpg",
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
      type: "box-opening-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-5/intro.jpg",
      introSpeechBubbles: [
        {
          text: "Buka! Buka! Buka!",
          audio: "audio/halaman-5-intro.mp3",
          top: "7%",
          left: "3%"
        },
        {
          text: "ayo keluarkan kuenya, nak",
          audio: "audio/halaman-5-intro2.mp3",
          top: "30%",
          left: "78%"
        }
      ],
      title: "Keluarkan kuenya yuk!",
      subtitle: "",
      speechBubbles: [],
      boxBgImage: "images/halaman-5/kardus-buka-atas.png",
      flapTopImage: "images/halaman-5/kardus-atas-atas.png",
      flapBottomImage: "images/halaman-5/kardus-atas-bawah.png",
      tapeImage: "images/halaman-5/selotip.png",
      arrowImage: "images/halaman-5/arah-panah.png",
      boxConfig: {
        boxWidth: "75%",
        boxTop: "55%",
        boxLeft: "50%",
        boxAspectRatio: "1300 / 864",
        tapeWidth: "100%",
        tapeTop: "50%",
        tapeLeft: "50%",
        tapeAspectRatio: "1300 / 240",
        arrowHeight: "80%",
        arrowTop: "50%",
        arrowLeft: "5%",
        handleWidth: "30%",
        handleHeight: "140%",
        handleTop: "-20%",
        handleLeft: "0%",
        flapTopHeight: "50%",
        flapBottomHeight: "50%"
      },
      feedbackCorrect: "Kardus berhasil dibuka!",
      feedbackIncorrect: "Geser panah sampai ujung!"
    },

    // halaman 6: bening kenyal dingin!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-6/cerita.jpg",
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
      introImage: "images/halaman-7/intro.jpg",
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
        { id: "botol-kuning", src: "images/halaman-7/botol-kuning.png", target: "kuning" },
        { id: "botol-hijau", src: "images/halaman-7/botol-hijau.png", target: "hijau" }
      ],
      dropZones: [
        {
          id: "merah",
          startSrc: "images/halaman-7/mangkok-merah-start.png",
          doneSrc: "images/halaman-7/mangkok-merah-done.png",
          decoration: { src: "images/halaman-7/angka-1.png", className: "drop-zone-deco" }
        },
        {
          id: "kuning",
          startSrc: "images/halaman-7/mangkok-kuning-start.png",
          doneSrc: "images/halaman-7/mangkok-kuning-done.png",
          decoration: { src: "images/halaman-7/angka-2.png", className: "drop-zone-deco" }
        },
        {
          id: "hijau",
          startSrc: "images/halaman-7/mangkok-hijau-start.png",
          doneSrc: "images/halaman-7/mangkok-hijau-done.png",
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
      image: "images/halaman-8/cerita.jpg",
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
        image: "images/halaman-9/intro.jpg",
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
      image: "images/halaman-10/cerita.jpg",
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
      type: "drag-drop-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-11/intro.jpg",
      introSpeechBubbles: [
        {
          text: "Bantu ibu susun lapisan kue lapis ya",
          audio: "audio/halaman-11-intro.mp3",
          top: "10%",
          left: "10%"
        },
        {
          text: "Tumpuk lapis legit, tinggi sekali!",
          audio: "audio/halaman-11-intro2.mp3",
          top: "30%",
          left: "30%"
        }
      ],
      title: "Pasangkan Kue",
      subtitle: "",
      speechBubbles: [],
      draggables: [],
      dropZones: [],
      feedbackCorrect: "Wah, kamu hebat! Kuenya jadi tinggi sekali!",
      feedbackIncorrect: "Coba lagi!"
    },

    // halaman 12: Daun hijau, bungkus rapi!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-12/cerita.jpg",
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
      type: "drag-drop-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-13/intro.jpg",
      introSpeechBubbles: [
        {
          text: "Bantu pasangkan yuk!",
          audio: "audio/halaman-13-intro.mp3",
          top: "10%",
          left: "10%"
        },
        {
          text: "Selalu berdua, tidak berpisah!",
          audio: "audio/halaman-13-intro2.mp3",
          top: "25%",
          left: "10%"
        }
      ],
      title: "Pasangkan Kue",
      subtitle: "",
      speechBubbles: [],
      draggables: [],
      dropZones: [],
      feedbackCorrect: "Bagus!",
      feedbackIncorrect: "Coba lagi!"
    },

    // halaman 14: GAME 6 - Ikut garis, ikat erat!
    {
      type: "drag-drop-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-14/intro.jpg",
      introSpeechBubbles: [
        {
          text: "Ikuti garisnya, ikat erat!",
          audio: "audio/halaman-14-intro.mp3",
          top: "10%",
          left: "10%"
        }
      ],
      title: "Ikat Kue Jaring",
      subtitle: "",
      speechBubbles: [],
      draggables: [],
      dropZones: [],
      feedbackCorrect: "Bagus!",
      feedbackIncorrect: "Coba lagi!"
    },

    // halaman 15: Jaring kuning, jaring ajaib
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-15/cerita.jpg",
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
      type: "drawing-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-16/intro.jpg",
      introSpeechBubbles: [
        {
          text: "Putar-putar, coret bebas, seru!",
          audio: "audio/halaman-16-intro.mp3",
          top: "10%",
          left: "10%"
        }
      ],
      title: "Lukis Kue Jala",
      subtitle: "",
      speechBubbles: [],
      panImage: "images/halaman-16/wajan.png",
      plateImage: "images/halaman-16/piring.png",
      maxDraws: 5,
      drawColors: [
        "#F3C550",
        "#83BD75",
        "#FF7B54",
        "#995707",
        "#f178b1"
      ],
      feedbackCorrect: "Kue jalamu terlihat lezat sekali!",
      feedbackIncorrect: "Coba lagi!"
    },

    // halaman 17: Semua sudah siap!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-17/cerita.jpg",
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
      image: "images/halaman-18/cerita.jpg",
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
      image: "images/halaman-19/cerita.jpg",
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
