<?php

namespace App\Http\Controllers;

use App\Events\PeopleSeeingMeeting;
use App\Events\UserMeetAccess;
use App\Meet;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeetController extends Controller
{

    /**
     * Store a newly meet createby first time.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeAsHost(Request $request)
    {
        $fecha = Carbon::parse($request->fecha)->endOfDay();

//        try {
            if($fecha > now()){
                $inviteController = new InviteController();
                $code = $inviteController->store($request->max, $fecha);
                $backupController = new BackupController();
                $bakcup = $backupController->store();


                $meet = Meet::create([
                    'invite_id' => $code->id,
                    'backup_id' => $bakcup->id,
                    'name' => $request->name,
                    'description' => $request->description,
                ]);

                event(new UserMeetAccess($meet, Auth::user(), 1));
                broadcast(new PeopleSeeingMeeting($meet));
                return redirect()->route('board', ['invite_code' => $code->code,'meet_id'=> $meet->id]);
            }else{
                return redirect()->route('home')->with(['message' => "Asegurese de completar todos los campos requeridos"]);

            }

        /*
        }catch (\Exception $e){
            return redirect()->route('home')->with(['message' => $e]);
            return redirect()->route('home')->with(['message' => "Asegurese de completar todos los campos requeridos"]);
        }*/
    }

    /**
     * Join to an already created meet as a guests
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|void
     */
    public function storeAsGuest(Request $request)
    {
        try {
            $inviteController = new InviteController();

            $invite = $inviteController->getInvitation($request->invite_code);
            $meet = $this->searchMeetByInvitationCode($invite->id);

            $exist = $invite != null;
            $canJoin = $inviteController->canJoin($invite);
            if($canJoin && $exist)
            {

                $participationController = new ParticipacionController();
                $isHost = $participationController->isHost($meet);
                $isGuest = $participationController->isGuest($meet);


                $backupController = new BackupController();
                $backup = $backupController->getIdByMeetId($meet->id);
                $json = $backup->backup;

                if(!$isHost && !$isGuest ){
                    event(new UserMeetAccess($meet, Auth::user(),2));
                }else{
                    $participationController->addUserEntries($meet);
                }
                broadcast(new PeopleSeeingMeeting($meet));

                if($json != Null){
                    return redirect()->route('board',['invite_code'=> $request->invite_code,'meet_id'=> $meet->id, 'json'=>$json]) ;
                }
                return redirect()->route('board',['invite_code'=> $request->invite_code,'meet_id'=> $meet->id]) ;

            }
        }catch (\Exception $e){
            return redirect()->route('home')->with('message',"Al parecer ha habido un error con tu codigo de invitación.");
        }
    }

    /**
     * get the Meet Object by its ID
     * @param $id
     * @return mixed
     */
    public function getMeetById($id){
        return Meet::where('id', $id)->first();
    }

    /**
     * Update the attrs of a meet and its code invitation
     * @param $id
     * @param $newName
     * @param $newDescription
     * @return mixed
     */
    public function update($id, $newName, $newDescription){
        $meet = $this->getMeetById($id);
        return $meet->update([
            'name' => $newName,
            'description' => $newDescription,
        ]);
    }

    private function searchMeetByInvitationCode($inviteId)
    {
        return Meet::where('invite_id', $inviteId)->first();
    }

    /**
     * Main function to join to a meet
     * @param Request $code
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function joinToMeet(Request $code){
        if($code->has('json')){
            return view('board',['invite_code'=>$code->invite_code,'meet_id'=>$code->meet_id, 'json'=> $code->json]);
        }else{
            return view('board',['invite_code'=>$code->invite_code,'meet_id'=>$code->meet_id]);
        }

    }



}
