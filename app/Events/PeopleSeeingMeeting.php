<?php

namespace App\Events;

use App\Meet;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PeopleSeeingMeeting implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $meet;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Meet $meet)
    {
        $this->meet = $meet;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('meet.'. $this->meet->id);
    }

    /*
    public function broadcastAs(){
        return 'participants';
    }*/
}
