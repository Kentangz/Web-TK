<?php

namespace App\Models\Beranda;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Strategi extends Model
{
    use HasFactory;

    protected $fillable = [
        'strategi_description',
    ];
}
