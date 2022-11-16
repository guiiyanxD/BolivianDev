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
       {{--const gettedJson = {{$json}}--}}


       graph.on('change:position', function (){
           console.log("posicion");
           getJson(  JSON.stringify(graph.toJSON()) );
       });

       graph.on('change:attrs', function(){
           console.log("atributos");
           getJson(  JSON.stringify(graph.toJSON()) );
       });

       graph.on('add', function(){
           console.log("adicion");
           getJson( JSON.stringify(graph.toJSON()) );
       });

       graph.on('remove', function(){
           console.log("sustraccion");
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

       function loadJson(){
            $.ajax({
                type:"get",
                url: "meet/backup/load",
                data:{
                    meet_id: meetID,
                },
                success: function(data){
                    graph.fromJSON(JSON.parse(data));
                    console.log("ya se actualizo pero no lo ves: " + data.toString());
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            // graph.fromJSON(JSON.parse(jsonString));
       }


   </script>

@endsection
