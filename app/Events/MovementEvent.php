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

class MovementEvent implements ShouldBroadcast
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
        return new PresenceChannel('boardChannel');
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs(){
        //
    }
}
