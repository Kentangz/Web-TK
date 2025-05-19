<?php

namespace App\Models\ProgramSekolah;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class GalleryKegiatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'nama_kegiatan',
    ];

    public function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/program-sekolah-images/gallery-kegiatan/' . $image),
        );
    }
}
