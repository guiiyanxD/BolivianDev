


<link rel="stylesheet" type="text/css" href="{{asset('Jointjs/dist/rappid.css')}}">
<script src=" {{ asset('jquery/dist/jquery.js')}} "></script>
<script src=" {{ asset('lodash/lodash.js')}} "></script>
<script src=" {{ asset('backbone/backbone.js')}} "></script>
<script src=" {{ asset('Jointjs/dist/rappid.js')}} "></script>
<script src=" {{ asset('js/myJoint/myJointIndex.js') }} "></script>
<script>
    let myjoint = new MyJointIndex();
    const meetID = {{$meet_id}};

    myjoint.paper.on('change:position', function(){
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        // console.log( "change position" );
        updateFromJson();
    });


    myjoint.paper.on('cell:pointerup', function(){
        getJson( JSON.stringify(myjoint.graph.toJSON()) );
    })

    myjoint.paper.on('change:attrs', function(){
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
    });

    myjoint.paper.on('element:add', function(){
        getJson( JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();

    });

    myjoint.paper.on('element:remove', function(){
        getJson( JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
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

        console.log("reloadFromJson" + data);
        myjoint.graph.fromJSON(JSON.parse( (data) ));
    }

</script>
