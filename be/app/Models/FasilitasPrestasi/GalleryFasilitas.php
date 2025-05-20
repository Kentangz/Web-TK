<?php

namespace App\Models\FasilitasPrestasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class GalleryFasilitas extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
    ];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/fasilitas-prestasi-images/fasilitas/' . $image),
        );
    }
}
