import '../global.css';
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar';
import { getAllContactPerson, postContactPerson, updateContactPersonById, deleteContactPersonById, getAllEmail, postEmail, updateEmailById, deleteEmailById, getAllInstagram, postInstagram, updateInstagramById, deleteInstagramById, getAllAlamat, postAlamat, updateAlamatById, deleteAlamatById  } from './fetch.js';
import { checkAuth } from '../Auth/Api/checkX.js';

if (!checkAuth()) {
  throw new Error("Not authenticated");
}

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
        <table id="instagramTable" class="card-table">
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
     <button id="btnTambahInstagram" class="btn-tambah">Tambah</button>
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

function createTableRows(dataArray, columns) {
  return dataArray.map(item => {
    const cells = columns.map(col => {
      return `<td class="${col.class || ''}">${col.key ? (item[col.key] || '') : ''}</td>`;
    }).join('');
    return `<tr data-id="${item.id || ''}">${cells}
      <td class="actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-hapus">Hapus</button>
      </td>
    </tr>`;
  }).join('');
}

function disableAllButtonsExcept(rowExcept, tableId) {
  document.querySelectorAll('button').forEach(btn => {
    btn.disabled = true;
  });

  rowExcept.querySelectorAll('button').forEach(btn => {
    btn.disabled = false;
  });
}

function enableAllButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

let editingTelp = false;
let editingEmail = false;
let editingInstagram = false;
let editingAlamat = false;

