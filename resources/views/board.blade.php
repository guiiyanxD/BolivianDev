@extends('layouts.app')
@section('content')

   <div class="navbar" style="background-color: #36382e">
        <div class="align-items-baseline text-white">
            <h5 style="color: #DADAD9"> Codigo de invitacion: {{ $invite_code }} | Personas en la sesion: <span id="online"> </span> |
                {{--<a class="btn btn-dark" --}}{{--href="{{route('backup.update')}}"--}}{{-- onclick="getJson()" >Terminar sesion</a>--}}
                 {{'meetID: '. $meet_id}}
            </h5>

        </div>
   </div>

   <div class="container-fluid">
       <div class="row">
        <div class="col-lg-12 px-0" id="toolbar-container" ></div>
       </div>
       <div class="row">


           <div class="col-lg-8 px-0" id="paper">
           </div>

           <div class="col-lg-2 px-0" id="inspector">
           </div>
            <div class="col-lg-2 px-0" id="stencil">
            </div>




       </div>
   </div>


   @include('layouts.onlineCounter')
   @include('layouts.boardScripts')


@endsection
