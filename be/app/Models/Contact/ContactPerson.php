<?php

namespace App\Models\Contact;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactPerson extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor',
        'nama'
    ];
}
