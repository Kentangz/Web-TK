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

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/beranda/visi', VisiController::class);
Route::apiResource('/beranda/misi', MisiController::class);
Route::apiResource('/beranda/galleryvisi', ImageVisiMisiController::class);
Route::apiResource('/beranda/tujuan', TujuanController::class);
Route::apiResource('/beranda/strategi', StrategiController::class);
Route::apiResource('/beranda/gallerytujuan', ImageTujuanStrategiController::class);

Route::apiResource('/program-sekolah/kegiatanunggulan', KegiatanUnggulanController::class);
Route::apiResource('/program-sekolah/gallerykegiatan', GalleryKegiatanController::class);
Route::apiResource('/program-sekolah/kegiatanpenunjang', KegiatanPenunjangController::class);
