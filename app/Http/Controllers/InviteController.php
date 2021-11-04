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
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        if ($request->max == null && $request->fecha == null ){ //no tiene limites
            $invite_code =  \Junges\InviteCodes\Facades\InviteCodes::create()
                ->save();
        }else if($request->max != null && $request->fecha == null){ //tiene limite y no tiene expiracion
            $invite_code = \Junges\InviteCodes\Facades\InviteCodes::create()
                ->maxUsages($request->max)
                ->save();
        }else if($request->max == null && $request->fecha != null){ //ilimitado y tiene expiracion
            $invite_code = \Junges\InviteCodes\Facades\InviteCodes::create()
                ->expiresAt($request->fecha)
                ->save();
        }else{
            $invite_code = \Junges\InviteCodes\Facades\InviteCodes::create()
                ->maxUsages($request->max)
                ->expiresAt($request->fecha)
                ->save();
        }
        //return dd(Auth::user()->getAuthIdentifier());
        event(new NewMeetingAccess(Auth::user(),1,$invite_code->id));

        return redirect()->route('board',['invite_code'=>$invite_code]);
    }

    /**
     * Method to increment the uses when a invite code is used
     * an register who used the code.
     */
    public function IncrementWhenCodeIsUsed(Request $request){
        $invite =  Invite::where('code',$request->invite_code)->first();
        if($invite->max_usages != null){
            $invite->increment('uses',1);
        }

        event(new NewMeetingAccess(Auth::user(),2,$invite->id));

        return view('board',['invite_code'=>$invite->code]);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
