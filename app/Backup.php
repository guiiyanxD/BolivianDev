<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    protected $table = 'backup';

    protected $fillable = [
        'backup'
    ];

    public function Meet(){
        return $this->hasOne( Meet::class,'backup_id');
    }
}
