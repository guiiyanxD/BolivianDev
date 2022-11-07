<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
//    protected $table = 'participation_types';
    protected $table = 'participation_types';
    protected $fillable = [
        'name', 'description',
    ];
}
