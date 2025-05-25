import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

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

const kegiatanPenunjangDefault = ['Mengikuti berbagai lomba ditingkat kabupaten maupun kotamadya.', 'Kunjungan ke instansi, tempat umum, maupun kantor pemerintah (misalnya kantor polisi, Puskesmas, kantor pos, pasar, PMK (Penanggulangan, pencegahan Kebakaran).', 'Mengadakan kegiatan-kegiatan dalam rangka memperingati hari besar Nasional.', 'Mengisi acara anak-anak dalam berbagai media.'];

function renderKegiatanPenunjang() {
  kegiatanPenunjangTable.innerHTML = '';
  kegiatanPenunjangDefault.forEach(item => kegiatanPenunjangTable.appendChild(createRow(item)));
}

btnTambah.addEventListener('click', () => {
  if (document.querySelector('.input-edit')) return;
  kegiatanPenunjangTable.appendChild(createRow('', true));
  setButtonsDisabled(true);
});

function setButtonsDisabled(disabled) {
  document.querySelectorAll('.btn-edit, .btn-hapus').forEach(btn => {
    btn.disabled = disabled;
  });
  btnTambah.disabled = disabled;
}

function createRow(text, isEdit = false) {
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
      saveRow(tr, input.value.trim(), text);
      setButtonsDisabled(false);
    });

    const btnBatal = createButton('Batal', 'btn-batal', () => {
      if (text === '') tr.remove();
      else tr.replaceWith(createRow(text));
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
      tr.replaceWith(createRow(text, true));
      setButtonsDisabled(true);
    });

    const btnHapus = createButton('Hapus', 'btn-hapus', () => deleteRow(tr, text));

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

function saveRow(tr, newText, oldText) {
  if (!newText) return alert('Data tidak boleh kosong');

  if (!oldText) {
    kegiatanPenunjangDefault.push(newText);
  } else {
    const index = kegiatanPenunjangDefault.indexOf(oldText);
    if (index > -1) kegiatanPenunjangDefault[index] = newText;
  }

  tr.replaceWith(createRow(newText));
}

function deleteRow(tr, text) {
  if (confirm('Yakin ingin menghapus data ini?')) {
    const index = kegiatanPenunjangDefault.indexOf(text);
    if (index > -1) kegiatanPenunjangDefault.splice(index, 1);
    tr.remove();
  }
}

renderKegiatanPenunjang();
initSidebarFunctionality();