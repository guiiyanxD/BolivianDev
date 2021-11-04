<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{

    protected $fillable = [
        'code','max_usages','to','uses','expires_at'
    ];

    public function Junta(){
        return $this->belongsTo(Junta::class);
    }
}
