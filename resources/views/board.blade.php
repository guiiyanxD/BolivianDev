@extends('layouts.app')
@section('content')

   <div class="navbar" style="background-color: #36382e">
        <div class="align-items-baseline text-white">
            <h5 style="color: #DADAD9"> Codigo de invitacion: {{ $invite_code }} | Personas en la sesion: <span id="online"> </span> |
                <a class="btn btn-dark" {{--href="{{route('backup.update')}}"--}} onclick="getJson()" >Terminar sesion</a>
                | {{'meetID: '. $meet_id}}
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
   <script>



       const meetID = {{$meet_id}};

       graph.on('change:position', function (){
           getJson(  JSON.stringify(graph.toJSON()) );
       });

       graph.on('change:attrs', function(){
           getJson(  JSON.stringify(graph.toJSON()) );
       });

       graph.on('add', function(){
           getJson( JSON.stringify(graph.toJSON()) );
       });

       graph.on('remove', function(){
           getJson( JSON.stringify(graph.toJSON()) );
       });

       function getJson($jsonPar){
           var jsonString = $jsonPar ;
           $.ajax({
               type:"Put",
               url:"meet/backup/update",
               data:{
                   json: jsonString,
                   meet_id: meetID,
               },
               /*success: function(){
                   loadJson();
               },*/
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               },
           });
       }

       window.Echo.join('movFromMeet.' + meetID)
           .listen('MovementEvent',(e) => {
               console.log("llegue aqui" + e.id);
               // updateFromJson($backup);
           });

       function updateFromJson($backup){
           console.log("updateFromJson llego aqui");
            graph.fromJSON(JSON.parse($backup));
       }


   </script>

@endsection
