<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserMeet extends Model
{
    protected $table = 'users_meets';

    protected $fillable = [
        'user_id', 'meet_id', 'participation_type_id'
    ];
}
