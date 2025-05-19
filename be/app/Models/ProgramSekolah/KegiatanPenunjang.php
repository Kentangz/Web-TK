<?php

namespace App\Models\ProgramSekolah;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 


class KegiatanPenunjang extends Model
{
    use HasFactory;

    protected $fillable=[
        'kegiatan_penunjang'
    ];
}
