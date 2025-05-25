import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

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

const suratData = ['An-nas', 'Al-Falaq','Al-Ikhlas','Al-Lahab','Al-Kautsar','Al-Nasr','Al-Fil','Al-Maun','Ayat Kursi'];
const doaData = ['Doa sebelum & Bangun Tidur', 'Doa Sebelum & Sesudah Belajar','Doa Keluar & Masuk Kamar Mandi','Doa Ketika Hujan Turun','Doa Masuk & keluar Masjid','Doa Naik Kendaraan Darat','Doa Naik Kendaraan Laut','Doa Kedua Orang Tua','Doa Keselamatan dunia akhirat','Doa Panjang Umur'];
const haditsData = ['Hadist Senyum', 'Hadist kebersihan','Hadist Jangan Marah','Hadist Cinta Tanah Air','Hadist Sholat','Asmaul Husna 1-50'];

const suratTable = document.getElementById('suratTable');
const doaTable = document.getElementById('doaTable');
const haditsTable = document.getElementById('haditsTable');

const btnTambahSurat = document.getElementById('btnTambahSurat');
const btnTambahDoa = document.getElementById('btnTambahDoa');
const btnTambahHadits = document.getElementById('btnTambahHadits');

renderTable(suratTable, suratData);
renderTable(doaTable, doaData);
renderTable(haditsTable, haditsData);

btnTambahSurat.addEventListener('click', () => {
  if (suratTable.querySelector('.input-edit')) return;
  suratTable.appendChild(createRow('', true, suratTable, suratData));
  setButtonsDisabled(true);
});

btnTambahDoa.addEventListener('click', () => {
  if (doaTable.querySelector('.input-edit')) return;
  doaTable.appendChild(createRow('', true, doaTable, doaData));
  setButtonsDisabled(true);
});

btnTambahHadits.addEventListener('click', () => {
  if (haditsTable.querySelector('.input-edit')) return;
  haditsTable.appendChild(createRow('', true, haditsTable, haditsData));
  setButtonsDisabled(true);
});

function renderTable(tableElement, dataArray) {
  tableElement.innerHTML = '';
  dataArray.forEach(item => {
    tableElement.appendChild(createRow(item, false, tableElement, dataArray));
  });
}

function createRow(text, isEdit, tableElement, dataArray) {
  const tr = document.createElement('tr');
  const tdDesc = document.createElement('td');
  const tdOpsi = document.createElement('td');

  if (isEdit) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.placeholder = 'Masukkan deskripsi';
    input.classList.add('input-edit');
    input.style.width = '100%';
    tdDesc.appendChild(input);

    const btnSimpan = createButton('Simpan', 'btn-simpan', () => {
      saveRow(tr, input.value.trim(), text, tableElement, dataArray);
      setButtonsDisabled(false);
    });

    const btnBatal = createButton('Batal', 'btn-batal', () => {
      if (text === '') tr.remove();
      else tr.replaceWith(createRow(text, false, tableElement, dataArray));
      setButtonsDisabled(false);
    });

    tdOpsi.append(btnSimpan, btnBatal);
  } else {
    tdDesc.textContent = text;
    
    const btnEdit = createButton('Edit', 'btn-edit', () => {
      tr.replaceWith(createRow(text, true, tableElement, dataArray));
      setButtonsDisabled(true);
    });

    const btnHapus = createButton('Hapus', 'btn-hapus', () => {
      if (confirm('Yakin ingin menghapus data ini?')) {
        const index = dataArray.indexOf(text);
        if (index !== -1) dataArray.splice(index, 1);
        tr.remove();
      }
    });

    tdOpsi.append(btnEdit, btnHapus);
  }

  tr.append(tdDesc, tdOpsi);
  return tr;
}

function createButton(text, className, onClick) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add(className);
  btn.addEventListener('click', onClick);
  return btn;
}

function saveRow(tr, newText, oldText, tableElement, dataArray) {
  if (!newText) return alert('Data tidak boleh kosong');
  if (!oldText) {
    dataArray.push(newText);
  } else {
    const index = dataArray.indexOf(oldText);
    if (index !== -1) dataArray[index] = newText;
  }
  tr.replaceWith(createRow(newText, false, tableElement, dataArray));
}

function setButtonsDisabled(disabled) {
  document.querySelectorAll('.btn-edit, .btn-hapus').forEach(btn => {
    btn.disabled = disabled;
  });
  btnTambahSurat.disabled = disabled;
  btnTambahDoa.disabled = disabled;
  btnTambahHadits.disabled = disabled;
}

initSidebarFunctionality();

