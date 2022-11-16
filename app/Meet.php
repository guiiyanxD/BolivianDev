<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meet extends Model
{
    protected $table = 'meets';

    protected $fillable = [
        'invite_id','name','description', 'backup_id'
    ];

    public function Invite(){
        return $this->belongsTo(Invite::class, 'invite_id');
    }

    public function UserMeet(){
        return $this->hasMany(UserMeet::class, 'meet_id');
    }

    public function Backup(){
        return $this->belongsTo(Backup::class, 'backup_id');
    }
}
