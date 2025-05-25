import '../global.css';
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar';

document.querySelector('#contact').innerHTML = `
  ${createSidebarHTML({
    activePage: 'contact',
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

    <div class="contact-card">
      <div class="card-header">
        <div class="card-title">Data Contact Person</div>
      </div>
      <div class="card-body">
        <table id="telpTable" class="card-table">
          <thead>
            <tr>
              <th>No. Telp</th>
              <th>Nama</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
          <tfoot>
            <tr>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button id="btnTambahTelp" class="btn-tambah">Tambah</button>
    </div/>

    <div class="contact-card">
      <div class="card-header">
        <div class="card-title">Data Email</div>
      </div>
      <div class="card-body">
        <table id="emailTable" class="card-table">
          <thead>
            <tr>
              <th>Email</th>
              <th class="empty-col"></th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
          <tfoot>
            <tr>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button id="btnTambahEmail" class="btn-tambah">Tambah</button>
    </div/>

    <div class="contact-card">
      <div class="card-header">
        <div class="card-title">Data Instagram</div>
      </div>
      <div class="card-body">
        <table id="igTable" class="card-table">
          <thead>
            <tr>
              <th>Instagram</th>
              <th class="empty-col"></th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
          <tfoot>
            <tr>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="button-group">
     <button id="btnTambahIG" class="btn-tambah">Tambah</button>
    </div/>

    <div class="contact-card">
      <div class="card-header">
        <div class="card-title">Data Alamat</div>
      </div>
      <div class="card-body">
        <table id="alamatTable" class="card-table">
          <thead>
            <tr>
              <th>Alamat</th>
              <th class="empty-col"></th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
          <tfoot>
            <tr>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="button-group">
     <button id="btnTambahAlamat" class="btn-tambah">Tambah</button
  </div>
`;

const telpData = [
  { noTelp: '+628813325407', nama: 'Bunda Niniek' }
];
const emailData = [
  { email: 'sitihajarkarlos@gmail.com' }
];
const igData = [
  { instagram: '@bundasitihajarkarangploso' }
];
const alamatData = [
  { alamat: 'Jl. Ampel Pratama V Blok E 2 No. 9, Perum Pesanggrahan Pratama Karangploso, Kab. Malang' }
];

function createTableRows(dataArray, columns) {
  return dataArray.map(item => {
    const cells = columns.map(col => {
      return `<td class="${col.class || ''}">${col.key ? (item[col.key] || '') : ''}</td>`;
    }).join('');
    return `<tr>${cells}
      <td class="actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-hapus">Hapus</button>
      </td>
    </tr>`;
  }).join('');
}

const telpColumns = [
  { key: 'noTelp', class: 'data-cell' },
  { key: 'nama' }
];
const emailColumns = [
  { key: 'email', class: 'data-cell' },
  { key: '', class: 'empty-col' }
];
const igColumns = [
  { key: 'instagram', class: 'data-cell' },
  { key: '', class: 'empty-col' }
];
const alamatColumns = [
  { key: 'alamat', class: 'data-cell' },
  { key: '', class: 'empty-col' }
];

document.querySelector('#telpTable tbody').innerHTML = createTableRows(telpData, telpColumns);
document.querySelector('#emailTable tbody').innerHTML = createTableRows(emailData, emailColumns);
document.querySelector('#igTable tbody').innerHTML = createTableRows(igData, igColumns);
document.querySelector('#alamatTable tbody').innerHTML = createTableRows(alamatData, alamatColumns);

let editing = false;

