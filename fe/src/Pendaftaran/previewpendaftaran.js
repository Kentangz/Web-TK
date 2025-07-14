import logoImage from '/logo.svg';

export function createPreviewPendaftaranHTML(data) {
  return `
    <div class="kop-formulir">
      <img src="${logoImage}" alt="Logo Sekolah" class="logo-formulir">
      <div class="judul-formulir">
        <h3>YAYASAN BUNDA SITI HAJAR</h3>
        <h2>TK, KB SITI HAJAR KARANGPLOSO</h2>
        <p>Jl. Ampel Pratama V Blok E-2/09 Perum. Pesanggrahan Pratama, Ampeldento - Karangploso</p>
      </div>
      <div style="clear: both;"></div>
    </div>
    <hr class="garis-tebal">
    <div class="konten-formulir">
      <div class="teks-formulir">
        <h1>FORMULIR PESERTA DIDIK (2024/2025)</h1>
      </div>
      <div class="teks-formulir">
        <h2>IDENTITAS PESERTA DIDIK (WAJIB DI ISI)</h2>
      </div>
      <table class="formulir-table">
        <tr>
          <td>a. Nama Lengkap</td>
          <td>
            <div class="kolom-data">
              <span class="titikdua">:</span>
              <div class="kotak-output">${data.nama}</div>
              <div class="kotak-output-1"></div>
            </div>
          </td>
        </tr>
        <tr><td>b. Jenis Kelamin</td><td>: <div class="kotak-output-small">${data.gender}</div></td></tr>
       <tr>
          <td>c. NISN</td>
          <td class="kotak-nisn">:
            <div class="kotak-wrapper">
              ${(data.nisn || '').padEnd(10, '\u00A0').split('').map(d =>
                `<span class="kotak-angka">${d === ' ' ? '&nbsp;' : d}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr>
          <td>d. No. Induk Kependudukan (NIK)</td>
          <td>:
            <div class="kotak-wrapper">
              ${(data.nik || '').padEnd(16, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr>
          <td>e. Tempat, Tgl Lahir</td>
          <td>: <div class="kotak-output-medium-1">${data.tempat_lahir}</div>,
            <div class="kotak-wrapper">
              ${(() => {
                if (!data.tgl_lahir) return ''; 
                const [tahun, bulan, hari] = data.tgl_lahir.split('-');
                const tglFormatted = `${hari}/${bulan}/${tahun}`.padEnd(10, '\u00A0');
                return tglFormatted.split('').map(char =>
                  char === '<span class="spangaphp">/</span>' ? '<span class="spangaphp">/</span>' : `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
              })()}
            </div>
          </td>
        </tr>
        <tr><td>f. Agama</td><td>: <div class="kotak-output-small">${data.agama}</div></td></tr>
        <tr><td>g. Berkebutuhan Khusus</td><td>: <div class="kotak-output-small">${data.kebutuhan_khusus}</div></td></tr>
        <tr><td>h. Alamat Tempat Tinggal</td><td>: <div class="kotak-output-wide">${data.alamattempattinggal}</div></td></tr>
        <tr>
          <td class="label-miring">- Dusun</td>
          <td class="isi-memuat">
            : <div class="kotak-output-medium">${data.dusun}</div>
            RT
            <div class="kotak-wrapper">
              ${(data.rt || '').padStart(3, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
            RW
            <div class="kotak-wrapper">
              ${(data.rw || '').padStart(3, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Kelurahan</td>
          <td>:
            <div class="kotak-output-medium">${data.kelurahan}</div>
            Kode Pos
            <div class="kotak-wrapper">
              ${(data.kode_pos || '').padEnd(5, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Kecamatan</td>
          <td>: <div class="kotak-output-wide">${data.kecamatan}</div></td>
        </tr>
        <tr>
          <td class="label-indented">- Kabupaten / Kota</td>
          <td>: <div class="kotak-output-wide">${data.kota}</div></td>
        </tr>
        <tr>
          <td class="label-indented">- Provinsi</td>
          <td>: <div class="kotak-output-wide">${data.provinsi}</div></td>
        </tr>
        <tr>
          <td>i. Alat Transportasi ke Sekolah</td>
          <td>
            <div class="transportasi-flex">
               : <div class="kotak-output-small-1">${data.transportasi}</div>
              <div class="daftar-transportasi">
                *)1. Jalan Kaki&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. Kereta api<br>
                2. Kendaraan Pribadi&nbsp;&nbsp;&nbsp;6. Ojek<br>
                3. Angkutan Umum/Bus&nbsp;&nbsp;&nbsp;7. Andong<br>
                4. Mobil/Bus Jemput&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8. Mobil Pribadi
              </div>
            </div>
          </td>
        </tr>
        <tr><td>j. Jenis Tinggal</td><td>: <div class="kotak-output-small">${data.jenis_tinggal}</div><span class="spangap">*) 1. Bersama Orang Tua 2. Wall 3. Kost 4. Asrama 5. Panti Asuhan 6. Lainnya</span></td></tr>
        <tr>
          <td>k. No Telepon Rumah</td>
          <td>:
            <div class="kotak-wrapper">
              ${(() => {
                const telp = (data.telp_rumah || '').padEnd(12, '\u00A0');
                return telp.split('').map((char, idx) => {
                  const displayChar = char === ' ' ? '&nbsp;' : char;
                  return idx === 4 ? `<span class="spangaphp">-</span><span class="kotak-angka">${displayChar}</span>` : `<span class="kotak-angka">${displayChar}</span>`;
                }).join('');
              })()}
            </div>
            <span class="spangaphp">No HP:</span>
            <div class="kotak-wrapper">
              ${(data.no_hp || '').padEnd(12, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr><td>l. Email Pribadi</td><td>: <div class="kotak-output-wide">${data.email}</div></td></tr>
        <tr>
          <td>m. Penerima KPS</td>
          <td>:
            <div class="kotak-output-small">${data.penerima_kps}</div>
            <span class="spangap">No. KPS:</span>
            <div class="kotak-wrapper">
              ${(data.no_kps || '').padEnd(16, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
            <span class = "spangap">*) KPS = Kartu Perlindungan Sosial</span>
          </td>
        </tr>
        <tr><td>n. Kewarganegaraan</td><td>: <div class="kotak-output-small">${data.kewarganegaraan}</div><span class = "spangap">*) 1. WNI (Indonesia) 2. WNA</span></td></tr>
      </table>
      <div class="teks-formulir">
        <h2>DATA AYAH KANDUNG (WAJIB DI ISI)</h2>
      </div>
      <table class="formulir-table"> 
        <tr>
          <td>o. Nama Ayah</td>
          <td>:
            <div class="kotak-output-medium">${data.nama_ayah}</div>
            Tahun Lahir:
            <div class="kotak-wrapper">
              ${(data.tahun_lahir_ayah || '').slice(0, 4).padEnd(4, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Berkebutuhan Khusus</td>
          <td>: 
            <div class="kotak-output-smaller">${data.kebutuhan_khusus_ayah}</div>
            <div class="kotak-output-small">${data.keterangan_kebutuhan_ayah || '&nbsp;'}</div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Pekerjaan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">${data.pekerjaan_ayah}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Tidak Bekerja</td>
                    <td>4. Peternak</td>
                    <td>7. Pedagang Besar</td>
                    <td>10. Wirausaha</td>
                  </tr>
                  <tr>
                    <td>2. Nelayan</td>
                    <td>5. PNS</td>
                    <td>8. Pedagang Kecil</td>
                    <td>11. Buruh</td>
                  </tr>
                  <tr>
                    <td>3. Petani</td>
                    <td>6. Karyawan Swasta</td>
                    <td>9. Wiraswasta</td>
                    <td>12. Pensiunan</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Pendidikan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">${data.pendidikan_ayah}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Tidak Sekolah</td>
                    <td>5. SD/Sederajat</td>
                    <td>9. Paket B</td>
                    <td>13. D3</td>
                    <td>17. Non Formal</td>
                  </tr>
                  <tr>
                    <td>2. PAUD</td>
                    <td>6. SMP/Sederajat</td>
                    <td>10. Paket C</td>
                    <td>14. S1</td>
                    <td>18. Informal</td>
                  </tr>
                  <tr>
                    <td>3. TK/Sederajat</td>
                    <td>7. SMA/Sederajat</td>
                    <td>11. D1</td>
                    <td>15. S2</td>
                    <td>19. Lainnya</td>
                  </tr>
                  <tr>
                    <td>4. Putus SD</td>
                    <td>8. Paket A</td>
                    <td>12. D2</td>
                    <td>16. S3</td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Penghasilan Bulanan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">Rp. ${data.penghasilan_ayah}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Kurang dari Rp 500.000</td>
                    <td>4. Rp 2.000.000 - 4.999.999</td>
                  </tr>
                  <tr>
                    <td>2. Rp 500.000 - Rp 999.999</td>
                    <td>5. Rp 5.000.000 - Rp 20.000.000</td>
                  </tr>
                  <tr>
                    <td>3. Rp 1.000.000 - Rp 1.999.999</td>
                    <td>6. Lebih dari Rp 20.000.000</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="teks-formulir">
        <h2>DATA IBU KANDUNG (WAJIB DI ISI)</h2>
      </div>
      <table class="formulir-table">
        <tr>
          <td>p. Nama Ibu</td>
          <td>:
            <div class="kotak-output-medium">${data.nama_ibu}</div>
            Tahun Lahir:
            <div class="kotak-wrapper">
              ${(data.tahun_lahir_ibu || '').slice(0, 4).padEnd(4, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Berkebutuhan Khusus</td>
          <td>: 
            <div class="kotak-output-smaller">${data.kebutuhan_khusus_ibu}</div>
            <div class="kotak-output-small">${data.keterangan_kebutuhan_ibu || '&nbsp;'}</div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Pekerjaan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">${data.pekerjaan_ibu}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Tidak Bekerja</td>
                    <td>4. Peternak</td>
                    <td>7. Pedagang Besar</td>
                    <td>10. Wirausaha</td>
                  </tr>
                  <tr>
                    <td>2. Nelayan</td>
                    <td>5. PNS</td>
                    <td>8. Pedagang Kecil</td>
                    <td>11. Buruh</td>
                  </tr>
                  <tr>
                    <td>3. Petani</td>
                    <td>6. Karyawan Swasta</td>
                    <td>9. Wiraswasta</td>
                    <td>12. Pensiunan</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Pendidikan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">${data.pendidikan_ibu}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Tidak Sekolah</td>
                    <td>5. SD/Sederajat</td>
                    <td>9. Paket B</td>
                    <td>13. D3</td>
                    <td>17. Non Formal</td>
                  </tr>
                  <tr>
                    <td>2. PAUD</td>
                    <td>6. SMP/Sederajat</td>
                    <td>10. Paket C</td>
                    <td>14. S1</td>
                    <td>18. Informal</td>
                  </tr>
                  <tr>
                    <td>3. TK/Sederajat</td>
                    <td>7. SMA/Sederajat</td>
                    <td>11. D1</td>
                    <td>15. S2</td>
                    <td>19. Lainnya</td>
                  </tr>
                  <tr>
                    <td>4. Putus SD</td>
                    <td>8. Paket A</td>
                    <td>12. D2</td>
                    <td>16. S3</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Penghasilan Bulanan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">Rp. ${data.penghasilan_ibu}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Kurang dari Rp 500.000</td>
                    <td>4. Rp 2.000.000 - 4.999.999</td>
                  </tr>
                  <tr>
                    <td>2. Rp 500.000 - Rp 999.999</td>
                    <td>5. Rp 5.000.000 - Rp 20.000.000</td>
                  </tr>
                  <tr>
                    <td>3. Rp 1.000.000 - Rp 1.999.999</td>
                    <td>6. Lebih dari Rp 20.000.000</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="teks-formulir">
        <h2>DATA WALI</h2>
      </div>
      <table class="formulir-table">
        <tr>
          <td>q. Nama Wali</td>
          <td>:
            <div class="kotak-output-medium">${data.nama_wali}</div>
            Tahun Lahir:
            <div class="kotak-wrapper">
              ${(data.tahun_lahir_wali || '').slice(0, 4).padEnd(4, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Pekerjaan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">${data.pekerjaan_wali}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Tidak Bekerja</td>
                    <td>4. Peternak</td>
                    <td>7. Pedagang Besar</td>
                    <td>10. Wirausaha</td>
                  </tr>
                  <tr>
                    <td>2. Nelayan</td>
                    <td>5. PNS</td>
                    <td>8. Pedagang Kecil</td>
                    <td>11. Buruh</td>
                  </tr>
                  <tr>
                    <td>3. Petani</td>
                    <td>6. Karyawan Swasta</td>
                    <td>9. Wiraswasta</td>
                    <td>12. Pensiunan</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Pendidikan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">${data.pendidikan_wali}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Tidak Sekolah</td>
                    <td>5. SD/Sederajat</td>
                    <td>9. Paket B</td>
                    <td>13. D3</td>
                    <td>17. Non Formal</td>
                  </tr>
                  <tr>
                    <td>2. PAUD</td>
                    <td>6. SMP/Sederajat</td>
                    <td>10. Paket C</td>
                    <td>14. S1</td>
                    <td>18. Informal</td>
                  </tr>
                  <tr>
                    <td>3. TK/Sederajat</td>
                    <td>7. SMA/Sederajat</td>
                    <td>11. D1</td>
                    <td>15. S2</td>
                    <td>19. Lainnya</td>
                  </tr>
                  <tr>
                    <td>4. Putus SD</td>
                    <td>8. Paket A</td>
                    <td>12. D2</td>
                    <td>16. S3</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-indented">- Penghasilan</td>
          <td>
            <div class="transportasi-flex">
              : <div class="kotak-output-small-1">Rp. ${data.penghasilan_wali}</div>
              <div class="daftar-transportasi">
                <table>
                  <tr>
                    <td>*) 1. Kurang dari Rp 500.000</td>
                    <td>4. Rp 2.000.000 - 4.999.999</td>
                  </tr>
                  <tr>
                    <td>2. Rp 500.000 - Rp 999.999</td>
                    <td>5. Rp 5.000.000 - Rp 20.000.000</td>
                  </tr>
                  <tr>
                    <td>3. Rp 1.000.000 - Rp 1.999.999</td>
                    <td>6. Lebih dari Rp 20.000.000</td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="teks-formulir">
        <h2>DATA PERIODIK (WAJIB DI ISI)</h2>
      </div>
      <table class="formulir-table">
        <tr>
          <td class="td-first-middle">r. Tinggi Badan</td>
          <td class="td-middle">
            <div class="kolom-data-vertikal">
              <div class="kolom-data-horizontal">
                <span class="titikdua">:</span>
                <div class="kotak-wrapper">
                  ${(data.tinggi_badan || '').padStart(3, '\u00A0').split('').map(char =>
                    `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
                  ).join('')}
                </div>
                <span class="spangap">cm</span>
                <span class="spangap">v. Berat Badan:</span>
                <div class="kotak-wrapper">
                  ${(data.berat_badan || '').padStart(3, '\u00A0').split('').map(char =>
                    `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
                  ).join('')}
                </div>
                <span class="spangap">Kg</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>s. Jarak Tempat Tinggal ke Sekolah</td>
          <td>:
            <div class="kotak-output-small">${data.jarak_ke_sekolah}</div>
            <span class="spangap">2) Lebih dari 1 km sebutkan:</span>
            <div class="kotak-wrapper">
              ${(data.jarak_lebih || '').slice(0, 3).padStart(3, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
              <span class="spangap">km</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>t. Waktu Tempuh ke Sekolah</td>
          <td>:
            <div class="kotak-output-small">${data.waktu_tempuh}</div>
            <span class="spangap">2) Lebih dari 60 menit sebutkan:</span>
            <div class="kotak-wrapper">
              ${(() => {
                const waktu = (data.waktu_lebih || '').trim().slice(0, 3).padStart(3, '\u00A0');
                return waktu.split('').map(char =>
                  `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
              })()}
              <span class="spangap">Menit</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>u. Jumlah Saudara Kandung</td>
          <td>:
            <div class="kotak-wrapper">
              ${(data.jumlah_saudara || '').padStart(2, '\u00A0').split('').map(char =>
                `<span class="kotak-angka">${char === ' ' ? '&nbsp;' : char}</span>`
              ).join('')}
            </div>
          </td>
        </tr>
      </table>
      <div class="teks-formulir">
        <h2>DATA SEKOLAH ASAL (WAJIB DI ISI JIKA PINDAHAN ATU PERNAH SEKOLAH KELOMPOK BERMAIN)</h2>
      </div>
      <table class="formulir-table">
        <tr><td>v. Nama Lembaga</td><td>: <div class="kotak-output-wide">${data.nama_lembaga}</div></td></tr>
        <tr><td>w. Alamat Lembaga</td><td>: <div class="kotak-output-wide">${data.alamat_lembaga}</div></td></tr>
        <tr>
          <td class="label-indented">- Kelurahan / Kode Pos</td>
          <td>: <div class="kotak-output-wide">${data.kelurahanasal}</div></td>
        </tr>
        <tr>
          <td class="label-indented">- Kecamatan</td>
          <td>: <div class="kotak-output-wide">${data.kecamatanasal}</div></td>
        </tr>
        <tr><td>x. NPSN Lembaga</td><td>: <div class="kotak-output-wide">${data.npsn_lembaga}</div></td></tr>
      </table>
      <table>
        <tr><td>Informasi Tambahan</td><td>: ${data.informasi_tambahan}</td></tr>
      </table>
      <br><br>
      <div class="formulir-penutup">
        <div class="formulir-penutup-kiri">
          <div class="kotak-dokumen">
            Harap Dilampirkan:<br>
            - Foto Copy Kartu Keluarga 2 Lembar<br>
            - Foto Copy Akta Kelahiran 2 Lembar
          </div>
          <p class="catatan-penutup">
            * Yang bertanda tangan Orang Tua/Wali atau Siswa<br>
              bertanggung jawab secara hukum terhadap kebenaran data yang tercantum.
          </p>
        </div>
        <div class="formulir-penutup-kanan">
          <div class="tanggal-wali">
            ....................................., .......................... 20..<br>
            <span class="label-ttd">Wali Murid,</span>
          </div>
          <div class="ttd-wali">
            <br><br><br>
            ( ......................................................... )<br>
            <span class="label-ttd">Tanda Tangan & Nama Terang</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
