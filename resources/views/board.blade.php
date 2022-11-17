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
   <script type="text/javascript">




       const meetID = {{$meet_id}};

       /*
       graph.on('change:position', function (){
           console.log("change target");
           getJson(  JSON.stringify(graph.toJSON()) );
       });*/

       paper.on('cell:pointerup change:position', function (cell) {
           getJson(  JSON.stringify(graph.toJSON()) );
           updateFromJson();
       });

       paper.on('change:attrs', function(){
           getJson(  JSON.stringify(graph.toJSON()) );
           updateFromJson();

       });


       paper.on('element:add', function(){
           getJson( JSON.stringify(graph.toJSON()) );
           updateFromJson();

       });

       paper.on('element:remove', function(){
           getJson( JSON.stringify(graph.toJSON()) );
           updateFromJson();
       });

       /*graph.on('all', function(eventName, cell) {
           getJson( JSON.stringify(graph.toJSON()) );
           console.log(arguments);
       });*/

       function getJson($jsonPar){
           $.ajax({
               type:"Put",
               url:"meet/backup/update",
               data:{
                   json: $jsonPar,
                   meet_id: meetID,
               },
               success: function(){
                   console.log("ya se guardo el movimiento en la BD");
                   // updateFromJson($jsonPar);
               },
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               },
           });
       }






       function updateFromJson(){
           console.log("updateFromJson llego aqui");
           // graph.fromJSON(JSON.parse($backup));
           $.ajax({
               type:"post",
               url:"meet/backup/load",
               data:{
                    meet_id: meetID,
               },
               success: function($data){
                   console.log("he vuelto del BackupController->load() con exito"+ $data);
               },
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               },
           });
       }

       Echo.join('movsFromMeet.' + meetID)
           .listen('MovementEvent',(e) => {
               // console.log("que estoy haciendo mal?" );
               console.log("que estoy haciendo mal2? " + JSON.stringify(e.meet.backup));
               reLoadGarphFromJson(e.meet.backup);
           })
           .error((error)=>{
               console.log(error);
           });


       function reLoadGarphFromJson(data){

           console.log("reloadFromJson" + data);
           graph.fromJSON(JSON.parse( (data) ));
       }


   </script>

@endsection
