export function ambilData() {
  
  const penerima = document.querySelector('select[name="penerima_kps"]').value;
  const noKpsInput = document.querySelector('input[name="no_kps"]').value.trim();

  
  const namaWali = document.querySelector('input[name="nama_wali"]')?.value.trim() || '-';
  const tahunLahirWali = document.querySelector('input[name="tahun_lahir_wali"]')?.value.trim() || '-';
  const pekerjaanWali = document.querySelector('input[name="pekerjaan_wali"]')?.value.trim() || '-';
  const pendidikanWali = document.querySelector('input[name="pendidikan_wali"]')?.value.trim() || '-';
  const penghasilanWali = document.querySelector('input[name="penghasilan_wali"]')?.value.trim() || '-';

 
  const namaLembaga = document.querySelector('input[name="nama_lembaga"]')?.value.trim() || '-';
  const alamatLembaga = document.querySelector('input[name="alamat_lembaga"]')?.value.trim() || '-';
  const kelurahanAsal = document.querySelector('input[name="kelurahanasal"]')?.value.trim() || '-';
  const kecamatanAsal = document.querySelector('input[name="kecamatanasal"]')?.value.trim() || '-';
  const npsnLembaga = document.querySelector('input[name="npsn_lembaga"]')?.value.trim() || '-';

  return {
    
    penerima_kps: penerima,
    no_kps: (penerima === 'Ya' && noKpsInput !== '') ? noKpsInput : '-',

   
    nama_wali: namaWali,
    tahun_lahir_wali: tahunLahirWali,
    pekerjaan_wali: pekerjaanWali,
    pendidikan_wali: pendidikanWali,
    penghasilan_wali: penghasilanWali,

    nama_lembaga: namaLembaga,
    alamat_lembaga: alamatLembaga,
    kelurahanasal: kelurahanAsal,
    kecamatanasal: kecamatanAsal,
    npsn_lembaga: npsnLembaga
  };
}
