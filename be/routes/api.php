<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Beranda\VisiController;
use App\Http\Controllers\Beranda\MisiController;
use App\Http\Controllers\Beranda\ImageVisiMisiController;   
use App\Http\Controllers\Beranda\TujuanController;
use App\Http\Controllers\Beranda\StrategiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/beranda/visi', VisiController::class);
Route::apiResource('/beranda/misi', MisiController::class);
Route::apiResource('/beranda/galleryvisi', ImageVisiMisiController::class);
Route::apiResource('/beranda/tujuan', TujuanController::class);
Route::apiResource('/beranda/strategi', StrategiController::class);


