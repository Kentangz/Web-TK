<?php

namespace App\Models\Guru;

use Illuminate\Database\Eloquent\Model;
use  Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DaftarGuru extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'nama',
        'jabatan',
        'ttl',
        'nomor',
    ];

     protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($image) => asset('/storage/guru-images/' . $image),
        );
    }
}
