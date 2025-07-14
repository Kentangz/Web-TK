import html2pdf from 'html2pdf.js';
import { ambilData } from './opsional.js';
import { createPreviewPendaftaranHTML } from './previewpendaftaran.js';

export function handlePendaftaranSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = Object.fromEntries(new FormData(form).entries());
  const dataopsional = ambilData();
  const data = { ...formData, ...dataopsional };

  const errors = validateFormInputs(formData);
  if (errors.length > 0) {
    showValidationErrors(errors);
    return;
  }

  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = createPreviewPendaftaranHTML(data);

  html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename: `Formulir_Pendaftaran_${data.nama.replace(/\s+/g, '_')}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: [210, 330] },
      pagebreak: { mode: ['css', 'legacy'] }
    })
    .from(tempContainer)
    .save();
}


function countWords(text) {
  if (!text || text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
}

function validateFormInputs(formData) {
  const errors = [];
  const maxChars = 80; 
  const fieldLabels = {
    'nama': 'Nama Lengkap Anak',
    'tempat_lahir': 'Tempat Lahir',
    'agama': 'Agama',
    'alamattempattinggal': 'Alamat Tempat Tinggal',
    'dusun': 'Dusun',
    'kelurahan': 'Kelurahan',
    'kecamatan': 'Kecamatan',
    'kota': 'Kabupaten/Kota',
    'provinsi': 'Provinsi',
    'transportasi': 'Alat Transportasi',
    'jenis_tinggal': 'Jenis Tinggal',
    'kewarganegaraan': 'Kewarganegaraan',
    'nama_ayah': 'Nama Ayah',
    'keterangan_kebutuhan_ayah': 'Keterangan Kebutuhan Khusus Ayah',
    'pekerjaan_ayah': 'Pekerjaan Ayah',
    'pendidikan_ayah': 'Pendidikan Ayah',
    'penghasilan_ayah': 'Penghasilan Ayah',
    'nama_ibu': 'Nama Ibu',
    'keterangan_kebutuhan_ibu': 'Keterangan Kebutuhan Khusus Ibu',
    'pekerjaan_ibu': 'Pekerjaan Ibu',
    'pendidikan_ibu': 'Pendidikan Ibu',
    'penghasilan_ibu': 'Penghasilan Ibu',
    'nama_wali': 'Nama Wali',
    'pekerjaan_wali': 'Pekerjaan Wali',
    'pendidikan_wali': 'Pendidikan Wali',
    'penghasilan_wali': 'Penghasilan Wali',
    'jarak_ke_sekolah': 'Jarak ke Sekolah',
    'jarak_lebih': 'Jarak Lebih dari 1 km',
    'waktu_tempuh': 'Waktu Tempuh',
    'waktu_lebih': 'Waktu Lebih dari 60 Menit',
    'nama_lembaga': 'Nama Lembaga',
    'alamat_lembaga': 'Alamat Lembaga',
    'kelurahanasal': 'Kelurahan Asal',
    'kecamatanasal': 'Kecamatan Asal',
    'npsn_lembaga': 'NPSN Lembaga'
  };

  for (const field in fieldLabels) {
    if (formData[field]) {
      // const charCount = formData[field].length; 
      const charCount = formData[field].replace(/\s/g, '').length;
      if (charCount > maxChars) {
        errors.push(`${fieldLabels[field]}: ${charCount} huruf (maksimal ${maxChars} huruf)`);
      }
    }
  }

  return errors;
}

function showValidationErrors(errors) {
  const existingError = document.querySelector('.validation-error');
  if (existingError) existingError.remove();

  const errorDiv = document.createElement('div');
  errorDiv.className = 'validation-error';
  errorDiv.style.cssText = `
    background-color: #fee;
    border: 1px solid #fcc;
    color: #c33;
    padding: 15px;
    margin: 15px 0;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.5;
  `;
  errorDiv.innerHTML = `
    <strong>Error: Input terlalu panjang!</strong><br>
    Field berikut melebihi batas 80 kata:<br>
    ${errors.map(err => `• ${err}`).join('<br>')}
  `;

  const form = document.getElementById('formPendaftaran');
  form.parentNode.insertBefore(errorDiv, form);
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

