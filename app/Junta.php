<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Junta extends Model
{
    protected $table = 'juntas';
    protected $fillable = [
        'user_id','codigo_id','tipo_participacion_id'
    ];

    public function Users(){
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function Participacion(){
        return $this->belongsTo(Participacion::class,'tipo_participacion_id','id');
    }

    public function Invites(){
        return $this->belongsTo(\Junges\InviteCodes\Http\Models\Invite::class,'codigo_id','id');

    }

}
