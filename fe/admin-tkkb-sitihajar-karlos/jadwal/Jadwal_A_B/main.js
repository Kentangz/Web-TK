import '../../global.css';
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar';

document.querySelector('#jadwal-a-b').innerHTML = `
  ${createSidebarHTML({
    activePage: 'jadwal-a-b',
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

    <div class="schedule-card">
      <div class="card-header">
        <div class="card-title">Tanggal</div>
      </div>
      <div class="card-body">
        <table class="card-table" id="tableHari">
          <thead>
            <tr>
              <th>Hari</th>
              <th>Jam</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button class="btn-tambah" id="btnTambahHari">Tambah</button>
    </div>

    <div class="schedule-card">
      <div class="card-header">
        <div class="card-title">Jadwal Kelompok A & B</div>
      </div>
      <div class="card-body">
        <table class="card-table" id="tableAB">
          <thead>
            <tr>
              <th>Ikon</th>
              <th>Deskripsi</th>
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

const jadwalHariData = [
  { hari: "Senin — Kamis", jam: "07:00 - 11:00" },
  { hari: "Jum'at", jam: "07:15 - 10:30" }
];

const jadwalABData = [
  { ikon: "/user.png", deskripsi: "Setiap hari ananda wajib membawa air minum (bukan susu kotak atau minuman dalam kemasan)." },
  { ikon: "/user.png", deskripsi: "Hari senin, rabu, jum’at mendapatkan kue dari sekolah." },
  { ikon: "/user.png", deskripsi: "Hari selasa & kamis ananda wajib membawa bekal nasi, sayur, dan lauk." },
  { ikon: "/user.png", deskripsi: "Ananda tidak diperkenankan membawa snack dari rumah." },
  { ikon: "/user.png", deskripsi: "Hari kamis ananda wajib mengisi kotak amal di sekolah (untuk melatih ananda terbiasa bersedekah dan peduli dengan orang yang membutuhkan)." },
  { ikon: "/user.png", deskripsi: "Hari jum’at ananda wajib membawa alat sholat untuk sholat bersama di sekolah." },
];

let editingIndexHari = null;
let editingIndexAB = null;

function renderTabelHari() {
  const tbody = document.querySelector("#tableHari tbody");
  tbody.innerHTML = "";

  jadwalHariData.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="hari">${item.hari}</td>
      <td class="jam">${item.jam}</td>
      <td>
        <button class="btn-edit" data-index="${index}">Edit</button>
        <button class="btn-hapus" data-index="${index}">Hapus</button>
      </td>
    `;

    tbody.appendChild(tr);

    const btnEdit = tr.querySelector(".btn-edit");
    const btnHapus = tr.querySelector(".btn-hapus");

    btnEdit.addEventListener("click", () => {
      if (editingIndexHari !== null) return alert("Selesaikan edit lain dulu!");
      editingIndexHari = index;
      disableAllButtonsExcept(tr);

      tr.querySelector(".hari").innerHTML = `<input type="text" value="${item.hari}" style="width: 100%;">`;
      tr.querySelector(".jam").innerHTML = `<input type="text" value="${item.jam}" style="width: 100%;">`;
      tr.querySelector("td:last-child").innerHTML = `
        <button class="btn-edit btn-simpan">Simpan</button>
        <button class="btn-hapus btn-batal">Batal</button>
      `;

      tr.querySelector(".btn-simpan").addEventListener("click", () => {
        const hari = tr.querySelector(".hari input").value;
        const jam = tr.querySelector(".jam input").value;
        if (!hari || !jam) return alert("Data tidak boleh kosong!");
        jadwalHariData[index] = { hari, jam };
        editingIndexHari = null;
        renderTabelHari();
        enableAllButtons();
      });

      tr.querySelector(".btn-batal").addEventListener("click", () => {
        editingIndexHari = null;
        renderTabelHari();
        enableAllButtons();
      });
    });

    btnHapus.addEventListener("click", () => {
      if (editingIndexHari !== null) return alert("Selesaikan edit lain dulu!");
      if (confirm("Yakin ingin menghapus?")) {
        jadwalHariData.splice(index, 1);
        renderTabelHari();
      }
    });
  });
}

