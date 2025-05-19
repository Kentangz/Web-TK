<?php

namespace App\Models\ProgramSekolah;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Output extends Model
{
    use HasFactory;

    protected $fillable = [
    'output_description',
    ];
}
