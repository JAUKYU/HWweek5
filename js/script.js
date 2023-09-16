// JavaScript dengan konsep OOP
class Pendaftar {
  constructor(nama, umur, uangSaku) {
    this.nama = nama;
    this.umur = umur;
    this.uangSaku = uangSaku;
  }
}

// Array untuk menyimpan pendaftar
let pendaftarList = [];

// Fungsi untuk menambah pendaftar
function addPendaftar(nama, umur, uangSaku) {
  const pendaftar = new Pendaftar(nama, umur, uangSaku);
  pendaftarList.push(pendaftar);
}

// Fungsi untuk menampilkan data pendaftar dan resume
function showPendaftar() {
  const pendaftarTable = document.getElementById("pendaftar-table");
  const pendaftarListelement = document.getElementById("pendaftar-list");
  const resumeElement = document.getElementById("resume");

  // Hapus data lama
  clearTable();

  // Tampilkan data pendaftar
  pendaftarList.forEach((pendaftar, index) => {
    const row = pendaftarTable.insertRow();
    row.insertCell(0).textContent = pendaftar.nama;
    row.insertCell(1).textContent = pendaftar.umur;
    row.insertCell(2).textContent = pendaftar.uangSaku;

    // Tambahkan tombol Hapus
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => {
      deletePendaftar(index);
    });
    row.insertCell(3).appendChild(deleteButton);
  });

  // Hitung rata-rata umur dan uang saku
  const totalUmur = pendaftarList.reduce(
    (total, pendaftar) => total + pendaftar.umur,
    0
  );
  const totalUangSaku = pendaftarList.reduce(
    (total, pendaftar) => total + pendaftar.uangSaku,
    0
  );
  const rataRataUmur =
    pendaftarList.length > 0 ? totalUmur / pendaftarList.length : 0;
  const rataRataUangSaku =
    pendaftarList.length > 0 ? totalUangSaku / pendaftarList.length : 0;

  // Tampilkan resume
  resumeElement.textContent = `Rata-rata pendaftar memiliki uang saku sebesar Rp.${rataRataUangSaku.toFixed(
    2
  )} dengan rata-rata umur ${rataRataUmur.toFixed(2)}`;
}

// Fungsi untuk menghapus data dari tabel
function clearTable() {
  const pendaftarTable = document.getElementById("pendaftar-table");
  const rows = pendaftarTable.rows;
  for (let i = rows.length - 1; i > 0; i--) {
    pendaftarTable.deleteRow(i);
  }
}

// Fungsi untuk menghapus pendaftar dari daftar
function deletePendaftar(index) {
  pendaftarList.splice(index, 1);
  showPendaftar(); // Perbarui tampilan setelah menghapus
}

// Tambahkan event listener untuk form submit
const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var nama = document.getElementById("nama").value;
  var umur = parseInt(document.getElementById("umur").value);
  var uangSaku = parseInt(document.getElementById("uang-saku").value);

  // Validasi kriteria
  if (
    nama.length < 10 ||
    umur < 25 ||
    uangSaku < 100000 ||
    uangSaku > 1000000
  ) {
    alert("Data tidak memenuhi kriteria!");
  } else {
    // Tambahkan pendaftar
    addPendaftar(nama, umur, uangSaku);

    // Reset form
    registrationForm.reset();

    // Tampilkan data pendaftar
    showPendaftar();
  }
});

// Tampilkan tab aktif saat mengklik link tab
const tabLinks = document.querySelectorAll("ul li a");
tabLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    tabLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    const tabId = this.getAttribute("id").replace("-tab-link", "");
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((content) => content.classList.remove("active-tab"));
    document.getElementById(tabId + "-tab").classList.add("active-tab");
  });
});
