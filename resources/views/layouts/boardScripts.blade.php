


<link rel="stylesheet" type="text/css" href="{{asset('Jointjs/dist/rappid.css')}}">
<script src=" {{ asset('jquery/dist/jquery.js')}} "></script>
<script src=" {{ asset('lodash/lodash.js')}} "></script>
<script src=" {{ asset('backbone/backbone.js')}} "></script>
<script src=" {{ asset('Jointjs/dist/rappid.js')}} "></script>
<script src=" {{ asset('js/myJoint/myJointIndex.js') }} "></script>
{{--<script src="{{ asset('js/toXML/package.js') }}"></script>--}}
@if(isset($json))
    <script>
        let json = JSON.parse( {!! json_encode($json) !!} );
        json = JSON.stringify(json);
    </script>
@endif

<script>


    // import {Package} from "../../../public/js/toXML/package";

    let myjoint = new MyJointIndex();
    let pck = new Package();
    const meetID = {{$meet_id}};


    // console.log( typeof json === 'undefined');
    if( typeof json !== 'undefined'){
        // console.log(json);
        myjoint.graph = myjoint.graph.fromJSON(JSON.parse( (json) ));
    }

    myjoint.graph.on('add', function(){
        getJson( JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        // console.log('seanadio un elemento');

    });

    myjoint.graph.on('remove', function(){
        getJson( JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        // console.log('se elimino un elemento');

    });

    myjoint.paper.on('cell:pointerup change:attrs', ()=>{
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        // console.log('se editaron atributos de: '+ JSON.stringify(cellView));
    });


    /*myjoint.paper.on('cell:pointerup change:size ', ()=>{
        // console.log('se cambio el tamano de: ');
        //
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );

        updateFromJson();
        // console.log('se cambio el tamano de: ');

    });*/

    myjoint.graph.on('change:z', ()=>{
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        // console.log("se cambio el z")
    });


    myjoint.paper.on('cell:pointerup change:position', function(){
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        // console.log( 'cellView>'+ cellView+ 'se movio un elemento ');
    })

    myjoint.toolbar.on('xml:pointerclick', function(value, event) {
        exportXML();
    });


    function getJson($jsonPar){
        $.ajax({
            type:"Put",
            url:"meet/backup/update",
            data:{
                json: $jsonPar,
                meet_id: meetID,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        });
    }

    function updateFromJson(){
        // console.log("updateFromJson llego aqui");
        $.ajax({
            type:"post",
            url:"meet/backup/load",
            data:{
                meet_id: meetID,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
        });
    }

    Echo.join('movsFromMeet.' + meetID)
        .listen('MovementEvent',(e) => {
            reLoadGarphFromJson(e.meet.backup);
        })
        .error((error)=>{
            // console.log(error);
        });

    function reLoadGarphFromJson(data){

        // console.log("reloadFromJson" + data);
        myjoint.graph.fromJSON(JSON.parse( (data) ));
    }
    function exportXML(){
        json = myjoint.graph.toJSON();
        pck.generateCompleteFile();
    }

</script>
