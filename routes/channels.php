<?php

use App\Backup;
use App\Meet;
use App\UserMeet;
use Illuminate\Support\Facades\Auth;
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

Broadcast::channel('meet.{id}', function ($user, $meet) {
//    return dd($meet);
    $session = UserMeet::where([['user_meet', $meet->id],['user_id', auth()->user()->id]]);
//    $session = Meet::where('id','=', $meet->id);
//    if(($session)->count() > 0){
    if($session){
        return json_encode(Auth::user());
    }
//    return json_encode($session);
});
/**
 * En un channel siempre el primer parametro sera el del usuario que se esta intentado
 * autenticar y asi como una ruta http, los parametros enviados podran usarse en el callback,
 * por lo tanto, los parametros que le pase, podre usarlos dentro del
 * proceso de autenticacion
 */
Broadcast::channel('movsFromMeet.{meet_id}', function($user, $meet_id){
    $session = UserMeet::where([['meet_id', $meet_id],['user_id', auth()->user()->id]])->get();
    $meet = Meet::where('id', $meet_id)->first();
    $backup = Backup::where('id', $meet->backup_id)->first();
    if($session){
        return $backup;
    }
});


/*Broadcast::channel('test', function ($user) {
    return true;
});*/
