import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'
import { getAllSurat, postSurat, updateSuratById, deleteSuratById, getAllDoa, postDoa, updateDoaById, deleteDoaById, getAllHadits, postHadits, updateHaditsById, deleteHaditsById  } from './fetch.js';
import { checkAuth } from '../../Auth/Api/checkX.js';

if (!checkAuth()) {
  throw new Error("Not authenticated");
}

document.querySelector('#kurikulum-plus').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kurikulum-plus',
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

    <div class="curriculum_plus-card">
      <div class="card-header">
        <div class="card-title">Surat-Surat Pendek</div>
      </div>
      <div class="card-body">
       <table class="card-table">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody id="suratTable">
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
      <button id="btnTambahSurat">Tambah</button>
    </div>

    <div class="curriculum_plus-card">
      <div class="card-header">
        <div class="card-title">Doa</div>
      </div>
      <div class="card-body">
       <table class="card-table">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody id="doaTable">
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
      <button id="btnTambahDoa">Tambah</button>
    </div>

        <div class="curriculum_plus-card">
      <div class="card-header">
        <div class="card-title">Hadits</div>
      </div>
      <div class="card-body">
       <table class="card-table">
          <thead>
            <tr>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody id="haditsTable">
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
      <button id="btnTambahHadits">Tambah</button>
    </div>
  </div>
`;

const suratTable = document.getElementById('suratTable');
const doaTable = document.getElementById('doaTable');
const haditsTable = document.getElementById('haditsTable');

const btnTambahSurat = document.getElementById('btnTambahSurat');
const btnTambahDoa = document.getElementById('btnTambahDoa');
const btnTambahHadits = document.getElementById('btnTambahHadits');

function renderSurat() {
  suratTable.innerHTML = `    
    <tr>
      <td colspan="2" style="text-align:center">
        <div class="spinner"></div>
        <p>Loading data surat...</p>
      </td>
    </tr>
  `;

  getAllSurat().then(async data => {
    await new Promise(resolve => setTimeout(resolve, 500));
    suratTable.innerHTML = '';
    if (Array.isArray(data) && data.length) {
      data.forEach(item => suratTable.appendChild(createRow(item.id, item.surat, 'surat')));
    }
    suratTable.classList.add("fade-in");
    setTimeout(() => suratTable.classList.remove("fade-in"), 500);
  });
}

function renderDoa() {
  doaTable.innerHTML = `    
    <tr>
      <td colspan="2" style="text-align:center">
        <div class="spinner"></div>
        <p>Loading data doa...</p>
      </td>
    </tr>
  `;

  getAllDoa().then(async data => {
    await new Promise(resolve => setTimeout(resolve, 500));
    doaTable.innerHTML = '';
    if (Array.isArray(data) && data.length) {
      data.forEach(item => doaTable.appendChild(createRow(item.id, item.doa, 'doa')));
    }
    doaTable.classList.add("fade-in");
    setTimeout(() => doaTable.classList.remove("fade-in"), 500);
  });
}

function renderHadits() {
  haditsTable.innerHTML = `   
    <tr>
      <td colspan="2" style="text-align:center">
        <div class="spinner"></div>
        <p>Loading data hadits...</p>
      </td>
    </tr>
  `;

  getAllHadits().then(async data => {
    await new Promise(resolve => setTimeout(resolve, 500));
    haditsTable.innerHTML = '';
    if (Array.isArray(data) && data.length) {
      data.forEach(item => haditsTable.appendChild(createRow(item.id, item.hadits, 'hadits')));
    }
    haditsTable.classList.add("fade-in");
    setTimeout(() => haditsTable.classList.remove("fade-in"), 500);
  });
}

btnTambahSurat.addEventListener('click', () => {
  if (document.querySelector('#suratTable .input-edit')) return;
  suratTable.appendChild(createRow(null, '', 'surat', true));
  setButtonsDisabled(true);
});

btnTambahDoa.addEventListener('click', () => {
  if (document.querySelector('#doaTable .input-edit')) return;
  doaTable.appendChild(createRow(null, '', 'doa', true));
  setButtonsDisabled(true);
});

btnTambahHadits.addEventListener('click', () => {
  if (document.querySelector('#haditsTable .input-edit')) return;
  haditsTable.appendChild(createRow(null, '', 'hadits', true));
  setButtonsDisabled(true);
});

function setButtonsDisabled(disabled) {
  document.querySelectorAll('.btn-edit, .btn-hapus').forEach(btn => {
    btn.disabled = disabled;
  });
  btnTambahSurat.disabled = disabled;
  btnTambahDoa.disabled = disabled;
  btnTambahHadits.disabled = disabled;
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
    input.maxLength = 255;
    input.oninput = function () {
      if (this.value.length > 255) {
        this.value = this.value.slice(0, 255);
      }
    };
    tdDeskripsi.appendChild(input);

    const btnSimpan = createButton('Simpan', 'btn-simpan', () => {
      const value = input.value.trim();
      if (!value) {
        showToast('Data kurikulum plus tidak boleh kosong.', 'error');
        return;
      }
      if (id) {
        if (type === 'surat') {
          updateSuratById(id, { surat_name: value }).then(() => {
            renderSurat();
            showToast('Data surat berhasil disimpan.', 'success');
          });
        } else if (type === 'doa') {
          updateDoaById(id, { doa_name: value }).then(() => {
            renderDoa();
            showToast('Data doa berhasil disimpan.', 'success');
          });
        } else if (type === 'hadits') {
          updateHaditsById(id, { hadits_name: value }).then(() => {
            renderHadits();
            showToast('Data hadits berhasil disimpan.', 'success');
          });
        }
      } else {
        if (type === 'surat') {
          postSurat({ surat_name: value }).then(() => {
            renderSurat();
            showToast('Data surat berhasil ditambahkan.', 'success');
          });
        } else if (type === 'doa') {
          postDoa({ doa_name: value }).then(() => {
            renderDoa();
            showToast('Data doa berhasil ditambahkan.', 'success');
          });
        } else if (type === 'hadits') {
          postHadits({ hadits_name: value }).then(() => {
            renderHadits();
            showToast('Data hadits berhasil ditambahkan.', 'success');
          });
        }
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
    tdDeskripsi.style.maxWidth = '300px';
    tdDeskripsi.style.wordWrap = 'break-word';
    tdDeskripsi.style.whiteSpace = 'normal';

    const btnEdit = createButton('Edit', 'btn-edit', () => {
      tr.replaceWith(createRow(id, text, type, true));
      setButtonsDisabled(true);
    });

    const btnHapus = createButton('Hapus', 'btn-hapus', () => {
      if (type === 'surat') {
        deleteSuratById(id).then(() => {
          tr.remove();
          showToast('Data surat berhasil dihapus.', 'error');
        });
      } else if (type === 'doa') {
        deleteDoaById(id).then(() => {
          tr.remove();
          showToast('Data doa berhasil dihapus.', 'error');
        });
      } else if (type === 'hadits') {
        deleteHaditsById(id).then(() => {
          tr.remove();
          showToast('Data hadits berhasil dihapus.', 'error');
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

renderSurat();
renderDoa();
renderHadits();

initSidebarFunctionality();