function enableAllButtons() {
  document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

function disableAllButtonsExcept(row) {
  document.querySelectorAll("button").forEach(btn => {
    if (!row.contains(btn)) btn.disabled = true;
  });
}

function resetActions(row) {
  const actions = row.querySelector(".actions");
  actions.innerHTML = `
    <button class="btn-edit">Edit</button>
    <button class="btn-hapus">Hapus</button>
  `;
  setActionEvents(row);
}

function setActionEvents(row) {
  const editBtn = row.querySelector(".btn-edit");
  const hapusBtn = row.querySelector(".btn-hapus");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (editing) {
        alert("Selesaikan edit yang sedang berlangsung terlebih dahulu.");
        return;
      }

      const table = row.closest("table");
      const isTelpTable = table.id === "telpTable";

      const cells = row.querySelectorAll("td");
      const actionCellIndex = cells.length - 1;

      let firstInputValue = cells[0].textContent.trim();
      let secondInputValue = isTelpTable ? cells[1].textContent.trim() : '';

      cells[0].innerHTML = `<input type="text" value="${firstInputValue}" placeholder="Masukkan ${
        isTelpTable ? 'Nomor Telepon' : table.id === 'emailTable' ? 'Email' : table.id === 'igTable' ? 'Instagram' : 'Alamat'
      }" style="width:100%">`;

      if (isTelpTable) {
        cells[1].innerHTML = `<input type="text" value="${secondInputValue}" placeholder="Masukkan Nama Contact Person" style="width:100%">`;
      }

      const actions = cells[actionCellIndex];
      actions.innerHTML = `
        <button class="btn-simpan">Simpan</button>
        <button class="btn-batal">Batal</button>
      `;

      editing = true;
      disableAllButtonsExcept(row);

      actions.querySelector(".btn-simpan").addEventListener("click", () => {
        const inputs = row.querySelectorAll("input");
        const firstInput = inputs[0].value.trim();
        const secondInput = inputs.length > 1 ? inputs[1].value.trim() : null;

        if (!firstInput || (inputs.length > 1 && !secondInput)) {
          alert("Data tidak boleh kosong!");
          return;
        }

        row.cells[0].textContent = firstInput;
        if (inputs.length > 1) {
          row.cells[1].textContent = secondInput;
        } else if (row.cells.length > 2) {
          row.cells[1].textContent = '';
        }

        resetActions(row);
        editing = false;
        enableAllButtons();
      });

      actions.querySelector(".btn-batal").addEventListener("click", () => {
        cells[0].textContent = firstInputValue;
        if (isTelpTable) cells[1].textContent = secondInputValue;

        resetActions(row);
        editing = false;
        enableAllButtons();
      });
    });
  }

  if (hapusBtn) {
    hapusBtn.addEventListener("click", () => {
      if (editing) {
        alert("Selesaikan edit terlebih dahulu sebelum menghapus.");
        return;
      }
      if (confirm("Yakin ingin menghapus data ini?")) {
        row.remove();
      }
    });
  }
}

document.querySelectorAll("tbody tr").forEach(setActionEvents);

document.querySelectorAll(".btn-tambah").forEach(button => {
  button.addEventListener("click", () => {
    if (editing) {
      alert("Selesaikan edit terlebih dahulu sebelum menambah data baru.");
      return;
    }

    const tbody = {
      btnTambahTelp: document.querySelector("#telpTable tbody"),
      btnTambahEmail: document.querySelector("#emailTable tbody"),
      btnTambahIG: document.querySelector("#igTable tbody"),
      btnTambahAlamat: document.querySelector("#alamatTable tbody")
    }[button.id];

    let newRow = document.createElement("tr");

    switch (button.id) {
      case "btnTambahTelp":
        newRow.innerHTML = `
          <td><input type="text" placeholder="Masukkan nomor telepon" style="width:100%"></td>
          <td><input type="text" placeholder="Masukkan nama contact person" style="width:100%"></td>
          <td class="actions">
            <button class="btn-simpan">Simpan</button>
            <button class="btn-batal">Batal</button>
          </td>
        `;
        break;
      case "btnTambahEmail":
        newRow.innerHTML = `
          <td><input type="text" placeholder="Masukkan email" style="width:100%"></td>
          <td class="empty-col"></td>
          <td class="actions">
            <button class="btn-simpan">Simpan</button>
            <button class="btn-batal">Batal</button>
          </td>
        `;
        break;
      case "btnTambahIG":
        newRow.innerHTML = `
          <td><input type="text" placeholder="Masukkan username instagram" style="width:100%"></td>
          <td class="empty-col"></td>
          <td class="actions">
            <button class="btn-simpan">Simpan</button>
            <button class="btn-batal">Batal</button>
          </td>
        `;
        break;
      case "btnTambahAlamat":
        newRow.innerHTML = `
          <td><input type="text" placeholder="Masukkan alamat" style="width:100%"></td>
          <td class="empty-col"></td>
          <td class="actions">
            <button class="btn-simpan">Simpan</button>
            <button class="btn-batal">Batal</button>
          </td>
        `;
        break;
      default:
        return;
    }

    tbody.appendChild(newRow);
    editing = true;
    disableAllButtonsExcept(newRow);

    newRow.querySelector(".btn-simpan").addEventListener("click", () => {
      const inputs = newRow.querySelectorAll("input");
      const firstInput = inputs[0].value.trim();
      const secondInput = inputs.length > 1 ? inputs[1].value.trim() : null;

      if (!firstInput || (inputs.length > 1 && !secondInput)) {
        alert("Data tidak boleh kosong!");
        return;
      }

      newRow.cells[0].textContent = firstInput;
      if (inputs.length > 1) {
        newRow.cells[1].textContent = secondInput;
      } else if (newRow.cells.length > 2) {
        newRow.cells[1].textContent = '';
      }

      resetActions(newRow);
      editing = false;
      enableAllButtons();
    });

    newRow.querySelector(".btn-batal").addEventListener("click", () => {
      newRow.remove();
      editing = false;
      enableAllButtons();
    });
  });
});

initSidebarFunctionality();