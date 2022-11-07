<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meet extends Model
{
    protected $table = 'meets';

    protected $fillable = [
        'invite_id'
    ];
}
