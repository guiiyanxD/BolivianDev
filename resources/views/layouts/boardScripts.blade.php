


<link rel="stylesheet" type="text/css" href="{{asset('Jointjs/dist/rappid.css')}}">
<script src=" {{ asset('jquery/dist/jquery.js')}} "></script>
<script src=" {{ asset('lodash/lodash.js')}} "></script>
<script src=" {{ asset('backbone/backbone.js')}} "></script>
<script src=" {{ asset('Jointjs/dist/rappid.js')}} "></script>
<script src=" {{ asset('js/myJoint/myJointIndex.js') }} "></script>
<script>
    let myjoint = new MyJointIndex();
    const meetID = {{$meet_id}};

    let counter = 1;
    let json = JSON.parse( {!! json_encode($json) !!} );
    json = JSON.stringify(json);
    if(json != null && counter > 0){
        console.log(json);
        myjoint.graph = myjoint.graph.fromJSON(JSON.parse( (json) ));
        counter = 0;
    }

    myjoint.graph.on('add', function(){
        getJson( JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log('seanadio un elemento');

    });

    myjoint.graph.on('remove', function(){
        getJson( JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log('se elimino un elemento');

    });

    myjoint.graph.on('change:attrs', ( )=>{
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log('se editaron atributos de: ');
    });

    myjoint.graph.on(' change:size ', ()=>{

        getJson(  JSON.stringify(myjoint.graph.toJSON()) );

        updateFromJson();
        console.log('se cambio el tamano de: ');

    });

    myjoint.graph.on('change:z', ()=>{
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log("se cambio el z")
    });


    myjoint.paper.on('cell:pointerup change:position', function(cellView){
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log( 'cellView>'+ cellView+ 'se movio un elemento ');
    })



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
        console.log("updateFromJson llego aqui");
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
            console.log(error);
        });

    function reLoadGarphFromJson(data){

        // console.log("reloadFromJson" + data);
        myjoint.graph.fromJSON(JSON.parse( (data) ));
    }

</script>
