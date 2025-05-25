import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#tujuan-strategi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'tujuan-strategi',
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

     <div class="tujuan_strategi-card">
        <div class="card-header">
          <div class="card-title">Tujuan</div>
      </div>
      <div class="card-body">
        <ul id="tujuan" class="tujuan"></ul>
      </div>
    </div>
    <div class="button-group">
        <button class="btn-tambah" data-type="tujuan">Tambah</button>
        <button class="btn-edit" data-type="tujuan">Edit</button>
        <button class="btn-hapus" data-type="tujuan">Hapus</button>
    </div>

    <div class="tujuan_strategi-card">
      <div class="card-header">
        <div class="card-title">Strategi</div>
      </div>
      <div class="card-body">
        <ul id="strategi" class="strategi"></ul>
      </div>
    </div>
    <div class="button-group">
        <button class="btn-tambah" data-type="strategi">Tambah</button>
        <button class="btn-edit" data-type="strategi">Edit</button>
        <button class="btn-hapus" data-type="strategi">Hapus</button>
    </div>
`;

const Tujuan = [
  "Mengembangkan kemampuan dasar peserta didik untuk melanjutkan pendidikan kejenjang berikutnya"
];

const Strategi = [
  "Melaksanakan kegiatan belajar mengajar secara tertib.",
  "Melengkapi kebutuhan sarana dan prasarana.",
  "Melaksananakan tata tertib secara konsisten.",
  "Meningkatkan Profesionalisme guru.",
  "Menciptakan suasana kerja yang saling asah, asih, dan asuh",
  "Menciptakan suasana belajar dan bermain yang menyenangkan, aman, bersih, dan indah.",
];

function renderListData(listElement, data) {
  listElement.innerHTML = '';
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.style.listStyle = 'disc';
    listElement.appendChild(li);
  });
}

const tujuanList = document.getElementById('tujuan');
const strategiList = document.getElementById('strategi');


let editing = false;
function setupCardActions(cardType, listElement) {
  const tambahBtn = document.querySelector(`.btn-tambah[data-type="${cardType}"]`);
  const editBtn = document.querySelector(`.btn-edit[data-type="${cardType}"]`);
  const hapusBtn = document.querySelector(`.btn-hapus[data-type="${cardType}"]`);

  function tambahMode() {
    if (editing) return;

    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.innerHTML = `<input type="text" placeholder="Masukkan ${cardType}" style="width: 100%;" />`;
    li.style.listStyle = 'disc';
    listElement.appendChild(li);
    li.querySelector('input').focus();

    enterEditingMode();

    function simpan() {
      const input = li.querySelector('input');
      const val = input.value.trim();
      if (!val) {
        alert("Data tidak boleh kosong.");
        return;
      }
      li.textContent = val;
      exitEditingMode();
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
      alert(`Belum ada data untuk diedit.`);
      return;
    }

    enterEditingMode();

    items.forEach(li => {
      const original = li.textContent;
      li.setAttribute('data-original', original);
      li.innerHTML = `<input type="text" value="${original}" style="width: 100%;" />`;

    });

    function simpan() {
      let valid = true;
      items.forEach(li => {
        const val = li.querySelector('input').value.trim();
        if (!val) valid = false;
      });

      if (!valid) {
        alert("Data tidak boleh kosong.");
        return;
      }

      items.forEach(li => {
        const val = li.querySelector('input').value.trim();
        li.textContent = val;
      });

      exitEditingMode();
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
      alert("Tidak ada data yang bisa dihapus.");
      return;
    }

    if (confirm(`Yakin ingin menghapus?`)) {
      listElement.innerHTML = '';
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

renderListData(tujuanList, Tujuan);
renderListData(strategiList, Strategi);

setupCardActions('tujuan', tujuanList);
setupCardActions('strategi', strategiList);
initSidebarFunctionality();

