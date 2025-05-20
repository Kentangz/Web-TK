<?php

namespace App\Models\FasilitasPrestasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PrestasiGuru extends Model
{
    use HasFactory;

    protected $fillable = [
    'prestasi_guru',
    ];
}