function loadContactPersons() {
  const tbody = document.querySelector("#telpTable tbody");
  tbody.innerHTML =`<tr><td colspan="3">Loading data contact person...</td></tr>`;

  getAllContactPerson()
    .then(contactPersons => {
      const tbody = document.querySelector('#telpTable tbody');
      tbody.innerHTML = contactPersons.map(item => `
        <tr data-id="${item.id}">
          <td style="max-width: 300px; word-wrap: break-word; white-space: normal;">${item.name}</td>
          <td style="max-width: 300px; word-wrap: break-word; white-space: normal;">${item.phone}</td>
          <td class="actions">
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('tr').forEach(row => setContactPersonActionEvents(row));
    })
    .catch(error => {
      console.error("Gagal load data contact person:", error);
      showToast("Gagal mengambil data contact person dari server.", "error");
    });
}

function setContactPersonActionEvents(row) {
  const editBtn = row.querySelector(".btn-edit");
  const hapusBtn = row.querySelector(".btn-hapus");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (editingTelp) {
        return;
      }

      const cells = row.querySelectorAll("td");
      const actionCellIndex = cells.length - 1;

      const originalName = cells[0].textContent.trim();
      const originalPhone = cells[1].textContent.trim();

      cells[0].innerHTML = `<input type="text" value="${originalName}" placeholder="Masukkan Nama Contact Person" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;
      cells[1].innerHTML = `<input type="text" value="${originalPhone}" placeholder="Masukkan Nomor Telepon" style="width:100%"  maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;

      const actions = cells[actionCellIndex];
      actions.innerHTML = `
        <button class="btn-simpan">Simpan</button>
        <button class="btn-batal">Batal</button>
      `;

      editingTelp = true;
      disableAllButtonsExcept(row, 'telpTable');

      actions.querySelector(".btn-simpan").addEventListener("click", () => {
        const inputs = row.querySelectorAll("input");
        const nomor = inputs[0].value.trim();
        const nama = inputs[1].value.trim();

        if (!nomor || !nama) {
          showToast("Data contact person tidak boleh kosong.", "error");
          return;
        }

        const id = row.getAttribute('data-id');

        updateContactPersonById(id, { nomor, nama })
          .then(() => {
            row.cells[0].textContent = nomor;
            row.cells[1].textContent = nama;
            showToast("Data contact person berhasil disimpan.", "success");
            resetActions(row);
            editingTelp = false;
            enableAllButtons();
          })
          .catch(error => {
            showToast("Gagal memperbarui data contact person.", "error");
            console.error(error);
          });
      });

      actions.querySelector(".btn-batal").addEventListener("click", () => {
        cells[0].textContent = originalName;
        cells[1].textContent = originalPhone;

        resetActions(row);
        editingTelp = false;
        enableAllButtons();
      });
    });
  }

  if (hapusBtn) {
    hapusBtn.addEventListener("click", () => {
      if (editingTelp) {
        return;
      }

      const id = row.getAttribute('data-id');
      if (!id) {
        showToast("Data tidak valid, tidak dapat dihapus.", "error");
        return;
      }

      else {
        showToast("Data contact person berhasil dihapus.", "error");
        deleteContactPersonById(id)
          .then(() => {
            row.remove();
          })
          .catch(error => {
            showToast("Gagal menghapus data contact person.", "error");
            console.error(error);
          });
      }
    });
  }
}

document.querySelector("#btnTambahTelp").addEventListener("click", () => {
  if (editingTelp) {
    return;
  }

  const tbody = document.querySelector("#telpTable tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td><input type="text" placeholder="Masukkan Nama Contact Person" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"></td>
    <td><input type="text" placeholder="Masukkan Nomor Telepon" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"></td>
    <td class="actions">
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    </td>
  `;

  tbody.appendChild(newRow);
  editingTelp = true;
  disableAllButtonsExcept(newRow, 'telpTable');

  newRow.querySelector(".btn-simpan").addEventListener("click", () => {
    const inputs = newRow.querySelectorAll("input");
    const nomor = inputs[0].value.trim();
    const nama = inputs[1].value.trim();

    if (!nomor || !nama) {
      showToast("Data contact person tidak boleh kosong.", "error");
      return;
    }

    postContactPerson({ nomor, nama })
      .then(newData => {
        if (!newData || !newData.id) throw new Error("Response data tidak valid");

        newRow.setAttribute("data-id", newData.id);
        newRow.cells[0].outerHTML = `<td style="max-width:300px; word-wrap:break-word; white-space:normal">${newData.phone}</td>`;
        newRow.cells[1].outerHTML = `<td style="max-width:300px; word-wrap:break-word; white-space:normal">${newData.name}</td>`;
        showToast("Data contact person berhasil ditambahkan.", "success");
        resetActions(newRow);
        editingTelp = false;
        enableAllButtons();
      })
      .catch(error => {
        showToast("Gagal menambahkan data contact person.", "error");
        console.error(error);
      });
  });

  newRow.querySelector(".btn-batal").addEventListener("click", () => {
    newRow.remove();
    editingTelp = false;
    enableAllButtons();
  });
});

function resetActions(row) {
  const actions = row.querySelector('.actions');
  if (actions) {
    actions.innerHTML = `
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    `;
    setContactPersonActionEvents(row);
  }
}

function loadEmails() {
  const tbody = document.querySelector("#emailTable tbody");
  tbody.innerHTML =`<tr><td colspan="3">Loading data email...</td></tr>`;

  getAllEmail()
    .then(emails => {
      const tbody = document.querySelector('#emailTable tbody');
      tbody.innerHTML = emails.map(email => `
        <tr data-id="${email.id}">
          <td style="max-width: 300px; word-wrap: break-word; white-space: normal;">${email.email}</td>
          <td class="empty-col"></td>
          <td class="actions">
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('tr').forEach(row => setEmailActionEvents(row));
    })
    .catch(error => {
      console.error("Gagal load data email:", error);
      showToast("Gagal mengambil data email dari server.", "error");
    });
}

function setEmailActionEvents(row) {
  const editBtn = row.querySelector(".btn-edit");
  const hapusBtn = row.querySelector(".btn-hapus");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (editingEmail) {
        return;
      }

      const cells = row.querySelectorAll("td");
      const actionCell = cells[cells.length - 1];
      const originalEmail = cells[0].textContent.trim();

      cells[0].innerHTML = `<input type="text" value="${originalEmail}" placeholder="Masukkan Email" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;
      actionCell.innerHTML = `
        <button class="btn-simpan">Simpan</button>
        <button class="btn-batal">Batal</button>
      `;

      editingEmail = true;
      disableAllButtonsExcept(row, 'emailTable');

      actionCell.querySelector(".btn-simpan").addEventListener("click", () => {
        const newEmail = row.querySelector("input").value.trim();
        if (!newEmail) {
          showToast("Data email tidak boleh kosong.", "error");
          return;
        }

        const id = row.getAttribute('data-id');
        updateEmailById(id, { email: newEmail })
          .then(() => {
            cells[0].textContent = newEmail;
            resetEmailActions(row);
            showToast("Data email berhasil disimpan.", "success");
            editingEmail = false;
            enableAllButtons();
          })
          .catch(error => {
            showToast("Gagal memperbarui data email.", "error");
            console.error(error);
          });
      });

      actionCell.querySelector(".btn-batal").addEventListener("click", () => {
        cells[0].textContent = originalEmail;
        resetEmailActions(row);
        editingEmail = false;
        enableAllButtons();
      });
    });
  }

  if (hapusBtn) {
    hapusBtn.addEventListener("click", () => {
      if (editingEmail) {
        return;
      }

      const id = row.getAttribute('data-id');
      if (!id) {
        showToast("Data tidak valid, tidak dapat dihapus.", "error");
        return;
      }

      else {
        showToast("Data email berhasil dihapus.", "error");
        deleteEmailById(id)
          .then(() => row.remove())
          .catch(error => {
            showToast("Gagal menghapus data email.", "error");
            console.error(error);
          });
      }
    });
  }
}

document.querySelector("#btnTambahEmail").addEventListener("click", () => {
  if (editingEmail) {
    return;
  }

  const tbody = document.querySelector("#emailTable tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="Masukkan Email" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"></td>
    <td class="empty-col"></td>
    <td class="actions">
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    </td>
  `;
  tbody.appendChild(newRow);

  editingEmail = true;
  disableAllButtonsExcept(newRow, 'emailTable');

  newRow.querySelector(".btn-simpan").addEventListener("click", () => {
    const emailValue = newRow.querySelector("input").value.trim();
    if (!emailValue) {
      showToast("Data email tidak boleh kosong.", "error");
      return;
    }

    postEmail({ email: emailValue })
      .then(newData => {
        if (!newData || !newData.id) throw new Error("Response data tidak valid");

        newRow.setAttribute("data-id", newData.id);
        newRow.cells[0].outerHTML = `<td style="max-width:300px; word-wrap:break-word; white-space:normal">${newData.email}</td>`;
        resetEmailActions(newRow);
        showToast("Data email berhasil ditambahkan.", "success");
        editingEmail = false;
        enableAllButtons();
      })
      .catch(error => {
        showToast("Gagal menambahkan data email.", "error");
        console.error(error);
      });
  });

  newRow.querySelector(".btn-batal").addEventListener("click", () => {
    newRow.remove();
    editingEmail = false;
    enableAllButtons();
  });
});

function resetEmailActions(row) {
  const actions = row.querySelector(".actions");
  if (actions) {
    actions.innerHTML = `
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    `;
    setEmailActionEvents(row);
  }
}

function loadInstagram() {
  const tbody = document.querySelector("#instagramTable tbody");
  tbody.innerHTML =`<tr><td colspan="3">Loading data instagram...</td></tr>`;
  getAllInstagram()
    .then(instagrams => {
      const tbody = document.querySelector('#instagramTable tbody');
      tbody.innerHTML = instagrams.map(instagram => `
        <tr data-id="${instagram.id}">
          <td style="max-width: 300px; word-wrap: break-word; white-space: normal;">${instagram.username}</td>
          <td class="empty-col"></td>
          <td class="actions">
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('tr').forEach(row => setInstagramActionEvents(row));
    })
    .catch(error => {
      console.error("Gagal load data Instagram:", error);
      showToast("Gagal mengambil data Instagram dari server.", "error");
    });
}

function setInstagramActionEvents(row) {
  const editBtn = row.querySelector(".btn-edit");
  const hapusBtn = row.querySelector(".btn-hapus");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (editingInstagram) {
        return;
      }

      const cells = row.querySelectorAll("td");
      const actionCell = cells[cells.length - 1];
      const originalUsername = cells[0].textContent.trim();

      cells[0].innerHTML = `<input type="text" value="${originalUsername}" placeholder="Masukkan Username Instagram" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;
      actionCell.innerHTML = `
        <button class="btn-simpan">Simpan</button>
        <button class="btn-batal">Batal</button>
      `;

      editingInstagram = true;
      disableAllButtonsExcept(row, 'instagramTable');

      actionCell.querySelector(".btn-simpan").addEventListener("click", () => {
        const newUsername = row.querySelector("input").value.trim();
        if (!newUsername) {
          showToast("Data Instagram tidak boleh kosong.", "error");
          return;
        }

        const id = row.getAttribute('data-id');
        updateInstagramById(id, { ig_name: newUsername })
          .then(updated => {
            if (!updated) throw new Error("Update gagal");
            cells[0].textContent = updated.username;
            resetInstagramActions(row);
            showToast("Data Instagram berhasil disimpan.", "success");
            editingInstagram = false;
            enableAllButtons();
          })
          .catch(error => {
            showToast("Gagal memperbarui data Instagram.", "error");
            console.error(error);
          });
      });

      actionCell.querySelector(".btn-batal").addEventListener("click", () => {
        cells[0].textContent = originalUsername;
        resetInstagramActions(row);
        editingInstagram = false;
        enableAllButtons();
      });
    });
  }

  if (hapusBtn) {
    hapusBtn.addEventListener("click", () => {
      if (editingInstagram) {
        return;
      }

      const id = row.getAttribute('data-id');
      if (!id) {
        showToast("Data tidak valid, tidak dapat dihapus.", "error");
        return;
      }

      else {
        showToast("Data Instagram berhasil dihapus.", "error");
        deleteInstagramById(id)
          .then(() => row.remove())
          .catch(error => {
            showToast("Gagal menghapus data Instagram.", "error");
            console.error(error);
          });
      }
    });
  }
}

document.querySelector("#btnTambahInstagram").addEventListener("click", () => {
  if (editingInstagram) {
    return;
  }

  const tbody = document.querySelector("#instagramTable tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="Masukkan Username Instagram" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"></td>
    <td class="empty-col"></td>
    <td class="actions">
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    </td>
  `;
  tbody.appendChild(newRow);

  editingInstagram = true;
  disableAllButtonsExcept(newRow, 'instagramTable');

  newRow.querySelector(".btn-simpan").addEventListener("click", () => {
    const usernameValue = newRow.querySelector("input").value.trim();
    if (!usernameValue) {
      showToast("Data Instagram tidak boleh kosong.", "error");
      return;
    }

    postInstagram({ ig_name: usernameValue })
      .then(newData => {
        if (!newData || !newData.id) throw new Error("Response data tidak valid");

        newRow.setAttribute("data-id", newData.id);
        newRow.cells[0].outerHTML = `<td style="max-width:300px; word-wrap:break-word; white-space:normal">${newData.username}</td>`;
        resetInstagramActions(newRow);
        showToast("Data Instagram berhasil ditambahkan.", "success");
        editingInstagram = false;
        enableAllButtons();
      })
      .catch(error => {
        showToast("Gagal menambahkan data Instagram.", "error");
        console.error(error);
      });
  });

  newRow.querySelector(".btn-batal").addEventListener("click", () => {
    newRow.remove();
    editingInstagram = false;
    enableAllButtons();
  });
});

function resetInstagramActions(row) {
  const actions = row.querySelector(".actions");
  if (actions) {
    actions.innerHTML = `
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    `;
    setInstagramActionEvents(row);
  }
}

function loadAlamat() {
  const tbody = document.querySelector("#alamatTable tbody");
  tbody.innerHTML =`<tr><td colspan="3">Loading data alamat...</td></tr>`;
  getAllAlamat()
    .then(alamats => {
      const tbody = document.querySelector('#alamatTable tbody');
      tbody.innerHTML = alamats.map(alamat => `
        <tr data-id="${alamat.id}">
          <td style="max-width: 300px; word-wrap: break-word; white-space: normal;">${alamat.alamat}</td>
          <td class="empty-col"></td>
          <td class="actions">
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          </td>
        </tr>
      `).join('');

      tbody.querySelectorAll('tr').forEach(row => setAlamatActionEvents(row));
    })
    .catch(error => {
      console.error("Gagal load data Alamat:", error);
      showToast("Gagal mengambil data Alamat dari server.", "error");
    });
}

function setAlamatActionEvents(row) {
  const editBtn = row.querySelector(".btn-edit");
  const hapusBtn = row.querySelector(".btn-hapus");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (editingAlamat) {
        return;
      }

      const cells = row.querySelectorAll("td");
      const actionCell = cells[cells.length - 1];
      const originalAlamat = cells[0].textContent.trim();

      cells[0].innerHTML = `<input type="text" value="${originalAlamat}" placeholder="Masukkan Alamat" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;
      actionCell.innerHTML = `
        <button class="btn-simpan">Simpan</button>
        <button class="btn-batal">Batal</button>
      `;

      editingAlamat = true;
      disableAllButtonsExcept(row, 'alamatTable');

      actionCell.querySelector(".btn-simpan").addEventListener("click", () => {
        const newAlamat = row.querySelector("input").value.trim();
        if (!newAlamat) {
          showToast("Data alamat tidak boleh kosong.", "error");
          return;
        }

        const id = row.getAttribute('data-id');
        updateAlamatById(id, { alamat: newAlamat })
          .then(updated => {
            if (!updated) throw new Error("Update gagal");
            cells[0].textContent = updated.alamat;
            resetAlamatActions(row);
            showToast("Data alamat berhasil disimpan.", "success");
            editingAlamat = false;
            enableAllButtons();
          })
          .catch(error => {
            showToast("Gagal memperbarui data alamat.", "error");
            console.error(error);
          });
      });

      actionCell.querySelector(".btn-batal").addEventListener("click", () => {
        cells[0].textContent = originalAlamat;
        resetAlamatActions(row);
        editingAlamat = false;
        enableAllButtons();
      });
    });
  }

  if (hapusBtn) {
    hapusBtn.addEventListener("click", () => {
      if (editingAlamat) {
        return;
      }

      const id = row.getAttribute('data-id');
      if (!id) {
        showToast("Data tidak valid, tidak dapat dihapus.", "error");
        return;
      }

      else {
        showToast("Data alamat berhasil dihapus.", "error");
        deleteAlamatById(id)
          .then(() => row.remove())
          .catch(error => {
            showToast("Gagal menghapus data alamat.", "error");
            console.error(error);
          });
      }
    });
  }
}

document.querySelector("#btnTambahAlamat").addEventListener("click", () => {
  if (editingAlamat) {
    return;
  }

  const tbody = document.querySelector("#alamatTable tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="Masukkan Alamat" style="width:100%" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"></td>
    <td class="empty-col"></td>
    <td class="actions">
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    </td>
  `;
  tbody.appendChild(newRow);

  editingAlamat = true;
  disableAllButtonsExcept(newRow, 'alamatTable');

  newRow.querySelector(".btn-simpan").addEventListener("click", () => {
    const alamatValue = newRow.querySelector("input").value.trim();
    if (!alamatValue) {
      showToast("Data alamat tidak boleh kosong.", "error");
      return;
    }

    postAlamat({ alamat: alamatValue })
      .then(newData => {
        if (!newData || !newData.id) throw new Error("Response data tidak valid");

        newRow.setAttribute("data-id", newData.id);
        newRow.cells[0].outerHTML = `<td style="max-width:300px; word-wrap:break-word; white-space:normal">${newData.alamat}</td>`;
        resetAlamatActions(newRow);
        showToast("Data alamat berhasil ditambahkan.", "success");
        editingAlamat = false;
        enableAllButtons();
      })
      .catch(error => {
        showToast("Gagal menambahkan data alamat.", "error");
        console.error(error);
      });
  });

  newRow.querySelector(".btn-batal").addEventListener("click", () => {
    newRow.remove();
    editingAlamat = false;
    enableAllButtons();
  });
});

function resetAlamatActions(row) {
  const actions = row.querySelector(".actions");
  if (actions) {
    actions.innerHTML = `
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    `;
    setAlamatActionEvents(row);
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

loadContactPersons();
loadEmails();
loadInstagram();
loadAlamat();

initSidebarFunctionality();