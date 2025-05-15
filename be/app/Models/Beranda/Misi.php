<?php

namespace App\Models\Beranda;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Misi extends Model
{
    use HasFactory;

    protected $fillable = [
        'misi_description',
    ]
