<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meet extends Model
{
    protected $table = 'meets';

    protected $fillable = [
        'invite_id','name','description'
    ];

    public function Invite(){
        return $this->belongsTo(Invite::class, 'invite_id');
    }

    public function UserMeet(){
        return $this->hasMany(UserMeet::class, 'meet_id');
    }
}
