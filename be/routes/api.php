<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Beranda\VisiController;
use App\Http\Controllers\Beranda\MisiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/beranda/visi', VisiController::class);
Route::apiResource('/beranda/misi', MisiController::class);
Route::apiResource('/beranda/galleryvisi', MisiController::class);
Route::apiResource('/beranda/gallerytujuan', MisiController::class);

