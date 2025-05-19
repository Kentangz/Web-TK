<?php

namespace App\Models\ProgramSekolah\KurikulumPlus;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Doa extends Model
{
    use HasFactory;

    protected $fillable = [
    'doa_name',
    ];
}
