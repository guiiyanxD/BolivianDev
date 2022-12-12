


<link rel="stylesheet" type="text/css" href="{{asset('Jointjs/dist/rappid.css')}}">
<script src=" {{ asset('jquery/dist/jquery.js')}} "></script>
<script src=" {{ asset('lodash/lodash.js')}} "></script>
<script src=" {{ asset('backbone/backbone.js')}} "></script>
<script src=" {{ asset('Jointjs/dist/rappid.js')}} "></script>
<script src=" {{ asset('js/myJoint/myJointIndex.js') }} "></script>
<script>
    let myjoint = new MyJointIndex();
    const meetID = {{$meet_id}};
    var SizeEvt = [];

    /*myjoint.graph.on('  change:position', function(element, position){
        // getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        // console.log( "change position" );
        // updateFromJson();
        // console.log('Element ' + element.id + 'moved to ' + position.x + ',' + position.y);

    });*/

    myjoint.graph.on('change:attrs', (cellView, opt)=>{
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log('se editaron atributos de: '+ cellView);
    });

    myjoint.graph.on('change:size', (cellView, opt, evt)=>{
        // var array = [];
        // SizeEvt.push(evt);
        setInterval(function () {}, 500);

        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log('se cambio el tamano de: '+ JSON.stringify(opt));
        // console.log('array: '+ JSON.stringify(SizeEvt.pop()));
        // SizeEvt = [];
        // console.log('array vacio?: '+ JSON.stringify(SizeEvt.pop()));

    });

    myjoint.graph.on('change:z', (cell, opt)=>{
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log("se cambio el z")
    });


    myjoint.paper.on('cell:pointerup change:position', function(cellView){
        getJson(  JSON.stringify(myjoint.graph.toJSON()) );
        updateFromJson();
        console.log( 'cellView>'+ cellView+ 'se movio un elemento ');
    })


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
