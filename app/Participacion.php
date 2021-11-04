<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participacion extends Model
{
    protected $table = 'participaciones';

    protected $fillable = [
        'nombre','descripcion',
    ];

    public function Juntas(){
        return $this->hasMany(Junta::class);

    }
}
