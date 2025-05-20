<?php

namespace App\Models\Jadwal\TK;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WaktuKegiatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'hari',
        'jam'
    ];
}
