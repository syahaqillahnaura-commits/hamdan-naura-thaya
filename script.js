// script.js

// --- 1. Fungsi Pratinjau Gambar ---
function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('imagePreview');
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
        document.getElementById('statusMessage').textContent = 'Gambar siap dianalisis.';
    } else {
        preview.style.display = 'none';
        document.getElementById('statusMessage').textContent = 'Unggah gambar untuk memulai analisis.';
    }
}

// --- 2. Fungsi Simulasi Analisis August AI ---
function runAISimulation() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert("Mohon unggah gambar gigi terlebih dahulu.");
        return;
    }

    const analyzeBtn = document.getElementById('analyzeBtn');
    const statusMessage = document.getElementById('statusMessage');
    const aiDetail = document.getElementById('aiDetail');

    // Tampilkan status loading
    statusMessage.innerHTML = 'Sedang memproses gambar... **August AI** sedang menganalisis (mohon tunggu 3 detik)...';
    analyzeBtn.disabled = true;

    // --- SIMULASI PANGGILAN API KE BACKEND AI ---
    // Dalam dunia nyata, ini adalah 'fetch()' API ke server Python/Node.js
    setTimeout(() => {
        // Data hasil simulasi dari August AI
        const simulatedResult = {
            diagnosis: "Potensi Karies Dini (Gigi Geraham Kiri)",
            risiko: "Sedang (68%)",
            rekomendasi: "Disarankan untuk melakukan penambalan preventif dan menggunakan pasta gigi berfluoride tinggi."
        };

        // Tampilkan hasil
        document.getElementById('diagnosis').textContent = simulatedResult.diagnosis;
        document.getElementById('risiko').textContent = simulatedResult.risiko;
        document.getElementById('rekomendasi').textContent = simulatedResult.rekomendasi;

        statusMessage.textContent = '✅ Analisis August AI Selesai!';
        aiDetail.style.display = 'block';
        analyzeBtn.disabled = false;
    }, 3000); // Simulasi waktu tunggu proses AI selama 3 detik
}


// --- 3. Fungsi Simulasi Chat August AI (Konsultasi) ---

function sendUserMessage() {
    const userInput = document.getElementById('userInput');
    const chatDisplay = document.getElementById('chatDisplay');
    const userText = userInput.value.trim();

    if (userText === "") return;

    // Tambahkan pesan pengguna ke chat
    chatDisplay.innerHTML += `<div class="user-message">${userText}</div>`;
    
    // Scroll ke bawah
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    
    // Simulasi respons August AI
    setTimeout(() => {
        let aiResponse = getAugustAIResponse(userText);
        chatDisplay.innerHTML += `<div class="ai-message">${aiResponse}</div>`;
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }, 1000); // Simulasi waktu tunggu balasan 1 detik

    userInput.value = ''; // Kosongkan input
}

// Fungsi sederhana untuk menentukan respons AI
function getAugustAIResponse(message) {
    const lowerCaseMsg = message.toLowerCase();

    if (lowerCaseMsg.includes("sakit") || lowerCaseMsg.includes("nyeri")) {
        return "August AI mendeteksi adanya gejala nyeri. Apakah nyeri tersebut tajam, tumpul, atau hanya terasa saat mengunyah? Ini penting untuk menentukan perlu tidaknya penanganan segera.";
    } else if (lowerCaseMsg.includes("sensitif") || lowerCaseMsg.includes("dingin")) {
        return "Sensitivitas terhadap dingin bisa disebabkan oleh gusi turun atau lubang gigi. Silakan lihat hasil deteksi kamera Anda dan siapkan untuk dokter.";
    } else if (lowerCaseMsg.includes("karang gigi") || lowerCaseMsg.includes("karies")) {
        return "Jika hasil deteksi AI menunjukkan potensi masalah ini, kami sangat menyarankan untuk menjadwalkan konsultasi video dengan dokter kami.";
    } else if (lowerCaseMsg.includes("terima kasih")) {
        return "Sama-sama! Kami senang bisa membantu. Silakan unggah foto atau ajukan pertanyaan lain.";
    } else {
        return "Terima kasih atas informasinya. Kami mencatat gejala Anda. Dokter akan meninjau riwayat ini saat sesi konsultasi Anda.";
    }
}