import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

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

const guruData = ['Lomba Inovasi guru Kab.Malang Juara 3','Porseni jawa timur Pembelah'];
const siswaData = ['Lomba hari anak nasional Juara harapan 3 menyanyi tunggal','Lomba hari anak nasional Juara 1','Festival kolase Eco Green Park Juara 1',' Festival kolase Eco Green Park Juara 3', 'Lomba hari anak nasional Juara 1', '3M (melipat, menggunting, menempel'];

const guruTable = document.getElementById('guruTable');
const siswaTable = document.getElementById('siswaTable');
const btnTambahGuru = document.getElementById('btnTambahGuru');
const btnTambahSiswa = document.getElementById('btnTambahSiswa');

renderTable(guruTable, guruData);
renderTable(siswaTable, siswaData);

btnTambahGuru.addEventListener('click', () => {
  if (guruTable.querySelector('.input-edit')) return;
  guruTable.appendChild(createRow('', true, guruTable, guruData));
  setButtonsDisabled(true);
});

btnTambahSiswa.addEventListener('click', () => {
  if (siswaTable.querySelector('.input-edit')) return;
  siswaTable.appendChild(createRow('', true, siswaTable, siswaData));
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
    input.placeholder = 'masukkan prestasi';
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
    const ul = document.createElement('ul');
    ul.style.margin = '0';
    ul.style.paddingLeft = '1em';

    const li = document.createElement('li');
    li.textContent = text;

    ul.appendChild(li);
    tdDesc.style.paddingRight = '2em'; // optional untuk spasi kanan
    tdDesc.appendChild(ul);

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
  btnTambahGuru.disabled = disabled;
  btnTambahSiswa.disabled = disabled;
}

initSidebarFunctionality();