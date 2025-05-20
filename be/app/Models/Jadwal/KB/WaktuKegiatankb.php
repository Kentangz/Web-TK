<?php

namespace App\Models\Jadwal\KB;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WaktuKegiatankb extends Model
{
    use HasFactory;

    protected $fillable = [
        'hari',
        'jam'
    ];
}
