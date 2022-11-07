<?php

namespace App\Events;

use App\Meet;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserMeetAccess
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $meet;
    public $user;
    public $participation_type;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Meet $meet, User $user, $participation_type)
    {
        $this->meet = $meet;
        $this->user = $user;
        $this->participation_type = $participation_type;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
