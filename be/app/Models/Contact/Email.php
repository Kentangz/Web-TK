<?php

namespace App\Models\Contact;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Email extends Model
{
    use HasFactory;

    protected $fillable=[
        'email'
    ];
}
