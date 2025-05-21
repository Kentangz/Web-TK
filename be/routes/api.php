<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Beranda\VisiController;
use App\Http\Controllers\Beranda\MisiController;
use App\Http\Controllers\Beranda\ImageVisiMisiController;   
use App\Http\Controllers\Beranda\TujuanController;
use App\Http\Controllers\Beranda\StrategiController;
use App\Http\Controllers\Beranda\ImageTujuanStrategiController;

use App\Http\Controllers\ProgramSekolah\KegiatanUnggulanController;
use App\Http\Controllers\ProgramSekolah\GalleryKegiatanController;
use App\Http\Controllers\ProgramSekolah\KegiatanPenunjangController;
use App\Http\Controllers\ProgramSekolah\OutputController;
use App\Http\Controllers\ProgramSekolah\KurikulumPlus\SuratPendekController;
use App\Http\Controllers\ProgramSekolah\KurikulumPlus\DoaController;
use App\Http\Controllers\ProgramSekolah\KurikulumPlus\HaditsController;

use App\Http\Controllers\FasilitasPrestasi\FasilitasController;
use App\Http\Controllers\FasilitasPrestasi\GalleryFasilitasController;
use App\Http\Controllers\FasilitasPrestasi\PrestasiGuruController;
use App\Http\Controllers\FasilitasPrestasi\PrestasiSiswaController;
use App\Http\Controllers\FasilitasPrestasi\GalleryController;

use App\Http\Controllers\Jadwal\TK\WaktuKegiatanController;
use App\Http\Controllers\Jadwal\TK\JadwalKelompokController;
use App\Http\Controllers\Jadwal\KB\WaktuKegiatankbController;
use App\Http\Controllers\Jadwal\KB\JadwalKegiatankbController;

use App\Http\Controllers\Contact\ContactPersonController;
use App\Http\Controllers\Contact\EmailController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResources([
    '/beranda/visi' => VisiController::class,
    '/beranda/misi' => MisiController::class,
    '/beranda/imagevisi' => ImageVisiMisiController::class,
    '/beranda/tujuan' => TujuanController::class,
    '/beranda/strategi' => StrategiController::class,
    '/beranda/imagetujuan' => ImageTujuanStrategiController::class,

    '/programsekolah/kegiatanunggulan' => KegiatanUnggulanController::class,
    '/programsekolah/gallerykegiatan' => GalleryKegiatanController::class,
    '/programsekolah/kegiatanpenunjang' => KegiatanPenunjangController::class,
    '/programsekolah/output' => OutputController::class,
    '/programsekolah/kurikulumplus/suratpendek' => SuratPendekController::class,
    '/programsekolah/kurikulumplus/doa' => DoaController::class,
    '/programsekolah/kurikulumplus/hadits' => HaditsController::class,

    '/fasilitasprestasi/fasilitas'=>FasilitasController::class,
    '/fasilitasprestasi/galleryfasilitas'=>GalleryFasilitasController::class,
    '/fasilitasprestasi/prestasiguru'=>PrestasiGuruController::class,
    '/fasilitasprestasi/prestasisiswa'=>PrestasiSiswaController::class,
    '/fasilitasprestasi/gallery'=>GalleryController::class,

    '/jadwal/waktukegiatantk'=>WaktuKegiatanController::class,
    '/jadwal/jadwalkelompoktk'=>JadwalKelompokController::class,
    '/jadwal/waktukegiatankb'=>WaktuKegiatankbController::class,
    '/jadwal/jadwalkelompokkb'=>JadwalKegiatankbController::class,

    '/contact/contactperson' =>ContactPersonController::class,
    '/contact/email' =>EmailController::class,
]);
