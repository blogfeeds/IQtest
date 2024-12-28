const questionBank = [
    {
        question: "Manakah dari berikut yang merupakan jenis segitiga?",
        options: ["Segitiga sama sisi", "Segitiga acak", "Segitiga oval", "Segitiga panjang"],
        answer: "a"
    },
    {
        question: "Jika A = 2, B = 3, dan C = A + B, berapa nilai C?",
        options: ["4", "5", "6", "7"],
        answer: "b"
    },
    {
        question: "Apa hasil dari 15 - 7 + 3?",
        options: ["11", "10", "8", "9"],
        answer: "a"
    },
    {
        question: "Mana yang lebih besar: 1/2 atau 2/5?",
        options: ["1/2", "2/5", "Keduanya sama", "Tidak ada jawaban"],
        answer: "a"
    },
    {
        question: "Jika semua kucing adalah hewan, dan semua hewan memiliki kaki, maka kucing memiliki?",
        options: ["Satu kaki", "Tiga kaki", "Empat kaki", "Tidak ada kaki"],
        answer: "c"
    },
    {
        question: "Bilangan mana yang genap: 11, 14, 19, 21?",
        options: ["11", "14", "19", "21"],
        answer: "b"
    },
    {
        question: "Apa warna langit saat siang hari?",
        options: ["Hijau", "Merah", "Biru", "Kuning"],
        answer: "c"
    },
    {
        question: "Jika mobil A bergerak 60 km/jam dan mobil B bergerak 80 km/jam, mobil manakah yang lebih cepat?",
        options: ["Mobil A", "Mobil B", "Keduanya sama", "Tidak dapat ditentukan"],
        answer: "b"
    },
    {
        question: "Apa 3 x 3 x 3?",
        options: ["6", "9", "27", "33"],
        answer: "c"
    },
    {
        question: "Apa yang lebih berat: 1 kg kapas atau 1 kg besi?",
        options: ["Kapas", "Besi", "Keduanya sama", "Tidak ada jawaban"],
        answer: "c"
    },
    {
        question: "Berapa banyak sisi yang dimiliki segi enam?",
        options: ["4", "5", "6", "7"],
        answer: "c"
    },
    {
        question: "Jika hari ini Senin, hari apa 3 hari kemudian?",
        options: ["Jumat", "Rabu", "Kamis", "Sabtu"],
        answer: "c"
    },
    {
        question: "Apa hasil dari 8 dibagi 4?",
        options: ["1", "2", "3", "4"],
        answer: "b"
    },
    {
        question: "Apa bentuk dari telur?",
        options: ["Bulat", "Persegi", "Oval", "Segitiga"],
        answer: "c"
    },
    {
        question: "Jika 2 + 2 = 4, maka 3 + 3 = ?",
        options: ["5", "6", "7", "8"],
        answer: "b"
    },
    {
        question: "Apa yang biasa kita pakai untuk menulis?",
        options: ["Pensil", "Kertas", "Meja", "Buku"],
        answer: "a"
    },
    {
        question: "Apa suara yang dihasilkan oleh ayam?",
        options: ["Moo", "Meow", "Kukuruyuk", "Woof"],
        answer: "c"
    },
    {
        question: "Apa warna darah manusia?",
        options: ["Hijau", "Merah", "Biru", "Kuning"],
        answer: "b"
    },
    {
        question: "Berapa jumlah jari di tangan manusia?",
        options: ["8", "10", "12", "14"],
        answer: "b"
    },
    {
        question: "Siapa penemu lampu pijar?",
        options: ["Alexander Graham Bell", "Thomas Edison", "Albert Einstein", "Nikola Tesla"],
        answer: "b"
    },
    {
        question: "Apa yang kita gunakan untuk melihat waktu?",
        options: ["Kamera", "Jam", "Televisi", "Radio"],
        answer: "b"
    }
];
let selectedQuestions = [];
let correctAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateQuiz() {
    shuffleArray(questionBank);
    selectedQuestions = questionBank.slice(0, 20);
    correctAnswers = selectedQuestions.map(q => q.answer);

    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    selectedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="options">
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${String.fromCharCode(97 + i)}">
                        <div class="option">${option}</div>
                    </label>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

function calculateIQ() {
    let score = 0;

    for (let i = 0; i < 20; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[i]) {
            score++;
        }
    }

    const iq = 80 + (score * 10);
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Nilai IQ Anda: ${iq}`;
    
    resultElement.style.color = iq >= 100 ? '#27ae60' : '#e74c3c';
    resultElement.style.opacity = 1;
}

// Generate quiz when page loads
window.onload = generateQuiz;

// Fungsi berbagi sosial
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank');
}

function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://t.me/share/url?url=${url}&text=${title}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
}

// Fungsi untuk mencetak hyperlink copyright
function printCopyright() {
    const year = new Date().getFullYear();
    const copyrightText = `© ${year} <a href="https://m364tr0n.web.id/" target="_blank">M364TR0N</a> Corps. - All rights reserved.`;
    document.getElementById('copyright').innerHTML = copyrightText;
}
// Panggil fungsi untuk mencetak copyright
        printCopyright();