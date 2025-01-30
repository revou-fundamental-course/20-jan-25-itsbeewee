document.addEventListener("DOMContentLoaded", function () {
    // Tangkap elemen form dan hasil BMI
    const form = document.querySelector("form");
    const resultDisplay = document.getElementById("result-bmi");
    const resultCategory = document.getElementById("result-category");
    const resultExplanation = document.getElementById("result-explanation");

    // Buat tombol Download Hasil BMI
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download Hasil BMI";
    downloadButton.classList.add("btn-hitung");
    downloadButton.style.display = "none";
    downloadButton.style.margin = "10px auto";
    downloadButton.style.display = "block";
    downloadButton.style.textAlign = "center";
    downloadButton.onclick = function () {
        const data = `Hasil BMI Anda:\nBMI: ${resultDisplay.textContent}\nKategori: ${resultCategory.textContent}\nPenjelasan: ${resultExplanation.textContent}`;
        const blob = new Blob([data], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "Hasil_BMI.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    
    // Buat container untuk tombol tambahan
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.marginTop = "10px";
    
    // Buat tombol Konsultasi Ahli Gizi
    const consultButton = document.createElement("button");
    consultButton.textContent = "Konsultasi Ahli Gizi via Aplikasi";
    consultButton.classList.add("btn-hitung");
    consultButton.style.display = "none";
    consultButton.onclick = function () {
        window.location.href = "#"; // Ganti dengan URL aplikasi konsultasi
    };
    buttonContainer.appendChild(consultButton);
    
    // Buat tombol Registrasi Online Ahli Gizi
    const registerButton = document.createElement("button");
    registerButton.textContent = "Registrasi Online Ahli Gizi";
    registerButton.classList.add("btn-hitung");
    registerButton.style.display = "none";
    registerButton.onclick = function () {
        window.location.href = "#"; // Ganti dengan URL registrasi
    };
    buttonContainer.appendChild(registerButton);
    
    document.querySelector("#result-explanation").insertAdjacentElement("afterend", buttonContainer);
    document.querySelector("#result-explanation").insertAdjacentElement("afterend", downloadButton);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Mencegah reload halaman
        
        // Ambil nilai input
        const berat = parseFloat(document.getElementById("input-berat-badan").value);
        const tinggiCm = parseFloat(document.getElementById("tinggi").value);
        const usia = parseInt(document.getElementById("usia").value);
        const gender = document.querySelector("input[name='gender']:checked");
        
        // Validasi input
        if (isNaN(berat) || berat <= 0) {
            alert("Masukkan berat badan yang valid!");
            return;
        }
        if (isNaN(tinggiCm) || tinggiCm <= 0) {
            alert("Masukkan tinggi badan yang valid!");
            return;
        }
        if (isNaN(usia) || usia <= 0) {
            alert("Masukkan usia yang valid!");
            return;
        }
        if (!gender) {
            alert("Pilih jenis kelamin!");
            return;
        }

        // Konversi tinggi ke meter
        const tinggiM = tinggiCm / 100;
        
        // Hitung BMI
        const bmi = berat / (tinggiM * tinggiM);
        
        // Tentukan kategori BMI
        let kategori = "";
        let penjelasan = "";
        if (bmi < 18.5) {
            kategori = "Kurus";
            penjelasan = "BMI Anda rendah. Anda mungkin perlu meningkatkan asupan kalori dan nutrisi untuk mencapai berat badan ideal.";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            kategori = "Normal";
            penjelasan = "BMI Anda dalam kategori normal. Pertahankan pola makan sehat dan olahraga teratur untuk menjaga kondisi tubuh.";
        } else if (bmi >= 25 && bmi <= 29.9) {
            kategori = "Overweight";
            penjelasan = "BMI Anda dalam kategori overweight. Sebaiknya mulai mengatur pola makan dan olahraga untuk menjaga kesehatan.";
        } else {
            kategori = "Obesitas";
            penjelasan = "BMI Anda menunjukkan obesitas. Dianjurkan untuk berkonsultasi dengan dokter atau ahli gizi untuk strategi penurunan berat badan yang sehat.";
        }
        
        // Tampilkan hasil BMI
        resultDisplay.textContent = `${bmi.toFixed(2)}`;
        resultCategory.textContent = `${kategori}`;
        resultExplanation.textContent = penjelasan;

        // Tampilkan tombol download, konsultasi, dan registrasi
        downloadButton.style.display = "block";
        consultButton.style.display = "block";
        registerButton.style.display = "block";
    });
    
    // Tombol reset untuk mengembalikan hasil ke 0
    form.addEventListener("reset", function () {
        resultDisplay.textContent = "0";
        resultCategory.textContent = "Kategori: -";
        resultExplanation.textContent = "Masukkan berat dan tinggi badan Anda, lalu tekan 'Hitung' untuk melihat hasil BMI.";
        downloadButton.style.display = "none";
        consultButton.style.display = "none";
        registerButton.style.display = "none";
    });
});
