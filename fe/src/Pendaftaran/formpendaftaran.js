export function createFormPendaftaranHTML() {
  return `
    <h2>Formulir Pendaftaran</h2>
    <form id="formPendaftaran">
    <h1>Data Diri :</h1>
        <label>Nama Lengkap Anak: <input type="text" name="nama" required placeholder="Masukan Nama..."></label><br>
        <label>Jenis Kelamin:
            <select name="gender">
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
            </select>
        </label><br>
        <label>NISN: <input type="text" name="nisn" required placeholder="Masukan NISN..."></label><br>
        <label>No. Induk Kependudukan (NIK): <input type="text" name="nik" required placeholder="Masukan NIK..."></label><br>
        <label>Tempat Lahir: <input type="text" name="tempat_lahir" required placeholder="Masukan Tempat Lahir..."></label><br>
        <label>Tanggal Lahir: <input type="date" name="tgl_lahir" required></label><br>
        <label>Agama: <input type="text" name="agama" required placeholder="Contoh: Masukan Agama..."></label><br>
        <label>Berkebutuhan Khusus:
            <select name="kebutuhan_khusus">
                <option value="Tidak">Tidak</option>
                <option value="Ya">Ya</option>
            </select>
        </label><br>
        <label>Alamat Tempat Tinggal: <input type="text" name="alamattempattinggal" required placeholder="Masukan Alamat dan Tempat Tinggal..."></label><br>
        <div class="row-group-horizontal">
            <div class="form-horizontal dusun">
                <label for="dusun">Dusun:</label>
                <input type="text" name="dusun" id="dusun" required placeholder="Masukan Dusun...">
            </div>
            <div class="form-horizontal rt">
                <label for="rt">RT:</label>
                <input type="text" name="rt" id="rt" required placeholder="Masukan RT...">
            </div>
            <div class="form-horizontal rw">
                <label for="rw">RW:</label>
                <input type="text" name="rw" id="rw" required placeholder="Masukan RW...">
            </div>
        </div>
        <div class="form-row">
            <div class="form-col flex-2">
                <label class="side-label">
                    <span class="label-text">Kelurahan:</span>
                    <input class="side-input" type="text" name="kelurahan" placeholder="Masukan Kelurahan...">
                </label>
            </div>
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text small">Kode Pos:</span>
                    <input class="side-input" type="text" name="kode_pos" placeholder="Kode Pos...">
                </label>
            </div>
        </div>
        <label class="side-label">
            <span class="label-text">Kecamatan:</span>
            <input class="side-input" type="text" name="kecamatan" required placeholder="Masukan Kecamatan...">
        </label><br>
        <label class="side-label">
            <span class="label-text">Kabupaten/Kota:</span>
            <input class="side-input" type="text" name="kota" required placeholder="Masukan Kabupaten/Kota...">
        </label><br>
        <label class="side-label">
            <span class="label-text">Provinsi:</span>
            <input class="side-input" type="text" name="provinsi" required placeholder="Masukan Provinsi...">
        </label><br>

        <label>Alat Transportasi ke Sekolah: <input type="text" name="transportasi" required placeholder="Masukan Alat Transportasi..."></label><br>
        <div class="form-row">
            <div class="form-col flex-2">
                <label class="side-label">
                <div class="label-text small tgl">Jenis Tinggal:</div>
                <input type="text" name="jenis_tinggal" class="side-input" required placeholder="Masukan Jenis Tinggal...">
                </label>
            </div>
        </div>

        <!-- No Telepon Rumah dan No HP -->
        <div class="form-row">
            <div class="form-col flex-1">
                <label class="side-label">
                <span class="label-text wide">No Telepon Rumah:</span>
                <input class="side-input" type="text" name="telp_rumah" placeholder="Masukan Telepon Rumah...">
                </label>
            </div>
            <div class="form-col flex-1">
                <label class="side-label">
                <span class="label-text small">No HP:</span>
                <input class="side-input" type="text" name="no_hp" required placeholder="Masukan No HP...">
                </label>
            </div>
        </div>

        <!-- Email pribadi -->
        <div class="form-row">
            <div class="form-col flex-2">
                <label class="side-label">
                <span class="label-text">Email Pribadi:</span>
                <input class="side-input" type="email" name="email" required placeholder="Masukan Email Pribadi...">
                </label>
            </div>
        </div>

        <!-- Apakah Penerima KPS dan No KPS -->
        <div class="form-row">
            <div class="form-col flex-1">
                <label class="side-label">
                <span class="label-text">Penerima KPS:</span>
                <select class="side-input" name="penerima_kps">
                    <option value="Tidak">Tidak</option>
                    <option value="Ya">Ya</option>
                </select>
                </label>
            </div>
            <div class="form-col flex-1">
                <label class="side-label">
                <span class="label-text small">No KPS:</span>
                <input class="side-input" type="text" name="no_kps" placeholder="Masukan Nomor KPS...">
                </label>
            </div>
        </div>
        <label>Kewarganegaraan: <input type="text" name="kewarganegaraan" required placeholder="Masukan Kewarganegaraan..."></label><br>
        <h1>Data Ayah Kandung  (wajib diisi) :</h1>
        <label>Nama Ayah: <input type="text" name="nama_ayah" required placeholder="Masukan Nama Lengkap..."></label><br>
        <div class="form-row">
            <!-- Tahun Lahir -->
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text wide">Tahun Lahir :</span>
                    <input type="text" name="tahun_lahir_ayah" id="tahun_lahir_ayah" placeholder="Masukkan Tahun Lahir..." class="side-input" required>
                </label>
            </div>
        </div>

        <div class="form-row">
            <!-- Berkebutuhan Khusus -->
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text medium">Berkebutuhan Khusus :</span>
                    <select class="side-input" name="kebutuhan_khusus_ayah">
                        <option value="Tidak">Tidak</option>
                        <option value="Ya">Ya</option>
                    </select>
                </label>
            </div>

            <!-- Input tambahan jika Ya -->
            <div class="form-col flex-1">
                <label class="side-label">
                <input class="side-input" type="text" name="keterangan_kebutuhan_ayah" placeholder="Masukkan Kebutuhan Khusus...">
                </label>
            </div>
        </div>

        <label>Pekerjaan Ayah: <input type="text" name="pekerjaan_ayah" required placeholder="Masukan Pekerjaan... "></label><br>
        <label>Pendidikan Ayah: <input type="text" name="pendidikan_ayah" required placeholder="Masukan Pendidikan... "></label><br>
        <label>Penghasilan Bulanan Ayah: 
        <input type="text" name="penghasilan_ayah" required placeholder="Rp. "></label><br>
        <h1>Data Ibu Kandung  (wajib diisi) :</h1>
        <label>Nama Ibu: <input type="text" name="nama_ibu" required placeholder="Masukan Nama Lengkap..."></label><br>
        <div class="form-row">
            <!-- Tahun Lahir Ibu -->
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text wide">Tahun Lahir :</span>
                    <input type="text" name="tahun_lahir_ibu" id="tahun_lahir_ibu" placeholder="Masukkan Tahun Lahir..." class="side-input" required>
                </label>
            </div>
        </div>

        <div class="form-row">
            <!-- Berkebutuhan Khusus Ibu -->
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text medium">Berkebutuhan Khusus :</span>
                    <select class="side-input" name="kebutuhan_khusus_ibu">
                        <option value="Tidak">Tidak</option>
                        <option value="Ya">Ya</option>
                    </select>
                </label>
            </div>

            <!-- Input tambahan jika Ya -->
            <div class="form-col flex-1">
                <label class="side-label">
                    <input class="side-input" type="text" name="keterangan_kebutuhan_ibu" placeholder="Masukkan Kebutuhan Khusus...">
                </label>
            </div>
        </div>
        <label>Pekerjaan Ibu: <input type="text" name="pekerjaan_ibu" required placeholder="Masukan Pekerjaan..."></label><br>
        <label>Pendidikan Ibu: <input type="text" name="pendidikan_ibu" required placeholder="Masukan pendidikan..."></label><br>
        <label>Penghasilan Bulanan Ibu: <input type="text" name="penghasilan_ibu" required placeholder="Rp."></label><br>
        <h1>Data Wali  :</h1>
        <label>Nama Wali: <input type="text" name="nama_wali" placeholder="Masukan Nama Lengkap..."></label><br>
        <label>Tahun Lahir Wali: <input type="text" name="tahun_lahir_wali" placeholder="Masukan Tahun Lahir..."></label><br>
        <label>Pekerjaan Wali: <input type="text" name="pekerjaan_wali" placeholder="Masukan Pekerjaan..."></label><br>
        <label>Pendidikan Wali: <input type="text" name="pendidikan_wali" placeholder="Masukan Pendidikan..."></label><br>
        <label>Penghasilan Wali: <input type="text" name="penghasilan_wali" placeholder="Rp."></label><br>
        <!-- Baris Tinggi & Berat Badan -->
        <h1>DATA PERIODIK (WAJIB DI ISI)</h1>
        <div class="form-row">
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text">Tinggi Badan :</span>
                    <input type="text" name="tinggi_badan" class="side-input" placeholder="CM" required>
                </label>
            </div>
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text">Berat Badan :</span>
                    <input type="text" name="berat_badan" class="side-input" placeholder="KG" required>
                </label>
            </div>
        </div>

        <!-- Baris Jarak ke Sekolah & Jika > 1 km -->
        <div class="form-row">
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text wide">Jarak tempat tinggal sekolah :</span>
                    <input type="text" name="jarak_ke_sekolah" class="side-input" placeholder="Masukkan Jarak..." required>
                </label>
            </div>
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text big">Lebih dari 1 km sebutkan :</span>
                    <input type="text" name="jarak_lebih" class="side-input" placeholder="KM">
                </label>
            </div>
        </div>

        <!-- Baris Waktu Tempuh & Jika > 60 menit -->
        <div class="form-row">
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text wide">Waktu Tempuh Berangkat sekolah :</span>
                    <input type="text" name="waktu_tempuh" class="side-input" placeholder="Masukkan Waktu..." required>
                </label>
            </div>
            <div class="form-col flex-1">
                <label class="side-label">
                    <span class="label-text big">Lebih dari 60 Menit sebutkan :</span>
                    <input type="text" name="waktu_lebih" class="side-input" placeholder="Menit">
                </label>
            </div>
        </div>

        <!-- Baris Jumlah Saudara Kandung -->
        <div class="form-row">
            <div class="form-col flex-2">
                <label class="side-label">
                   <span class="label-text big">Jumlah Saudara Kandung :</span>
                    <select name="jumlah_saudara" class="side-input" required>
                        <option value="">Pilih Jumlah Saudara...</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                    </select>
                </label>
            </div>
        </div>
        <h1>Data Sekolah Asal (Wajib di isi jika pindahan atau pernah sekolah kelompok bermain)</h1>
        <label>Nama Lembaga: <input type="text" name="nama_lembaga" placeholder="Masukan Nama Lembaga..."></label><br>
        <label>Alamat Lembaga: <input type="text" name="alamat_lembaga" placeholder="Masukan Alamat..."></label><br>
        <label>Kelurahan/Desa: <input type="text" name="kelurahanasal" placeholder="Masukan Kelurahan..."></label><br>
        <label>Kecamatan: <input type="text" name="kecamatanasal" placeholder="Masukan Kecamatan..."></label><br>
        <label>NPSN Lembaga: <input type="text" name="npsn_lembaga" placeholder="Masukan Lembaga..."></label><br>
        <div><h1>Informasi Tambahan</h1></div>
        <label>Pilih Program Sekolah:
            <select name="informasi_tambahan" required>
                <option value="">-- Pilih Salah Satu --</option>
                <option value="Masuk TK AB">Masuk TK AB</option>
                <option value="Masuk KB">Masuk KB</option>
            </select>
        </label><br>
        <!-- Tombol Ekstrak PDF -->
        <button type="submit" class="btn-pdf">
        Ekstrak PDF
        <img src="public/pdf.svg" alt="PDF Icon" class="icon-btn">
        </button>

        <!-- Teks keterangan -->
        <p>*Jika ingin mengisi secara manual, dapat mengunduh formulir berikut:</p>

        <!-- Tombol Unduh PDF Manual -->
        <div id="scrollToUnduh">
            <button class="btn-pdf" onclick="window.open('Formulir_manual.pdf', '_blank')">
                Unduh PDF
                <img src="public/download.svg" alt="Download Icon" class="icon-btn">
            </button>
        </div>

        <div class="form-info-container">
            <!-- Panduan Pengisian Formulir -->
            <div class="form-guide">
                <h3>Panduan pengisian formulir :</h3>
                <ol>
                <li>Formulir pendaftaran di atas dapat diisi secara online maupun manual.</li>
                <li>Jika mengisi formulir secara online, data yang sudah diisi akan diekstrak atau diubah ke dalam bentuk PDF untuk keperluan administrasi. Setelah mengisi, harap mencetak formulir tersebut dengan ukuran F4.</li>
                <li>Formulir pendaftaran di atas hanya akan diekstrak atau diubah ke dalam bentuk PDF. Untuk pendaftaran lebih lanjut, dapat menghubungi kontak kami.</li>
                <li>Jika ingin mengisi formulir secara manual, pengguna dapat mengunduh formulir kosong dengan menekan tombol "Unduh PDF" di atas, kemudian mencetak dan mengisi secara tulisan tangan.</li>
                <li>Harap isi formulir pendaftaran dengan sebaik-baiknya.</li>
                <li>Untuk informasi lebih lanjut, dapat menghubungi kontak kami.</li>
                </ol>
            </div>
            <!-- Berkas -->
            <div class="form-docs">
                <h3>Berkas yang diserahkan ke TK & KB Siti Hajar :</h3>
                <ol>
                <li>Hasil cetak/print formulir pendaftaran</li>
                <li>Fotocopy akte kelahiran siswa/siswi</li>
                <li>Fotocopy Kartu Keluarga</li>
                </ol>
            </div>
        </div>
        
    </form>
    
    `;
}


