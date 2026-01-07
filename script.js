const templates = [
    `Selamat ulang tahun! 🎂
Semoga panjang umur, sehat selalu, dan semua impianmu tercapai.
Semoga hari ini membawa kebahagiaan untukmu ✨`,

    `Happy Birthday! 🎉
Semoga hidupmu selalu dipenuhi cinta, tawa, dan keberkahan.
Nikmati harimu, kamu layak bahagia ❤️`,

    `Bertambah usia berarti bertambah juga doa terbaik untukmu 🙏✨
Semoga tahun ini membawa banyak kejutan indah.
Selamat ulang tahun! 🎂`

    `Selamat ulang tahun! 🎉🎂 
Semoga hari ini dan tahun baru ini membawa kebahagian, kesuksesan, dan cinta yang melimpah untuk kamu. ❤️ 
Semoga impianmu menjadi kenyataan dan kamu terus tumbuh menjadi versi terbaik dari dirimu. 
Sekali lagi, Selamat Ulang Tahun! 🎉🎉🎉`
];

let selectedMessage = "";
const targetNumber = "6285117501244";


/* ===========================
        POPUP SYSTEM
=========================== */
function showPopup(message, type = "alert", callback = null) {
    const overlay = document.getElementById("popupOverlay");
    const msgBox = document.getElementById("popupMessage");
    const btnBox = document.getElementById("popupButtons");

    msgBox.textContent = message;
    btnBox.innerHTML = "";

    if (type === "alert") {
        btnBox.innerHTML = `<button class="popup-btn popup-ok">OK</button>`;
        btnBox.querySelector(".popup-ok").onclick = () => {
            overlay.classList.add("hidden");
            if (callback) callback();
        };
    } 
    else if (type === "confirm") {
        btnBox.innerHTML = `
            <button class="popup-btn popup-cancel">Batal</button>
            <button class="popup-btn popup-ok">OK</button>
        `;
        btnBox.querySelector(".popup-cancel").onclick = () => {
            overlay.classList.add("hidden");
            callback(false);
        };
        btnBox.querySelector(".popup-ok").onclick = () => {
            overlay.classList.add("hidden");
            callback(true);
        };
    }

    overlay.classList.remove("hidden");
}



/* ===========================
      PILIH TEMPLATE
=========================== */
function pilihTemplate(index) {
    const nama = document.getElementById("namaPengirim").value;

    if (nama.trim() === "") {
        showPopup("Nama pengirim tidak boleh kosong!", "alert");
        return;
    }

    selectedMessage = templates[index] + `\n\n- Dari: ${nama}`;

    document.getElementById("kirimBtn").classList.remove("hidden");

    showPopup("Template berhasil dipilih 🎉", "alert");
}



/* ===========================
         KIRIM WA
=========================== */
function kirimWA() {
    if (selectedMessage === "") {
        showPopup("Pilih pesan terlebih dahulu!", "alert");
        return;
    }

    showPopup("Yakin ingin mengirim pesan ini ke WhatsApp?", "confirm", (result) => {
        if (!result) return;

        const encoded = encodeURIComponent(selectedMessage);
        window.open(`https://wa.me/${targetNumber}?text=${encoded}`, "_blank");
    });
}
