import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'
import { getAllPrestasiGuru, postPrestasiGuru, updatePrestasiGuruById, deletePrestasiGuruById, getAllPrestasiSiswa, postPrestasiSiswa, updatePrestasiSiswaById, deletePrestasiSiswaById } from './fetch.js';
import { checkAuth } from '../../Auth/Api/checkX.js';

if (!checkAuth()) {
  throw new Error("Not authenticated");
}

document.querySelector('#prestasi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'prestasi',
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

    <div class="achievement-card">
      <div class="card-header">
        <div class="card-title">Prestasi Guru</div>
      </div>
      <div class="card-body">
       <table class="card-table">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody id="guruTable">
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
      <button id="btnTambahGuru">Tambah</button>
    </div>

    <div class="achievement-card">
      <div class="card-header">
        <div class="card-title">Prestasi Siswa</div>
      </div>
      <div class="card-body">
       <table class="card-table">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody id="siswaTable">
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
      <button id="btnTambahSiswa">Tambah</button>
    </div>
  </div>
  </div>
`;

const guruTable = document.getElementById('guruTable');
const siswaTable = document.getElementById('siswaTable');
const btnTambahGuru = document.getElementById('btnTambahGuru');
const btnTambahSiswa = document.getElementById('btnTambahSiswa');

function renderPrestasiGuru() {
  guruTable.innerHTML = `<tr><td colspan="2">Loading data prestasi guru...</td></tr>`;
  getAllPrestasiGuru().then(data => {
    guruTable.innerHTML = '';
    if (Array.isArray(data) && data.length) {
      data.forEach(item => guruTable.appendChild(createRow(item.id, item.teacher, 'guru')));
    }
  });
}

function renderPrestasiSiswa() {
  siswaTable.innerHTML = `<tr><td colspan="2">Loading data prestasi siswa...</td></tr>`;
  getAllPrestasiSiswa().then(data => {
    siswaTable.innerHTML = '';
    if (Array.isArray(data) && data.length) {
      data.forEach(item => siswaTable.appendChild(createRow(item.id, item.student, 'siswa')));
    }
  });
}

btnTambahGuru.addEventListener('click', () => {
  if (document.querySelector('#guruTable .input-edit')) return;
  guruTable.appendChild(createRow(null, '', 'guru', true));
  setButtonsDisabled(true);
});

btnTambahSiswa.addEventListener('click', () => {
  if (document.querySelector('#siswaTable .input-edit')) return;
  siswaTable.appendChild(createRow(null, '', 'siswa', true));
  setButtonsDisabled(true);
});

function setButtonsDisabled(disabled) {
  document.querySelectorAll('.btn-edit, .btn-hapus').forEach(btn => {
    btn.disabled = disabled;
  });
  btnTambahGuru.disabled = disabled;
  btnTambahSiswa.disabled = disabled;
}

function createRow(id, text, type, isEdit = false) {
  const tr = document.createElement('tr');
  const tdDeskripsi = document.createElement('td');
  const tdOpsi = document.createElement('td');

  if (isEdit) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Masukkan deskripsi';
    input.value = text || '';
    input.classList.add('input-edit');
    input.style.width = '100%';
    tdDeskripsi.appendChild(input);

    const btnSimpan = createButton('Simpan', 'btn-simpan', () => {
      const value = input.value.trim();
      if (!value) {
        showToast('Data prestasi tidak boleh kosong.', 'error');
        return;
      }
      if (id) {
        if (type === 'guru') {
          updatePrestasiGuruById(id, { prestasi_guru: value }).then(renderPrestasiGuru);
        } else {
          updatePrestasiSiswaById(id, { prestasi_siswa: value }).then(renderPrestasiSiswa);
        }
        showToast('Data prestasi berhasil disimpan.', 'success');
      } else {
        if (type === 'guru') {
          postPrestasiGuru({ prestasi_guru: value }).then(renderPrestasiGuru);
        } else {
          postPrestasiSiswa({ prestasi_siswa: value }).then(renderPrestasiSiswa);
        }
        showToast('Data prestasi berhasil ditambahkan.', 'success');
      }
      setButtonsDisabled(false);
    });

    const btnBatal = createButton('Batal', 'btn-batal', () => {
      if (id) {
        tr.replaceWith(createRow(id, text, type));
      } else {
        tr.remove();
      }
      setButtonsDisabled(false);
    });

    tdOpsi.append(btnSimpan, btnBatal);
  } else {
    tdDeskripsi.textContent = text || '-';

    const btnEdit = createButton('Edit', 'btn-edit', () => {
      tr.replaceWith(createRow(id, text, type, true));
      setButtonsDisabled(true);
    });

    const btnHapus = createButton('Hapus', 'btn-hapus', () => {
        if (type === 'guru') {
          deletePrestasiGuruById(id).then(() => {
            tr.remove();
            showToast('Data prestasi berhasil dihapus.', 'error');
          });
        } else {
          deletePrestasiSiswaById(id).then(() => {
            tr.remove();
            showToast('Data prestasi berhasil dihapus.', 'error');
          });
        }
    });

    tdOpsi.append(btnEdit, btnHapus);
  }

  tr.append(tdDeskripsi, tdOpsi);
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

renderPrestasiGuru();
renderPrestasiSiswa();
initSidebarFunctionality();