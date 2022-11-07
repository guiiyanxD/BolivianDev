<?php

namespace App\Http\Controllers;

use App\Events\NewMeetingAccess;
use App\Invite;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Junges\InviteCodes\Http\Middlewares\ProtectedByInviteCodeMiddleware;
use Junges\InviteCodes\InviteCodes;
use function Sodium\increment;

class InviteController extends Controller
{


    /**
     * Store a newly created resource in storage.
     *
     * @params $max $fecha
     * @returns InviteCodes $code
     */
    public function store( $max = null, $fecha = null )
    {
        ///TODO:Verify if date is heigher or equal than now
        //$fecha = $fecha != null ? $this->verifyingDate($fecha) : null;


        //no tiene limites
        if ($max == null && $fecha == null )
        {
            $code = \Junges\InviteCodes\Facades\InviteCodes::create()
                ->save();

        //tiene limite y no tiene expiracion
        }
        else if($max != null && $fecha == null)
        {
            $code = \Junges\InviteCodes\Facades\InviteCodes::create()
                ->maxUsages($max)
                ->save();

        //ilimitado y tiene expiracion
        }
        else if($max == null && $fecha != null)
        {
            $code = \Junges\InviteCodes\Facades\InviteCodes::create()
                ->expiresAt($fecha)
                ->save();

        }
        else
        {
            $code = \Junges\InviteCodes\Facades\InviteCodes::create()
                ->maxUsages($max)
                ->expiresAt($fecha)
                ->save();
        }

        return $code;
    }

    /**
     * Method to increment the uses when a invite code is used
     * an register who used the code.
     */
    public function IncrementWhenCodeIsUsed(Request $request){
        $invite =  Invite::where('code',$request->invite_code)->first();
        if($invite->max_usages !=
            null){
            $invite->increment('uses',1);
        }

        event(new NewMeetingAccess(Auth::user(),2,$invite->id));

        return view('board',['invite_code'=>$invite->code]);
    }

    /**
     * This function look for an Invitation Code
     * @return bool
     */
    public function searchInvitationCode($inviteCode): bool
    {
        $invite =  Invite::where('code', $inviteCode)->first();
        if($invite != null)
        {
            return true;
        }
        return false;

    }

    /**
     * Get InviteCode by Invite Code
     * @param $inviteCode
     * @return mixed
     */
    public function getInvitation($inviteCode){
        return Invite::where('code', $inviteCode)->first();
    }

    public function canJoin($invite)
    {
        $dateVerified = ($invite->expires_at != null)
            ? $this->verifyingDate($invite->expires_at) : true;
        $usagesVerified = ($invite->max_usages != null)
            ? $this->verifyingUsages($invite) : true;

        return (($dateVerified || $usagesVerified) && $usagesVerified);
    }

    private function verifyingUsages($invite) : bool
    {
        if($invite->uses +1 <= $invite->max_usages)
        {
            $invite->uses = $invite->uses + 1;
            $invite->save();
            return true;
        }
        return false;
    }

    /**
     * @param $fechaExpiracion
     * @return bool
     */
    private function verifyingDate($fechaExpiracion) : bool
    {
        return now() <= $fechaExpiracion;
    }

}
