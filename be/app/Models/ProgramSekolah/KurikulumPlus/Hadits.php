<?php

namespace App\Models\ProgramSekolah\KurikulumPlus;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Hadits extends Model
{
    use HasFactory;

    protected $fillable = [
    'hadits_name',
    ];
}
