<?php

namespace App\Models\Jadwal\TK;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;

class JadwalKelompok extends Model
{
    use HasFactory;

    protected $fillable = [
        'icon',
        'deskripsi',
    ];

    public function icon():Attribute
    {
        return Attribute::make(
            get: fn ($icon) => asset('/storage/jadwal-icons/tk/' . $icon),
        );
    }
}
