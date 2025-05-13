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
                visimisi:'admin-tkkb-sitihajar-karlos/visi-misi.html',
            }
        }
    }

});
