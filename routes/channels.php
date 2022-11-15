<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('meet.{id}', function ($meet) {
//    return dd($meet);
    $session = \App\UserMeet::where([['user_meet', $meet->id],['user_id', auth()->user()->id]]);
    if($session){
        return json_encode(\Illuminate\Support\Facades\Auth::user());
    }
//    return json_encode($session);
});
