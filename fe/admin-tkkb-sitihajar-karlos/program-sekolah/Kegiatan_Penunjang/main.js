import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

import { getAllKegiatanPenunjang, postKegiatanPenunjang, updateKegiatanPenunjangById, deleteKegiatanPenunjangById } from './fetch.js';

document.querySelector('#kegiatan-penunjang').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kegiatan-penunjang',
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

    <div class="supporting_activities-card">
      <div class="card-header">
        <div class="card-title">Kegiatan Penunjang</div>
      </div>
      <div class="card-body">
       <table class="card-table">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody id="kegiatanPenunjangTable">
            <tr>
              <td>
                  <button class="btn-edit">Edit</button>
                  <button class="btn-hapus">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button id="btnTambah">Tambah</button>
    </div>
  </div>
`;

const kegiatanPenunjangTable = document.getElementById('kegiatanPenunjangTable');
const btnTambah = document.getElementById('btnTambah');

function renderKegiatanPenunjang() {
  kegiatanPenunjangTable.innerHTML = `<tr><td colspan="2">Loading data kegiatan penunjang...</td></tr>`;
  getAllKegiatanPenunjang().then(data => {
    kegiatanPenunjangTable.innerHTML = '';
    if (data && Array.isArray(data) && data.length) {
      data.forEach(item => kegiatanPenunjangTable.appendChild(createRow(item.id, item.activity)));
    }
  });
}

btnTambah.addEventListener('click', () => {
  if (document.querySelector('.input-edit')) return;
  kegiatanPenunjangTable.appendChild(createRow(null, '', true));
  setButtonsDisabled(true);
});

function setButtonsDisabled(disabled) {
  document.querySelectorAll('.btn-edit, .btn-hapus').forEach(btn => {
    btn.disabled = disabled;
  });
  btnTambah.disabled = disabled;
}

function createRow(id, text, isEdit = false) {
  const tr = document.createElement('tr');
  const tdKegiatanPenunjang = document.createElement('td');
  const tdOpsi = document.createElement('td');

  if (isEdit) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Masukkan kegiatan penunjang';
    input.value = text;
    input.classList.add('input-edit');
    input.style.width = '100%';
    tdKegiatanPenunjang.appendChild(input);

    const btnSimpan = createButton('Simpan', 'btn-simpan', () => {
      const value = input.value.trim();
      if (!value) {
        showToast('Data kegiatan penunjang tidak boleh kosong.', "error");
        return;
      }
      if (id) {
        updateKegiatanPenunjangById(id, { kegiatan_penunjang: value }).then(() => renderKegiatanPenunjang());
        showToast("Data kegiatan penunjang berhasil disimpan.", "success");
      } else {
        postKegiatanPenunjang({ kegiatan_penunjang: value }).then(() => renderKegiatanPenunjang());
        showToast("Data kegiatan penunjang berhasil ditambahkan.", "success")
      }
      setButtonsDisabled(false);
    });

    const btnBatal = createButton('Batal', 'btn-batal', () => {
      if (id) {
        tr.replaceWith(createRow(id, text));
      } else {
        tr.remove();
      }
      setButtonsDisabled(false);
    });

    tdOpsi.append(btnSimpan, btnBatal);
  } else {
    const ul = document.createElement('ul');
    ul.style.margin = '0';
    ul.style.paddingLeft = '1em';

    const li = document.createElement('li');
    li.textContent = text;

    ul.appendChild(li);
    tdKegiatanPenunjang.style.paddingRight = '2em';
    tdKegiatanPenunjang.appendChild(ul);

    const btnEdit = createButton('Edit', 'btn-edit', () => {
      tr.replaceWith(createRow(id, text, true));
      setButtonsDisabled(true);
    });

    const btnHapus = createButton('Hapus', 'btn-hapus', () => {
      showToast("Data kegiatan penunjang berhasil dihapus.","error");
        deleteKegiatanPenunjangById(id).then(() => {
          tr.remove();
        });
    });

    tdOpsi.append(btnEdit, btnHapus);
  }

  tr.append(tdKegiatanPenunjang, tdOpsi);
  return tr;
}

function createButton(text, className, onClick) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add(className);
  btn.addEventListener('click', onClick);
  return btn;
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

document.body.insertAdjacentHTML("beforeend", `
  <div id="toast-container"></div>
`);

renderKegiatanPenunjang();
initSidebarFunctionality();