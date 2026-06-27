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
            audio: "audio/halaman-2-1.mp3",
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
            audio: "audio/halaman-2-2.mp3",
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
      image: "images/halaman-4/cerita.webp",
      speechBubbles: [
        {
          text: "Lihat... Ayah bawa harta karun!",
          audio: "audio/halaman-4-1.mp3",
          top: "7%",
          left: "38%"
        },
        {
          text: "Wah, harta karun apa itu?",
          audio: "audio/halaman-4-2.mp3",
          top: "31%",
          left: "24%",
          // bgColor: "#FFD56B",
          // btnColor: "#FF7B54"
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
          audio: "audio/halaman-5-1.mp3",
          top: "7%",
          left: "3%"
        },
        {
          text: "Ayo, keluarkan harta karunnya!",
          audio: "audio/halaman-5-2.mp3",
          top: "30%",
          left: "78%"
        }
      ],
      title: "Keluarkan kuenya, yuk!",
      titleAudio: "audio/halaman-5-3.mp3",
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
      itemScale: 0.8,
      startInstruction: "Geser panah ke kanan!",
      startAudio: "audio/halaman-5-3.mp3",
      dragInstruction: "Ayo, pindahkan kuenya ke tampah!",
      dragAudio: "audio/halaman-5-4.mp3",
      feedbackCorrect: "Hore selesai! Klik oleh-oleh untuk melihatnya.",
      // feedbackCorrectAudio: "audio/halaman-5-benar.mp3",
      hideCorrectSpeechBtn: true,
      feedbackIncorrect: "Geser panah ke kiri sampai ujung!",
      // feedbackIncorrectAudio: "audio/halaman-5-salah.mp3",
      hideIncorrectSpeechBtn: true
    },

    // halaman 6: bening kenyal dingin!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-6/cerita.webp",
      speechBubbles: [
        {
          text: "Apa ini? Bening, kenyal, dingin!",
          audio: "audio/halaman-6-1.mp3",
          top: "10%",
          left: "3%",
        },
        {
          text: "Ini kolang-kaling. Ayo beri rasa!",
          audio: "audio/halaman-6-2.mp3",
          top: "83%",
          left: "54%",
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
          text: "Siap tuang sirup ke kolang-kaling!",
          audio: "audio/halaman-7-1.mp3",
          top: "12%",
          left: "5%"
        },
        {
          text: "Semangat!",
          audio: "audio/halaman-7-2.mp3",
          top: "33%",
          left: "60%"
        }
      ],
      title: "Bantu Izan menuang sirup, yuk!",
      titleAudio: "audio/halaman-7-3.mp3",
      startInstruction: "Tuang botol sirup sesuai warna mangkok kolang kaling.",
      startAudio: "audio/halaman-7-4.mp3",
      speechBubbles: [],
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
      feedbackCorrectAudio: "audio/benar.mp3",
      feedbackIncorrect: "Warna sirup tidak cocok, coba lagi!",
      feedbackIncorrectAudio: "audio/salah.mp3"
    },

    // halaman 8: GAME 3 - Pindahkan wajik!
    {
      type: "drag-drop-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-8/intro.webp",
      introSpeechBubbles: [
        {
          text: "Ini kue wajik namanya.",
          audio: "audio/halaman-8-1.mp3",
          top: "9%",
          left: "5%",
        },
        {
          text: "Manis, legit, dan lengket sekali!",
          audio: "audio/halaman-8-2.mp3",
          top: "14%",
          left: "55%",
        }
      ],
      title: "Cari yang bentuknya sama, yuk!",
      titleAudio: "audio/halaman-8-3.mp3",
      startInstruction: "Pindahkan wajik dari kiri ke kanan",
      startAudio: "audio/halaman-8-4.mp3",
      speechBubbles: [],
      layoutBgImage: "images/halaman-8/kotak-makan.webp",
      layoutStyle: "width: 80%; height: 70%; margin: auto; margin-top: -10px;",
      dragItemsStyle: "",
      dropZonesStyle: "",
      draggables: [
        { id: "wajik-segitiga", src: "images/halaman-8/wajik-segitiga.webp", target: "wadah-segitiga", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "33%", left: "17%" },
        { id: "wajik-persegi-panjang", src: "images/halaman-8/wajik-persegi-panjang.webp", target: "wadah-persegi-panjang", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "33%", left: "32.5%" },
        { id: "wajik-lingkaran", src: "images/halaman-8/wajik-lingkaran.webp", target: "wadah-lingkaran", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "58%", left: "17%" },
        { id: "wajik-persegi", src: "images/halaman-8/wajik-persegi.webp", target: "wadah-persegi", hideOnDrop: true, style: "width: 130px; height: 130px; object-fit: contain;", top: "58%", left: "32.5%" }
      ],
      dropZones: [
        {
          id: "wadah-persegi",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-8/wajik-persegi.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "33%",
          left: "52.5%"
        },
        {
          id: "wadah-segitiga",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-8/wajik-segitiga.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "33%",
          left: "67%"
        },
        {
          id: "wadah-persegi-panjang",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-8/wajik-persegi-panjang.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "58%",
          left: "53%"
        },
        {
          id: "wadah-lingkaran",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          doneSrc: "images/halaman-8/wajik-lingkaran.webp",
          imgStyle: "width: 130px; height: 130px; object-fit: contain;",
          style: "margin: 0;",
          top: "58%",
          left: "68%"
        }
      ],
      feedbackCorrect: "Wah, kamu hebat! Semua wajik sudah pada tempatnya!",
      feedbackIncorrect: "Bentuknya tidak sama, coba lagi!"
    },

    // halaman 9: GAME 4 - Tumpuk tinggi sekali!
    {
      type: "susun-kue-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-9/intro.webp",
      introSpeechBubbles: [
        {
          text: "Coklat, emas, coklat, emas.",
          audio: "audio/halaman-9-1.mp3",
          top: "23%",
          left: "11%"
        },
        {
          text: "Buat menara lapis legit yuk!",
          audio: "audio/halaman-9-2.mp3",
          top: "32%",
          left: "67%"
        }
      ],
      title: "Bantu susun lapisan kue yuk.",
      titleAudio: "audio/halaman-9-3.mp3",
      startInstruction: "Tumpuk lapis legit, tinggi sekali!",
      startAudio: "audio/halaman-9-4.mp3",
      speechBubbles: [],
      draggables: [
        { id: "brown1", src: "images/halaman-9/lapis-coklat.webp", target: "stack", correct: true, hideOnDrop: true, top: "25%", left: "7%", style: "width: 130px; height: auto;" },
        { id: "brown2", src: "images/halaman-9/lapis-coklat.webp", target: "stack", correct: true, hideOnDrop: true, top: "25%", left: "18%", style: "width: 130px; height: auto;" },
        { id: "brown3", src: "images/halaman-9/lapis-coklat.webp", target: "stack", correct: true, hideOnDrop: true, top: "25%", left: "29%", style: "width: 130px; height: auto;" },
        { id: "yellow1", src: "images/halaman-9/lapis-kuning.webp", target: "stack", correct: true, hideOnDrop: true, top: "60%", left: "7%", style: "width: 130px; height: auto;" },
        { id: "yellow2", src: "images/halaman-9/lapis-kuning.webp", target: "stack", correct: true, hideOnDrop: true, top: "60%", left: "18%", style: "width: 130px; height: auto;" },
        { id: "yellow3", src: "images/halaman-9/lapis-kuning.webp", target: "stack", correct: true, hideOnDrop: true, top: "60%", left: "29%", style: "width: 130px; height: auto;" }
      ],
      dropZones: [
        // Dummy zones for left plates (static decoration)
        {
          id: "piring-kiri-1",
          target: "dummy",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          imgStyle: "display:none;",
          style: "width: 450px; height: 180px; z-index: 1;",
          top: "20%",
          left: "5%",
          decoration: { src: "images/halaman-9/piring-awal.webp", style: "width: 450px; position: absolute; bottom: 0; left: 0;" }
        },
        {
          id: "piring-kiri-2",
          target: "dummy",
          startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          imgStyle: "display:none;",
          style: "width: 450px; height: 180px; z-index: 1;",
          top: "55%",
          left: "5%",
          decoration: { src: "images/halaman-9/piring-awal.webp", style: "width: 450px; position: absolute; bottom: 0; left: 0;" }
        },
        // Dummy zone for right plate + base cake
        {
          id: "piring-kanan",
          target: "dummy",
          startSrc: "images/halaman-9/lapis-legit-awal.webp",
          imgStyle: "width: 180px; object-fit: contain; position: absolute; bottom: 40px; left: 110px; z-index: 2;",
          style: "width: 400px; height: 300px; z-index: 1;",
          top: "40%",
          left: "52%",
          decoration: { src: "images/halaman-9/piring-akhir.webp", style: "width: 400px; position: absolute; bottom: 0; left: 0;" }
        },
        // Active stacking zones (bottom to top)
        { id: "dz1", target: "stack", dynamicSrc: true, startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", imgStyle: "width: 180px; object-fit: contain;", style: "width: 180px; height: 50px; z-index: 10;", top: "53%", left: "60.5%" },
        { id: "dz2", target: "stack", dynamicSrc: true, startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", imgStyle: "width: 180px; object-fit: contain;", style: "width: 180px; height: 50px; z-index: 11;", top: "49%", left: "60.5%" },
        { id: "dz3", target: "stack", dynamicSrc: true, startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", imgStyle: "width: 180px; object-fit: contain;", style: "width: 180px; height: 50px; z-index: 12;", top: "45%", left: "60.5%" },
        { id: "dz4", target: "stack", dynamicSrc: true, startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", imgStyle: "width: 180px; object-fit: contain;", style: "width: 180px; height: 50px; z-index: 13;", top: "41%", left: "60.5%" },
        { id: "dz5", target: "stack", dynamicSrc: true, startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", imgStyle: "width: 180px; object-fit: contain;", style: "width: 180px; height: 50px; z-index: 14;", top: "37%", left: "60.5%" },
        { id: "dz6", target: "stack", dynamicSrc: true, startSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", imgStyle: "width: 180px; object-fit: contain;", style: "width: 180px; height: 50px; z-index: 15;", top: "33%", left: "60.5%" }
      ],
      feedbackCorrect: "Wah, kamu hebat! Kuenya jadi tinggi sekali!",
      feedbackIncorrect: "Coba lagi!"
    },

    // halaman 10: GAME 5 - Selalu berdua!
    {
      type: "drag-drop-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-10/intro.webp",
      introSpeechBubbles: [
        {
          text: "Hijau daunnya, ikat talinya.",
          audio: "audio/halaman-10-1.mp3",
          top: "25%",
          left: "10%"
        },
        {
          text: "Izan, burasa terbuat dari beras.",
          audio: "audio/halaman-10-2.mp3",
          top: "30%",
          left: "65%"
        }
      ],
      title: "Pasangkan Kue",
      titleAudio: "audio/halaman-10-3.mp3",
      speechBubbles: [],
      draggables: [],
      dropZones: [],
      feedbackCorrect: "Bagus!",
      feedbackIncorrect: "Coba lagi!"
    },

    // halaman 11: GAME 7 - Putar putar, coret bebas, lukis! 
    {
      type: "drawing-game",
      bgColor: "#FFFDF7",
      introImage: "images/halaman-11/intro.webp",
      introSpeechBubbles: [
        {
          text: "Mirip jaring laba-laba.",
          audio: "audio/halaman-11-1.mp3",
          top: "14%",
          left: "49%",
        },
        {
          text: "Ini namanya roti jala.",
          audio: "audio/halaman-11-2.mp3",
          top: "30%",
          left: "10%",
        },
        {
          text: "Izan mau tahu cara buatnya?",
          audio: "audio/halaman-11-3.mp3",
          top: "84%",
          left: "2%",
        }
      ],
      title: "Putar-putar, coret-coret!",
      titleAudio: "audio/halaman-11-4.mp3",
      startInstruction: "Lukis roti jala di atas loyang.",
      startAudio: "audio/halaman-11-5.mp3",
      speechBubbles: [],
      panImage: "images/halaman-11/wajan.webp",
      plateImage: "images/halaman-11/talenan.webp",
      bottleImage: "images/halaman-11/botol.webp",
      styles: {
        drawingArea: "width: 36%",
        bottle: "position: absolute; left: -10%; top: -5%; width: 150px; z-index: 5;",
        pan: "width: 180%; left: -7%; top: 0%;",
        canvas: "clip-path: circle(28% at 65% 45%); -webkit-clip-path: circle(28% at 65% 45%);",
        plateArea: "",
        plate: "",
        plateStack: "width: 350px; height: 310px;",
        pancake: "top: 50%; left: 50%; transform: translate(-50%, -50%) scale(.8);",
        finishBtn: ""
      },
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

    // halaman 12: Lukis, lipat, dan gulung!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-12/cerita.webp",
      speechBubbles: [
        {
          text: "Wah, semua sudah siap!",
          audio: "audio/halaman-12.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 13: Semua sudah siap!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-13/cerita.webp",
      speechBubbles: [
        {
          text: "Wah, semua sudah siap!",
          audio: "audio/halaman-13.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // halaman 14: Nyam nyam, enak sekali!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-14/cerita.webp",
      speechBubbles: [
        {
          text: "Nyam-nyam, izan suka semua kue!",
          audio: "audio/halaman-14.mp3",
          top: "80%",
          left: "10%",
        }
      ]
    },

    // Halaman 15: Misi berhasil!
    {
      type: "full-image",
      bgColor: "#FFFDF7",
      image: "images/halaman-15/cerita.webp",
      speechBubbles: [
        {
          text: "Misi Rahasia Hari Raya, Berhasil!",
          audio: "audio/halaman-15.mp3",
          top: "20%",
          left: "45%",
        },
        {
          text: "Besok kita coba cari makanan tradisional asli di pasar, ya!",
          audio: "audio/halaman-15-1.mp3",
          top: "50%",
          left: "10%",
        },
        {
          text: "Aku mau bagi kuenya juga ke teman-teman di sekolah nanti ibu",
          audio: "audio/halaman-15-2.mp3",
          top: "70%",
          left: "10%",
        }
      ]
    },

    // Halaman penutup: Penutup & Sampul Belakang
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
