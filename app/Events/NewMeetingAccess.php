<?php

namespace App\Events;

use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMeetingAccess implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $tipo_participacion;
    public $invite_code;
    /**
     * Create a new event instance.
     * Este evento es para que cuando una reunion sea creada o alguien se una a una reunion existente
     * se almacene los datos en la Tabla Juntas, en donde se almacena el usuario que se esta union, el id del codigo de
     * invitacion y de que fora este participa de la reunion, es decir, si es anfitrion o invitado.
     * @return void
     */
    public function __construct(User  $user, $tipo_participacion, $invite_code)
    {
        $this->user = $user->id;
        $this->tipo_participacion = $tipo_participacion;
        $this->invite_code = $invite_code;
    }

    public function broadcastOn()
    {
        // TODO: Implement broadcastOn() method.
        return new PresenceChannel('NewMeetingAccess');
    }

    public function broadcastAs(){
        return 'participants';
    }

}
