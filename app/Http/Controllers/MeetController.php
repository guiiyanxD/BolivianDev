<?php

namespace App\Http\Controllers;

use App\Events\UserMeetAccess;
use App\Meet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeetController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeAsHost(Request $request)
    {
        $inviteController = new InviteController();
        $code = $inviteController->store($request->max, $request->fecha);

        $meet = Meet::create([
            'invite_id' => $code->id
        ]);
        event(new UserMeetAccess($meet, Auth::user(),1));
        return redirect()->route('board', ['invite_code'=> $code->code]);
    }

    public function storeAsGuest(Request $request)
    {
        $inviteController = new InviteController();

        $invite = $inviteController->getInvitation($request->invite_code);
        $meet = $this->searchMeetByInvitationCode($invite->id);

        $exist = $invite != null;
        $canJoin = $inviteController->canJoin($invite);
        if($canJoin && $exist)
        {
            event(new UserMeetAccess($meet, Auth::user(),2));
            return redirect()->route('board',['invite_code'=> $request->invite_code]) ;

        }
        return dd("No puedes unirte a esta reunion o esta no existe");
    }


    private function searchMeetByInvitationCode($inviteId)
    {
        return Meet::where('invite_id', $inviteId)->first();
    }

    /**
     * @param Request $code
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function joinToMeet(Request $code){
        return view('board',['invite_code'=>$code->invite_code]);

    }


}
