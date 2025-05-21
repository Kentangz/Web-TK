<?php

namespace App\Models\ProgramSekolah;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class KegiatanUnggulan extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kegiatan',
        'icon',
        'deskripsi_kegiatan',
    ];

    public function icon():Attribute
    {
        return Attribute::make(
            get: fn ($icon) => asset('/storage/program-sekolah-images/kegiatan-unggulan/' . $icon),
        );
    }
}