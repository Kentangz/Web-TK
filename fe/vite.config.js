import { defineConfig } from "vite";

export default defineConfig({
    
    build:{
        rollupOptions:{
            input:{
                index:'index.html',
                guru:'guru.html',
                programsekolah:'program-sekolah.html',
                fasilitasprestasi:'fasilitas-prestasi.html',
                jadwal:'jadwal.html',
                pendaftaran:'pendaftaran.html',
                contact:'contact.html',


                admin:'admin-tkkb-sitihajar-karlos/dashboard.html',
                gurua:'admin-tkkb-sitihajar-karlos/guru.html',
                contacta:'admin-tkkb-sitihajar-karlos/contact.html',

                visimisi:'admin-tkkb-sitihajar-karlos/beranda/visi-misi.html',
                tujuanstrategi:'admin-tkkb-sitihajar-karlos/beranda/tujuan-strategi.html',
                galleryberanda:'admin-tkkb-sitihajar-karlos/beranda/gallery-beranda.html',

                kegiatanunggulan:'admin-tkkb-sitihajar-karlos/program-sekolah/kegiatan-unggulan.html',
                galeri:'admin-tkkb-sitihajar-karlos/program-sekolah/galeri-kegiatan.html',
                kegiatanpenunjang:'admin-tkkb-sitihajar-karlos/program-sekolah/kegiatan-penunjang.html',
                output:'admin-tkkb-sitihajar-karlos/program-sekolah/output.html',
                kurikulumplus:'admin-tkkb-sitihajar-karlos/program-sekolah/kurikulum-plus.html',

                fasilitas:'admin-tkkb-sitihajar-karlos/fasilitas-prestasi/fasilitas.html',
                galeri_fasilitas:'admin-tkkb-sitihajar-karlos/fasilitas-prestasi/galeri-fasilitas.html',
                prestasi:'admin-tkkb-sitihajar-karlos/fasilitas-prestasi/prestasi.html',
                galeri_prestasi:'admin-tkkb-sitihajar-karlos/fasilitas-prestasi/galeri-prestasi.html',

                jadwal_a_b:'admin-tkkb-sitihajar-karlos/jadwal/jadwal-a-b.html',
                kelompokbermain:'admin-tkkb-sitihajar-karlos/jadwal/kelompok-bermain.html',

            }
        }
    }

});
