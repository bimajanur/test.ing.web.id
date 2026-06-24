const bookData = {
  title: "Misi Rahasia Hari Raya",
  spreads: [
    // Halaman 1: Sampul Depan & Halaman Judul Dalam
    {
      type: "waving-animation",
      bgColor: "#FFFDF7",
      // title: {
      //   text: "Misi Rahasia Hari Raya",
      //   top: '50px',
      //   left: '400px'
      // },
      background: {
        image: "images/halaman-1/latar.jpg",
        top: "0%",
        left: "0%",
        width: "100%",
        zIndex: 0
      },
      badan: {
        image: "images/halaman-1/badan-izan.webp",
        top: "12%",
        left: "9%",
        width: "34%",
        zIndex: 2
      },
      leftHand: {
        image: "images/halaman-1/tangan-kiri.webp",
        top: "52%",
        left: "28%",
        width: "12%",
        origin: "bottom left",
        zIndex: 1
      },
      rightHand: {
        image: "images/halaman-1/tangan-kanan.webp",
        top: "62%",
        left: "18%",
        width: "11%",
        origin: "0 75px",
        zIndex: 2
      },
      speechBubbles: [
        {
          text: "Misi Rahasia Hari Raya!",
          audio: "audio/halaman-1.mp3",
          top: "7%",
          left: "74%",
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
        image: "images/halaman-2/cerita.webp",
        alt: "Petunjuk Penggunaan",
        speechBubbles: [
          {
            text: "Ayah, Ibu, ayo main!",
            audio: "audio/halaman-2.mp3",
            top: "14%",
            left: "15%"
          }
        ]
      },
      right: {
        type: "guide-list",
        title: "Panduan Penggunaan 📖",
        speechBubbles: [
          {
            text: "Petunjuk!",
            audio: "audio/halaman-2-petunjuk.mp3",
            top: "-1%",
            left: "-6%",
            hideText: true
          }
        ],
        items: [
          { icon: "images/halaman-2/button-prev.webp", text: "Tekan untuk membuka halaman sebelumnya." },
          { icon: "images/halaman-2/button-next.webp", text: "Tekan untuk membuka halaman selanjutnya." },
          { icon: "images/halaman-2/button-play.webp", text: "Tekan untuk mendengarkan suara narasi." },
          { icon: "images/halaman-2/button-sound.webp", text: "Tekan untuk menghidupkan atau mematikan suara latar." },
          { icon: "images/halaman-2/button-mulai-main.webp", text: "Tekan untuk memainkan permainan interaktif." },
          { icon: "images/halaman-2/button-info.webp", text: "Tekan untuk melihat informasi buku." }
        ],
      }
    },

    // halaman 3: Bosan coklat lagi!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-3/cerita.webp",
      speechBubbles: [
        {
          text: "Bosan, cokelat lagi, cokelat lagi!",
          audio: "audio/halaman-3.mp3",
          top: "15%",
          left: "32%",
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
      introImage: "images/halaman-5/intro.webp",
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
      titleAudio: "audio/halaman-5-title.mp3",
      subtitle: "",
      speechBubbles: [],
      mainBox: {
        image: "images/halaman-5/kardus-buka-atas.webp",
        width: "64%",
        top: "50%",
        left: "50%",
        aspectRatio: "1300 / 864",
        movedBoxTransform: "translate(calc(-50% - 28vw), -50%) scale(0.85)",
      },
      tape: {
        image: "images/halaman-5/selotip.webp",
        width: "100%",
        top: "50%",
        left: "50%",
        aspectRatio: "1300 / 240",
      },
      arrow: {
        image: "images/halaman-5/arah-panah.webp",
        height: "60%",
        top: "50%",
        left: "3%",
      },
      flapTop: {
        image: "images/halaman-5/kardus-atas-atas.webp",
        height: "50%",
      },
      flapBottom: {
        image: "images/halaman-5/kardus-atas-bawah.webp",
        height: "50%",
      },
      nampah: {
        image: "images/halaman-5/nampah.webp",
        width: "65%",
        top: "50%",
        left: "85%",
        aspectRatio: "1/1",
        movedNampahTransform: "translate(-63%, -50%) scale(0.75)",
      },
      boxItems: [
        {
          image: "images/halaman-5/lapis-legit-atas.webp",
          fullImage: "images/halaman-5/lapis-legit-full.webp",
          width: "35%",
          top: "7%",
          left: "14%",
          zIndex: 5
        },
        {
          image: "images/halaman-5/kolang-kaling-atas.webp",
          fullImage: "images/halaman-5/kolang-kaling-full.webp",
          width: "40%",
          top: "6%",
          left: "38%",
          zIndex: 4
        },
        {
          image: "images/halaman-5/wajik-atas.webp",
          fullImage: "images/halaman-5/wajik-full.webp",
          width: "35%",
          top: "22%",
          left: "51%",
          zIndex: 2
        },
        {
          image: "images/halaman-5/roti-jala-atas.webp",
          fullImage: "images/halaman-5/roti-jala-full.webp",
          width: "35%",
          top: "29%",
          left: "19%",
          zIndex: 3
        },
        {
          image: "images/halaman-5/burasa-atas.webp",
          fullImage: "images/halaman-5/burasa-full.webp",
          width: "42%",
          top: "56%",
          left: "42%",
          zIndex: 1
        }
      ],
      startInstruction: "Geser panah ke kanan!",
      itemScale: 0.8,
      dragInstruction: "Keluarkan oleh-oleh ke nampah!",
      feedbackCorrect: "Hore selesai! Klik oleh-oleh untuk melihatnya.",
      feedbackIncorrect: "Geser panah ke kiri sampai ujung!",
    },

    // halaman 6: bening kenyal dingin!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-6/cerita.jpg",
      speechBubbles: [
        {
          text: "Apa ini? Bening, kenyal, dingin!",
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
      introImage: "images/halaman-7/intro.webp",
      introSpeechBubbles: [
        {
          text: "Izan siap mencampur sirup!",
          audio: "audio/halaman-7-intro.mp3",
          top: "10%",
          left: "55%"
        }
      ],
      title: "Bantu Izan Teteskan Sirup, Yuk!",
      titleAudio: "audio/halaman-7-title.mp3",
      subtitle: "Tuang Botol Sirup Sesuai Warna Mangkok Kolang-Kaling",
      speechBubbles: [
        {
          text: "Tuang Botol Sirup Sesuai Warna Mangkok 🔴🟢🟡",
          audio: "audio/halaman-7.mp3",
          top: "14%",
          left: "74%",
          hideText: true
        }
      ],
      draggables: [
        { id: "botol-merah", src: "images/halaman-7/botol-merah.webp", target: "merah" },
        { id: "botol-kuning", src: "images/halaman-7/botol-kuning.webp", target: "kuning" },
        { id: "botol-hijau", src: "images/halaman-7/botol-hijau.webp", target: "hijau" }
      ],
      dropZones: [
        {
          id: "merah",
          startSrc: "images/halaman-7/mangkok-merah-start.webp",
          doneSrc: "images/halaman-7/mangkok-merah-done.webp",
          decoration: { src: "images/halaman-7/angka-1.webp", className: "drop-zone-deco" }
        },
        {
          id: "kuning",
          startSrc: "images/halaman-7/mangkok-kuning-start.webp",
          doneSrc: "images/halaman-7/mangkok-kuning-done.webp",
          decoration: { src: "images/halaman-7/angka-2.webp", className: "drop-zone-deco" }
        },
        {
          id: "hijau",
          startSrc: "images/halaman-7/mangkok-hijau-start.webp",
          doneSrc: "images/halaman-7/mangkok-hijau-done.webp",
          decoration: { src: "images/halaman-7/angka-3.webp", className: "drop-zone-deco" }
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

    // halaman 9: GAME 3 - Pindahkan wajik!
    {
      type: "drag-drop-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-9/intro.jpg",
      introSpeechBubbles: [
        {
          text: "pindahkan wajik sesuai bentuknya",
          audio: "audio/halaman-9-intro.mp3",
          top: "10%",
          left: "10%"
        }
      ],
      title: "Cari yang bentuknya sama, yuk!",
      titleAudio: "audio/halaman-9-title.mp3",
      subtitle: "Pindahkan wajik dari kiri ke kanan",
      speechBubbles: [],
      layoutBgImage: "images/halaman-9/kotak-makan.webp",
      layoutStyle: "width: 80%; height: 70%; margin: auto; margin-top: -10px;",
      dragItemsStyle: "",
      dropZonesStyle: "",
      draggables: [
        { id: "wajik-segitiga", src: "images/halaman-9/wajik-segitiga.webp", target: "wadah-segitiga", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "33%", left: "17%" },
        { id: "wajik-persegi-panjang", src: "images/halaman-9/wajik-persegi-panjang.webp", target: "wadah-persegi-panjang", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "33%", left: "32.5%" },
        { id: "wajik-lingkaran", src: "images/halaman-9/wajik-lingkaran.webp", target: "wadah-lingkaran", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "58%", left: "17%" },
        { id: "wajik-persegi", src: "images/halaman-9/wajik-persegi.webp", target: "wadah-persegi", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "58%", left: "32.5%" }
      ],
      dropZones: [
        {
          id: "wadah-persegi",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-9/wajik-persegi.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "33%",
          left: "52.5%"
        },
        {
          id: "wadah-segitiga",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-9/wajik-segitiga.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "33%",
          left: "67%"
        },
        {
          id: "wadah-persegi-panjang",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-9/wajik-persegi-panjang.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "58%",
          left: "53%"
        },
        {
          id: "wadah-lingkaran",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-9/wajik-lingkaran.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "58%",
          left: "68%"
        }
      ],
      feedbackCorrect: "Wah, kamu hebat! Semua wajik sudah pada tempatnya!",
      feedbackIncorrect: "Bentuknya tidak sama, coba lagi!"
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
      titleAudio: "audio/halaman-11-title.mp3",
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
      titleAudio: "audio/halaman-13-title.mp3",
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
      titleAudio: "audio/halaman-14-title.mp3",
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
      titleAudio: "audio/halaman-16-title.mp3",
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
