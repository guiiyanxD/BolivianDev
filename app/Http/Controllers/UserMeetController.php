<?php

namespace App\Http\Controllers;

use App\UserMeet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserMeetController extends Controller
{
    public function getMeetsByUser(){
        $user = Auth::user();
        $meets = UserMeet::where('user_id', $user->id)->get();
        return $meets;
    }
}
