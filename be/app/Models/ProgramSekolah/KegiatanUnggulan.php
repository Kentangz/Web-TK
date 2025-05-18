<?php

namespace App\Models\ProgramSekolah;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class KegiatanUnggulan extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'deskripsi_kegiatan',
    ];

    public function image():Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/program-sekolah-images/kegiatan-unggulan/' . $image),
        );
    }
}