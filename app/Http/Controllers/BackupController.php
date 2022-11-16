<?php

namespace App\Http\Controllers;

use App\Backup;
use App\Events\MovementEvent;
use App\Meet;
use Illuminate\Http\Request;

class BackupController extends Controller
{
    public function store(){
        return Backup::create([
            'bakcup' => ' ',
        ]);
    }

    /**
     * This method update the backup stored of the graph
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(Request $request){
        $backup = $this->getIdByMeetId($request->meet_id);
        $backup->backup = $request->json;
        $backup->save();


        $meetController = new MeetController();
        $meet = $meetController->getMeetById($request->meet_id);
        $this->load($meet);
        return response(200);
    }

    public function getIdByMeetId($meetId){
        $meet = Meet::where('id', $meetId)->first();
        return Backup::where('id', $meet->backup_id)->first();
    }

    public function load(Meet $meet){
//        return dd($meet);
        broadcast(new MovementEvent($meet));
        return response(200);
    }
}
