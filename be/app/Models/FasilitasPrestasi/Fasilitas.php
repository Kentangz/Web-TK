<?php

namespace App\Models\FasilitasPrestasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fasilitas extends Model
{
    use HasFactory;

    protected $fillable = [
    'fasilitas_name',
    ];
}
