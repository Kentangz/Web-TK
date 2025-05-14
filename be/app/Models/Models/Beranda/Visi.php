<?php

namespace App\Models\Models\Beranda;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Visi extends Model
{
    use HasFactory;

    protected $fillable = [
        'visi_description',
    ];
}
