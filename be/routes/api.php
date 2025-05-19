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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResources([
    '/beranda/visi' => VisiController::class,
    '/beranda/misi' => MisiController::class,
    '/beranda/galleryvisi' => ImageVisiMisiController::class,
    '/beranda/tujuan' => TujuanController::class,
    '/beranda/strategi' => StrategiController::class,
    '/beranda/gallerytujuan' => ImageTujuanStrategiController::class,

    '/programsekolah/kegiatanunggulan' => KegiatanUnggulanController::class,
    '/programsekolah/gallerykegiatan' => GalleryKegiatanController::class,
    '/programsekolah/kegiatanpenunjang' => KegiatanPenunjangController::class,
    '/programsekolah/output' => OutputController::class,
    '/programsekolah/kurikulumplus/suratpendek' => SuratPendekController::class,
    '/programsekolah/kurikulumplus/doa' => DoaController::class,
]);
