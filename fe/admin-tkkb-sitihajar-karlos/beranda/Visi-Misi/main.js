import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'
import { getAllVisi, postVisi, updateVisiById, deleteVisiById, getAllMisi, postMisi, updateMisiById, deleteMisiById } from './fetch.js';
import { checkAuth } from '../../Auth/Api/checkX.js';

if (!checkAuth()) {
	throw new Error("Not authenticated");
}

document.querySelector('#visi-misi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'visi-misi',
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

     <div class="visi_misi-card">
        <div class="card-header">
          <div class="card-title">Visi</div>
      </div>
      <div class="card-body">
        <ul id="visi" class="visi"></ul>
      </div>
    </div>
    <div class="button-group">
        <button class="btn-tambah" data-type="visi">Tambah</button>
        <button class="btn-edit" data-type="visi">Edit</button>
        <button class="btn-hapus" data-type="visi">Hapus</button>
    </div>

    <div class="visi_misi-card">
      <div class="card-header">
        <div class="card-title">Misi</div>
      </div>
      <div class="card-body">
        <ul id="misi" class="misi"></ul>
      </div>
    </div>
    <div class="button-group">
        <button class="btn-tambah" data-type="misi">Tambah</button>
        <button class="btn-edit" data-type="misi">Edit</button>
        <button class="btn-hapus" data-type="misi">Hapus</button>
    </div>
`;

const visiList = document.getElementById('visi');
const misiList = document.getElementById('misi');

let editing = false;

function renderListData(listElement, data, type) {
  listElement.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = type === 'visi' ? item.vision : item.mission;
    li.dataset.id = item.id;
    li.style.listStyle = 'disc';
    li.style.whiteSpace = 'normal';      
    li.style.wordWrap = 'break-word';    
    li.style.width = '100%';             
    listElement.appendChild(li);
  });
  listElement.classList.add("fade-in");
  setTimeout(() => listElement.classList.remove("fade-in"), 500);
}

function loadData(type) {
  const listElement = type === 'visi' ? visiList : misiList;

  listElement.innerHTML = `
    <li style="list-style: none; text-align: center;">
      <div class="spinner"></div>
      <p>Loading data ${type}...</p>
    </li>
  `;

  const getDataFn = type === 'visi' ? getAllVisi : getAllMisi;

  getDataFn()
    .then(async data => {
      await new Promise(resolve => setTimeout(resolve, 500));
      renderListData(listElement, data, type);
    })
    .catch(err => {
      showToast(`Gagal memuat data ${type}`, "error");
      console.error(err);
    });
}

function setupCardActions(cardType, listElement) {
  const tambahBtn = document.querySelector(`.btn-tambah[data-type="${cardType}"]`);
  const editBtn = document.querySelector(`.btn-edit[data-type="${cardType}"]`);
  const hapusBtn = document.querySelector(`.btn-hapus[data-type="${cardType}"]`);

  function tambahMode() {
    if (editing) return;

    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.innerHTML = `<input type="text" placeholder="Masukkan ${cardType}" style="width: 100%;" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"/>`;
    li.style.listStyle = 'disc';
    listElement.appendChild(li);
    li.querySelector('input').focus();

    enterEditingMode();

    function simpan() {
      const input = li.querySelector('input');
      const val = input.value.trim();
      if (!val) {
        showToast("Data tidak boleh kosong.", "error");
        return;
      }
      else {
        showToast("Data berhasil ditambahkan.", "success"); 
      }

      const postFn = cardType === 'visi' ? postVisi : postMisi;
      if (cardType === 'visi') {
        postFn({ visi_description: val })
          .then(() => {
            loadData(cardType);
            exitEditingMode();
          })
          .catch(err => {
            showToast("Gagal menyimpan data visi.", "error");
            console.error(err);
          });
      } else {
        postFn({ misi_description: val })
          .then(() => {
            loadData(cardType);
            exitEditingMode();
          })
          .catch(err => {
            showToast("Gagal menyimpan data misi.", "error");
            console.error(err);
          });
      }
    }

    function batal() {
      li.remove();
      exitEditingMode();
    }

    setSaveCancelListeners(simpan, batal);
  }

  function editMode() {
    if (editing) return;

    const items = listElement.querySelectorAll('li');
    if (items.length === 0) {
      showToast(`Belum ada data untuk diedit.`, "error");
      return;
    }

    enterEditingMode();

    items.forEach(li => {
      const original = li.textContent;
      li.setAttribute('data-original', original);
      li.innerHTML = `<input type="text" value="${original}" style="width: 100%;" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;
    });

    function simpan() {
      let valid = true;
      items.forEach(li => {
        const val = li.querySelector('input').value.trim();
        if (!val) valid = false;
      });

      if (!valid) {
        showToast("Data tidak boleh kosong.", "error");
        return;
      } else {
        showToast("Data berhasil disimpan.", "success");
      }

      const updateFn = cardType === 'visi' ? updateVisiById : updateMisiById;

      const updatePromises = [];
      items.forEach(li => {
        const id = li.dataset.id;
        const val = li.querySelector('input').value.trim();
        if (cardType === 'visi') {
          updatePromises.push(updateFn(id, { visi_description: val }));
        } else {
          updatePromises.push(updateFn(id, { misi_description: val }));
        }
      });

      Promise.all(updatePromises)
        .then(() => {
          loadData(cardType);
          exitEditingMode();
        })
        .catch(err => {
          showToast("Gagal memperbarui data.", "error");
          console.error(err);
        });
    }

    function batal() {
      items.forEach(li => {
        li.textContent = li.getAttribute('data-original');
      });
      exitEditingMode();
    }

    setSaveCancelListeners(simpan, batal);
  }

  function hapusMode() {
    if (editing) return;

    if (listElement.children.length === 0) {
      showToast("Tidak ada data yang bisa dihapus.", "error");
      return;
    }

    else {
      showToast("Data berhasil dihapus.", "error");
      const deleteFn = cardType === 'visi' ? deleteVisiById : deleteMisiById;

      const deletePromises = [];
      [...listElement.children].forEach(li => {
        const id = li.dataset.id;
        deletePromises.push(deleteFn(id));
      });

      Promise.all(deletePromises)
        .then(() => {
          loadData(cardType);
        })
        .catch(err => {
          showToast("Gagal menghapus data.", "error");
          console.error(err);
        });
    }
  }

  tambahBtn.addEventListener('click', tambahMode);
  editBtn.addEventListener('click', editMode);
  hapusBtn.addEventListener('click', hapusMode);

  function enterEditingMode() {
    editing = true;
    editBtn.textContent = 'Simpan';
    hapusBtn.textContent = 'Batal';

    editBtn.removeEventListener('click', editMode);
    hapusBtn.removeEventListener('click', hapusMode);
  }

  function exitEditingMode() {
    editing = false;
    editBtn.textContent = 'Edit';
    hapusBtn.textContent = 'Hapus';

    removeSaveCancelListeners();

    editBtn.addEventListener('click', editMode);
    hapusBtn.addEventListener('click', hapusMode);
  }

  let saveListener, cancelListener;

  function setSaveCancelListeners(onSave, onCancel) {
    saveListener = onSave;
    cancelListener = onCancel;
    editBtn.addEventListener('click', saveListener);
    hapusBtn.addEventListener('click', cancelListener);
  }

  function removeSaveCancelListeners() {
    if (saveListener) editBtn.removeEventListener('click', saveListener);
    if (cancelListener) hapusBtn.removeEventListener('click', cancelListener);
    saveListener = null;
    cancelListener = null;
  }
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

loadData('visi');
loadData('misi');

setupCardActions('visi', visiList);
setupCardActions('misi', misiList);

initSidebarFunctionality();