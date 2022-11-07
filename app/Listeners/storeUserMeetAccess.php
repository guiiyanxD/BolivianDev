<?php

namespace App\Listeners;

use App\Events\UserMeetAccess;
use App\UserMeet;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class storeUserMeetAccess
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
     * @param  UserMeetAccess  $event
     * @return void
     */
    public function handle(UserMeetAccess $event)
    {

        return UserMeet::create([
            'user_id' => $event->user->id,
            'meet_id' => $event->meet->id,
            'participation_type_id' => $event->participation_type,
            'created_at' => now(),
            'updated_at' => now(),

        ]);
    }
}
