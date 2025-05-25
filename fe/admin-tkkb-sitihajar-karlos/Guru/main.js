import '../global.css'
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar';

document.querySelector('#guru').innerHTML = `
  ${createSidebarHTML({
    activePage: 'guru',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}

<div class="main-content">
  <div class="topbar">
    <div class="admin-info">
      <img src="/user.png" alt="Admin Profile">
      <div class="admin-text">
        <div class="admin-role">Admin</div>
        <div class="admin-name">Linna Indriyanti, S. Psi</div>
      </div>
    </div>
  </div>

    <div class="teacher-card">
      <div class="card-header">Data Guru</div>
      <div class="card-body">
        <table class="card-table" id="guruTable">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Jabatan</th>
              <th>Nama</th>
              <th>TTL</th>
              <th>No. Telp</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button class="btn-tambah" id="btnTambah">Tambah</button>
  </div>
`;
const guruData = [
  { foto: "/user.png", jabatan: "Kepala Sekolah", nama: "Puji Rahayu, S. Pd", ttl: "Malang, 1 Januari 1980", telepon: "081234567890" },
  { foto: "/user.png", jabatan: "Guru Kelas A", nama: "Rina Kusuma, S. Pd", ttl: "Malang, 12 Februari 1985", telepon: "081234567891" },
  { foto: "/user.png", jabatan: "Guru Kelas B", nama: "Andi Setiawan, M. Pd", ttl: "Malang, 20 Maret 1983", telepon: "081234567892" },
  { foto: "/user.png", jabatan: "Guru Kelas A", nama: "Sari Dewi, M. Pd", ttl: "Malang, 15 April 1987", telepon: "081234567893" },
  { foto: "/user.png", jabatan: "Guru Kelas B", nama: "Budi Santoso, S. Pd", ttl: "Malang, 5 Mei 1982", telepon: "081234567894" }
];

let editingIndex = null;

function renderTable() {
  const tbody = document.querySelector("#guruTable tbody");
  tbody.innerHTML = "";

  guruData.forEach((guru, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="text-align: center;"><img src="${guru.foto}" alt="Foto" width="100" height="100" style="object-fit: cover;"></td>
      <td class="jabatan">${guru.jabatan}</td>
      <td class="nama">${guru.nama}</td>
      <td class="ttl">${guru.ttl}</td>
      <td class="telepon">${guru.telepon}</td>
      <td style="text-align: center;">
        <button class="btn-edit" data-index="${index}">Edit</button>
        <button class="btn-hapus" data-index="${index}">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".btn-edit").forEach(btn =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const tr = e.target.closest("tr");

      if (editingIndex !== null) {
        alert("Selesaikan edit yang sedang berlangsung terlebih dahulu.");
        return;
      }

      editingIndex = parseInt(index);
      disableAllButtonsExcept(tr);

      const dataLama = { ...guruData[index] };
      let uploadedFoto = guruData[index].foto;

      tr.querySelector(".jabatan").innerHTML = `<input type="text" value="${dataLama.jabatan}" style="width: 100%;">`;
      tr.querySelector(".nama").innerHTML = `<input type="text" value="${dataLama.nama}" style="width: 100%;">`;
      tr.querySelector(".ttl").innerHTML = `<input type="text" value="${dataLama.ttl}" style="width: 100%;">`;
      tr.querySelector(".telepon").innerHTML = `<input type="text" value="${dataLama.telepon}" style="width: 100%;">`;

      const tdFoto = tr.querySelector("td:nth-child(1)");
      tdFoto.innerHTML = `<img src="${uploadedFoto}" alt="Foto" width="100" height="100" style="object-fit: cover;">`;

      const opsiTd = tr.querySelector("td:last-child");
      opsiTd.innerHTML = `
        <button class="btn-upload" data-index="${index}">Upload Foto</button>
        <button class="btn-simpan btn-edit" data-index="${index}">Simpan</button>
        <button class="btn-batal btn-hapus" data-index="${index}">Batal</button>
      `;

      opsiTd.querySelector(".btn-simpan").addEventListener("click", () => {
        const jabatan = tr.querySelector(".jabatan input").value.trim();
        const nama = tr.querySelector(".nama input").value.trim();
        const ttl = tr.querySelector(".ttl input").value.trim();
        const telepon = tr.querySelector(".telepon input").value.trim();

        if (jabatan && nama && ttl && telepon) {
          guruData[index] = { foto: uploadedFoto, jabatan, nama, ttl, telepon };
          editingIndex = null;
          renderTable();
          enableAllButtons();
        } else {
          alert("Data tidak boleh kosong!");
        }
      });

      opsiTd.querySelector(".btn-upload").addEventListener("click", () => {
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.addEventListener("change", (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              uploadedFoto = e.target.result;
              tdFoto.innerHTML = `<img src="${uploadedFoto}" alt="Foto" width="100" height="100" style="object-fit: cover;">`;
            };
            reader.readAsDataURL(file);
          }
        });
        inputFile.click();
      });

      opsiTd.querySelector(".btn-batal").addEventListener("click", () => {
        editingIndex = null;
        renderTable();
        enableAllButtons();
      });
    })
  );

  document.querySelectorAll(".btn-hapus").forEach(btn =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (editingIndex !== null) {
        alert("Selesaikan edit terlebih dahulu sebelum menghapus data lain.");
        return;
      }
      if (confirm("Yakin ingin menghapus data ini?")) {
        guruData.splice(index, 1);
        renderTable();
      }
    })
  );
}

