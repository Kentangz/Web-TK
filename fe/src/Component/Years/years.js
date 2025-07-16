export function generateTahunAjaran() {
  const today = new Date();
  const tahun = today.getFullYear();
  const bulan = today.getMonth() + 1;
  const tahunAwal = bulan < 7 ? tahun - 1 : tahun;
  const tahunAkhir = tahunAwal + 1;
  return `${tahunAwal}/${tahunAkhir}`;
}
