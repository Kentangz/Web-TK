<?php

namespace App\Models\Contact;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Instagram extends Model
{
    use HasFactory;

    protected $fillable = [
        'ig_name'
    ];
}