document.getElementById("btnTambah").addEventListener("click", () => {
  const tbody = document.querySelector("#guruTable tbody");

  if (tbody.querySelector(".input-new")) return;

  if (editingIndex !== null) {
    alert("Selesaikan edit terlebih dahulu sebelum menambah data.");
    return;
  }

  const tr = document.createElement("tr");
  tr.classList.add("input-new");
  disableAllButtonsExcept(tr);

  tr.innerHTML = `
    <td style="text-align: center;">
      <img src="/user.png" alt="Foto" width="100" height="100" style="object-fit: cover; display:block; margin:auto; margin-bottom:5px;">
    </td>
    <td><input type="text" placeholder="Jabatan" style="width: 100%;"></td>
    <td><input type="text" placeholder="Nama" style="width: 100%;"></td>
    <td><input type="text" placeholder="Tempat, Tgl Lahir" style="width: 100%;"></td>
    <td><input type="text" placeholder="No Telepon" style="width: 100%;"></td>
    <td style="text-align: center;">
      <button class="btn-upload">Upload Foto</button>
      <button class="btn-simpan btn-edit">Simpan</button>
      <button class="btn-batal btn-hapus">Batal</button>
    </td>
  `;
  tbody.appendChild(tr);

  let uploadedFoto = null;

  tr.querySelector(".btn-upload").addEventListener("click", () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function() {
          uploadedFoto = reader.result;
          const imgElement = tr.querySelector("td:nth-child(1) img");
          if (imgElement) {
            imgElement.src = uploadedFoto;
          }
        };
        reader.readAsDataURL(file);
      }
    });
    inputFile.click();
  });

  tr.querySelector(".btn-simpan").addEventListener("click", () => {
    const inputs = tr.querySelectorAll("input");
    const [jabatan, nama, ttl, telepon] = [...inputs].map(input => input.value.trim());

    if (uploadedFoto && jabatan && nama && ttl && telepon) {
      guruData.push({ foto: uploadedFoto, jabatan, nama, ttl, telepon });
      editingIndex = null;
      renderTable();
      enableAllButtons();
    } else {
      alert("Data tidak boleh kosong!");
    }
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    tr.remove();
    enableAllButtons();
  });
});

function disableAllButtonsExcept(row) {
  document.querySelectorAll("button").forEach(btn => {
    if (!row.contains(btn)) btn.disabled = true;
  });
}

function enableAllButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

renderTable();
initSidebarFunctionality();