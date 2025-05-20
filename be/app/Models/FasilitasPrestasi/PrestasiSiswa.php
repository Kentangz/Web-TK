<?php

namespace App\Models\FasilitasPrestasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PrestasiSiswa extends Model
{
    use HasFactory;

    protected $fillable = [
    'prestasi_siswa',
    ];
}