function renderTabelAB() {
  const tbody = document.querySelector("#tableAB tbody");
  tbody.innerHTML = "";

  jadwalABData.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="ikon">${item.ikon ? `<img src="${item.ikon}" width="50" height="50"/>` : "0"}</td>
      <td class="deskripsi">${item.deskripsi}</td>
      <td>
        <button class="btn-edit" data-index="${index}">Edit</button>
        <button class="btn-hapus" data-index="${index}">Hapus</button>
      </td>
    `;

    tbody.appendChild(tr);

    const btnEdit = tr.querySelector(".btn-edit");
    const btnHapus = tr.querySelector(".btn-hapus");

    btnEdit.addEventListener("click", () => {
      if (editingIndexAB !== null) return alert("Selesaikan edit lain dulu!");
      editingIndexAB = index;
      disableAllButtonsExcept(tr);

      let newIcon = item.ikon;

      tr.querySelector(".ikon").innerHTML = `<img src="${item.ikon}" width="50" height="50"/>`;
      tr.querySelector(".deskripsi").innerHTML = `<input type="text" value="${item.deskripsi}" style="width: 100%;">`;
      tr.querySelector("td:last-child").innerHTML = `
        <button class="btn-upload">Upload Ikon</button>
        <button class="btn-edit btn-simpan">Simpan</button>
        <button class="btn-hapus btn-batal">Batal</button>
      `;

      tr.querySelector(".btn-upload").addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (ev) => {
            newIcon = ev.target.result;
            tr.querySelector(".ikon").innerHTML = `<img src="${newIcon}" width="50" height="50"/>`;
          };
          reader.readAsDataURL(file);
        };
        input.click();
      });

      tr.querySelector(".btn-simpan").addEventListener("click", () => {
        const deskripsi = tr.querySelector(".deskripsi input").value;
        if (!deskripsi || !newIcon) return alert("Data tidak boleh kosong!");
        jadwalABData[index] = { ikon: newIcon, deskripsi };
        editingIndexAB = null;
        renderTabelAB();
        enableAllButtons();
      });

      tr.querySelector(".btn-batal").addEventListener("click", () => {
        editingIndexAB = null;
        renderTabelAB();
        enableAllButtons();
      });
    });

    btnHapus.addEventListener("click", () => {
      if (editingIndexAB !== null) return alert("Selesaikan edit lain dulu!");
      if (confirm("Yakin ingin menghapus?")) {
        jadwalABData.splice(index, 1);
        renderTabelAB();
      }
    });
  });
}

document.getElementById("btnTambahHari").addEventListener("click", () => {
  if (editingIndexHari !== null) return alert("Selesaikan edit terlebih dahulu.");
  editingIndexHari = jadwalHariData.length;

  const tbody = document.querySelector("#tableHari tbody");
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="hari"><input type="text" placeholder="Masukkan hari" style="width: 100%;"></td>
    <td class="jam"><input type="text" placeholder="Masukkan jam" style="width: 100%;"></td>
    <td>
      <button class="btn-edit btn-simpan">Simpan</button>
      <button class="btn-hapus btn-batal">Batal</button>
    </td>
  `;

  tbody.appendChild(tr);
  disableAllButtonsExcept(tr);

  tr.querySelector(".btn-simpan").addEventListener("click", () => {
    const hari = tr.querySelector(".hari input").value.trim();
    const jam = tr.querySelector(".jam input").value.trim();
    if (!hari || !jam) return alert("Data tidak boleh kosong!");
    jadwalHariData.push({ hari, jam });
    editingIndexHari = null;
    renderTabelHari();
    enableAllButtons();
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    editingIndexHari = null;
    tr.remove();
    enableAllButtons();
  });
});

document.getElementById("btnTambah").addEventListener("click", () => {
  if (editingIndexAB !== null) return alert("Selesaikan edit terlebih dahulu.");
  editingIndexAB = jadwalABData.length;

  const tbody = document.querySelector("#tableAB tbody");
  const tr = document.createElement("tr");

  let newIcon = "";

  tr.innerHTML = `
    <td class="ikon"><img src="/user.png" width="50" height="50" /></td>
    <td class="deskripsi"><input type="text" placeholder="Masukkan deskripsi" style="width: 100%;"></td>
    <td>
      <button class="btn-upload">Upload Ikon</button>
      <button class="btn-edit btn-simpan">Simpan</button>
      <button class="btn-hapus btn-batal">Batal</button>
    </td>
  `;

  tbody.appendChild(tr);
  disableAllButtonsExcept(tr);

  tr.querySelector(".btn-upload").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        newIcon = ev.target.result;
        tr.querySelector(".ikon").innerHTML = `<img src="${newIcon}" width="50" height="50"/>`;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });

  tr.querySelector(".btn-simpan").addEventListener("click", () => {
    const deskripsi = tr.querySelector(".deskripsi input").value.trim();
    if (!deskripsi || !newIcon) return alert("Data tidak boleh kosong!");
    jadwalABData.push({ ikon: newIcon, deskripsi });
    editingIndexAB = null;
    renderTabelAB();
    enableAllButtons();
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    editingIndexAB = null;
    tr.remove();
    enableAllButtons();
  });
});

function disableAllButtonsExcept(row) {
  document.querySelectorAll("button").forEach(btn => {
    if (!row.contains(btn)) {
      btn.disabled = true;
    }
  });
}

function enableAllButtons() {
  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = false;
  });
}

renderTabelHari();
renderTabelAB();


initSidebarFunctionality();