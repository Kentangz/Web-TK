<?php

namespace App\Models\Beranda;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;


class ImageTujuanStrategi extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
    ];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/beranda-images/tujuan-strategi/' . $image),
        );
    }
}
