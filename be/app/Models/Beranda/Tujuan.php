<?php

namespace App\Models\Beranda;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tujuan extends Model
{
    use HasFactory;

    protected $fillable = [
        'tujuan_description',
    ];
}
