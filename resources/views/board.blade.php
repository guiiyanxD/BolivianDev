@extends('layouts.app')
@section('content')

   <div class="navbar" style="background-color: #36382e">
        <div class="align-items-baseline">
            <h5 style="color: #DADAD9"> Codigo de invitacion: {{ $invite_code }}</h5>
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
   <script>
       $users = {};
       Echo.join('.NewMeetingAccess')
           /*.here((users) =>{
               console.log('estos usuarios estan conectados auqi');
               console.log(users);
           })*/
           .joining(user =>{
               console.log('este usuario se acaba de conectar');
               console.log(user.name);
           })
           .leaving(user =>{
               console.log('este usuario se acaba de desconectar');
               console.log(user.name);
           })
           .listen('.NewMeetingAccess', function(e){
               console.log(e);
           })
           .error((error) => {
               console.error(error);
           });
       console.log($users);
   </script>
    <script src=" {{ asset('jquery/dist/jquery.js')}} "></script>
    <script src=" {{ asset('lodash/lodash.js')}} "></script>
    <script src=" {{ asset('backbone/backbone.js')}} "></script>
    <script src=" {{ asset('Jointjs/dist/rappid.js')}} "></script>
    <script type="text/javascript">
        joint.setTheme('dark'); //Definiendo el estilo que tendra la pizarra
        var graph = new joint.dia.Graph; // Instanciamos la pizarra

        var paper = new joint.dia.Paper({ // una vez instanciada la pizarra, instanciamos un paper que es la parte visible de la pizarra
            el: document.getElementById('paper'), //elemento html donde se dibujara la pizarra
            width: 1000,
            // width: window.screen.width - window.screen.width * 0.30,
            // height: window.screen.height - window.screen.height * 0.10,
            height: 1000,
            gridSize: 8,
            drawGrid: true,
            model: graph, // Set graph as the model for paper
            defaultLink: function (elementView, magnet) {
                return new joint.shapes.standard.Link({
                    attrs: {line: {stroke: 'white'}}
                });
            },
            interactive: {linkMove: true},
            snapLinks: {radius: 70},
            defaultConnectionPoint: {name: 'boundary'}
        });

        //HALO, OPCIONES DE CADA ELEMENTVIEW
        paper.on('cell:pointerup', function(cellView) {
            // We don't want a Halo for links.
            if (cellView.model instanceof joint.dia.Link) return;
            var halo = new joint.ui.Halo({ cellView: cellView });
            halo.render();
        });

        // Figuras por defecto
        // ------------
        var stuffRelativeToText = joint.dia.Element.define('RelativeToText',{
            attrs:{
                label: {
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                    fontSize: 48
                },
                e: {
                    strokeWidth: 1,
                    stroke: '#000000',
                    fill: 'rgba(255,0,0,0.3)'
                },
                r: {
                    strokeWidth: 1,
                    stroke: '#000000',
                    fill: 'rgba(0,255,0,0.3)'
                },
                c: {
                    strokeWidth: 1,
                    stroke: '#000000',
                    fill: 'rgba(0,0,255,0.3)'
                },
                outline: {
                    ref: 'label',
                    x: '-calc(0.5*w)',
                    y: '-calc(0.5*h)',
                    width: 'calc(w)',
                    height: 'calc(h)',
                    strokeWidth: 1,
                    stroke: '#000000',
                    strokeDasharray: '5 5',
                    strokeDashoffset: 2.5,
                    fill: '#45a'
                }
            }
        },{
            markup: [
                {
                tagName: 'ellipse',
                selector: 'e'
            },
                {
                tagName: 'rect',
                selector: 'r'
            },
                {
                tagName: 'circle',
                selector: 'c'
            },
                {
                tagName: 'text',
                selector: 'label'
            },
                {
                tagName: 'rect',
                selector: 'outline'
            }]
        });
        // to make all the stuff be relative tp the text
        var relativeToTextt = new stuffRelativeToText();
        relativeToTextt.attr({
            label: {
                text: 'Hello, World!'
            },
            e: {
                ref: 'label',
                rx: 'calc(0.5*w)',
                ry: 'calc(0.25*h)',
                cx: '-calc(0.5*w)',
                cy: '-calc(0.25*h)'
            },
            r: {
                ref: 'label',
                // additional x offset
                x: 10,
                // additional y offset
                y: 'calc(0.5*h-10)',
                width: 'calc(0.5*w)',
                height: 'calc(0.5*h)'
            },
            c: {
                ref: 'label',
                r: 'calc(0.5*d)'
                // c is already centered at label anchor
            }
        });



        // Stencil
        // -------
        var stencil = new joint.ui.Stencil({
            paper: paper,
            scaleClones: true,
            width: 200,
            groups: {
                myBasicStuff: { index: 1, label: ' Figuras basicas' },
                myMagneticStuff: { index: 2, label: ' Figuras magneticas' },
                umlShapes: { index: 3, label: 'Formas Uml'},
                // relativeStuff:{ index:4 , label: 'Relativas al texto'}
            },
            dropAnimation: true,
            groupsToggleButtons: true,
            layout: true // Use default Grid Layout
        });
        document.getElementById('stencil').appendChild(stencil.el);
        // stencil.render().loadGroup([relativeToTextt],'relativeStuff');
        stencil.render().load({
            umlShapes:[{
                type:'uml.Abstract',
                name: 'Main',
                methods: [
                    'Metodo 1',
                    'Metodo 2'
                ],
            },{
                type:'uml.Class'
            },{
                type:'uml.Composition'
            },{
                type:'uml.EndState'
            },{
                type:'uml.Generalization'
            },{
                type:'uml.Implementation'
            },{
                type:'uml.Interface'
            },{
                type:'uml.StartState'
            },{
                type:'uml.State'
            },{
                type:'uml.Transition'
            }],
            myBasicStuff: [{
                type: 'standard.Rectangle',
                attrs:{
                    label: {text: 'Rectangle'}
                }
            },{
                type: 'standard.Ellipse',
                attrs:{
                    label: {text: 'Ellipse'}
                }
            }, {
                type: 'standard.Circle',
                attrs:{
                    label: {text: 'Circle'}
                }
            },{
                type: 'standard.Cylinder'
                // attrs:{
                //     label: {text: 'Cylinder'}
                // }
            },{
                type: 'standard.TextBlock',
                attrs:{
                    label: {text: 'Text block'}
                }
            },{
                type: 'RelativeToText',
                attrs:{
                    label: {
                        text: 'Text',
                        fontSize: 25,
                    },
                }
            }],
            myMagneticStuff: [{
                type: 'standard.Cylinder'
            }],
        });

        //document.getElementById('clear-graph').onclick( function() {graph.clear()});

        //GESTOR DE COMANDOS UNDO, REDO
        /*var commandManager = new joint.dia.CommandManager({ graph: graph });
        document.getElementById('undo').click(function() { commandManager.undo(); });
        document.getElementById('redo').click(function() { commandManager.redo(); });*/

        // Inspector
        // --------
        paper.on('element:pointerclick', function(elementView) {
            joint.ui.Inspector.create(document.getElementById('inspector'), {
                cell: elementView.model,
                inputs: {
                    attrs:{
                        circle:{
                            fill:{
                                type: 'color-palette',
                                options: [
                                    { content: '#FFFFFF' },
                                    { content: '#FF0000' },
                                    { content: '#00FF00' },
                                    { content: '#0000FF' },
                                    { content: '#000000' }
                                ],
                                label: 'Fill color',
                                group: 'basic',
                                index: 4
                            },
                            stroke: {
                                type: 'color-palette',
                                options: [
                                    { content: '#FFFFFF' },
                                    { content: '#FF0000' },
                                    { content: '#00FF00' },
                                    { content: '#0000FF' },
                                    { content: '#000000' }
                                ],
                                label: 'Outline color',
                                group: 'basic',
                                index: 5
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 50,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'basic',
                                index: 6
                            }
                        },
                        rectangle:{
                            fill:{
                                type: 'color-palette',
                                options: [
                                    { content: '#FFFFFF' },
                                    { content: '#FF0000' },
                                    { content: '#00FF00' },
                                    { content: '#0000FF' },
                                    { content: '#000000' }
                                ],
                                label: 'Fill color',
                                group: 'basic',
                                index: 8
                            },
                            stroke: {
                                type: 'color-palette',
                                options: [
                                    { content: '#FFFFFF' },
                                    { content: '#FF0000' },
                                    { content: '#00FF00' },
                                    { content: '#0000FF' },
                                    { content: '#000000' }
                                ],
                                label: 'Outline color',
                                group: 'basic',
                                index: 9
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 50,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'basic',
                                index: 10
                            }
                        },
                    },
                    level: {
                        type: 'range',
                        min: 1,
                        max: 10,
                        unit: 'x',
                        defaultValue: 6,
                        label: 'Level',
                        group: 'advanced',
                        index: 7
                    }
                },
                groups: {
                    basic: {
                        label: 'Basic',
                        index: 1
                    },
                    advanced: {
                        label: 'Advanced',
                        index: 2
                    }
                },
                renderFieldContent: function(options, path, value, inspector){
                    switch (options.type){
                        case 'select':

                    }
                }
            });
        });

        paper.on('link:pointerup', function(linkView) {
            paper.removeTools();
            var toolsView = new joint.dia.ToolsView({
                name: 'my-link-tools',
                tools: [
                    new joint.linkTools.Vertices(),
                    new joint.linkTools.SourceArrowhead(),
                    new joint.linkTools.TargetArrowhead(),
                    new joint.linkTools.Segments,
                    new joint.linkTools.Remove({ offset: -20, distance: 40 })
                ]
            });
            linkView.addTools(toolsView);
        });

        paper.on('blank:pointerdown', function() {
            paper.removeTools();
        });


        // Toolbar
        // -------

        var toolbar = new joint.ui.Toolbar({
            groups: {
                clear: { index: 1 },
                zoom: { index: 2 }
            },
            tools: [
                { type: 'button', name: 'clear', group: 'clear', text: 'Clear Diagram' },
                { type: 'zoom-out', name: 'zoom-out', group: 'zoom', text: 'Zoom out' },
                { type: 'zoom-in', name: 'zoom-in', group: 'zoom', text: 'Zoom in' },
                // { type: ''}
            ],
            references: {
                paper: paper // built in zoom-in/zoom-out control types require access to paperScroller instance
            }
        });

        toolbar.on({
            'clear:pointerclick': graph.clear.bind(graph)
        });

        document.getElementById('toolbar-container').appendChild(toolbar.el);
        toolbar.render();


    </script>

@endsection
