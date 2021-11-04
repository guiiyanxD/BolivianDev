<?php

namespace App\Listeners;

use App\Events\NewMeetingAccess;
use App\Junta;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SaveDataToPivotTable
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  NewMeetingAccess  $event
     * @return void
     */
    public function handle(NewMeetingAccess $event)
    {
        $junta = New Junta();
        $junta->user_id = $event->user;
        $junta->tipo_participacion_id = $event->tipo_participacion;
        $junta->codigo_id = $event->invite_code;
        $junta->save();

    }
}
