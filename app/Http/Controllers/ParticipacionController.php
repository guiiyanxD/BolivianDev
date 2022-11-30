<?php

namespace App\Http\Controllers;

use App\Participacion;
use App\Participation;
use App\UserMeet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ParticipacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $participacion = Participacion::all();
        return view('participaciones.index',['participaciones'=>$participacion]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('participaciones.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $participacion = new Participacion();
        $participacion->nombre = $request->nombre;
        $participacion->descripcion = $request->descripcion;

        return redirect()->route('participaciones.index');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $participacion = Participacion::findOrFail($id);
        return view('particiaciones.show',['participacion'=>$participacion]);
    }


    /**
     * This function returns true if the authenticated user is the host
     * of the given meet
     * @param $meet
     * @return boolean
     */
    public function isHost($meet): bool
    {
        $query = UserMeet::where([['meet_id', $meet->id],['user_id', Auth::user()->id]])->first();
        return $query != null && $query->participation_type_id == 1;

    }

    public function isGuest($meet): bool
    {
        $query = UserMeet::where([['meet_id', $meet->id],['user_id', Auth::user()->id]])->first();
        return $query != null && $query->participation_type_id == 2;
    }

    public function addUserEntries($meet){
        $query = UserMeet::where([['meet_id', $meet->id],['user_id', Auth::user()->id]])->first();
        $query->entriesQty++ ;
        $query->save();
//        return dd($query);

    }


}
