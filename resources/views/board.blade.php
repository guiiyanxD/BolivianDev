@extends('layouts.app')
@section('content')

   <div class="navbar" style="background-color: #36382e">
        <div class="align-items-baseline">
            <h5 style="color: #DADAD9"> Codigo de invitacion: {{ $invite_code }}</h5>
        </div>
   </div>

   <div class="container-fluid">
        <div class="row">
            <div class="col-lg-2 px-0" id="stencil">
            </div>
            <div class="col-lg-8 px-0" id="paper">
            </div>
            <div class="col-lg-2 px-0" id="inspector">
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
        joint.setTheme('modern'); //Definiendo el estilo que tendra la pizarra
        var graph = new joint.dia.Graph; // Instanciamos la pizarra

        var paper = new joint.dia.Paper({ // una vez instanciada la pizarra, instanciamos un paper que es la parte visible de la pizarra
            el:document.getElementById('paper'), //elemento html donde se dibujara la pizarra
            width: 1000,
            height: 1000,
            gridSize: 10,
            drawGrid: true,
            model: graph, // Set graph as the model for paper
            defaultLink: function(elementView, magnet) {
                return new joint.shapes.standard.Link({
                    attrs: { line: { stroke: 'black' }}
                });
            },
            interactive: { linkMove: true },
            snapLinks: { radius: 70 },
            defaultConnectionPoint: { name: 'boundary' }
        });

        /*var paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            autoResizePaper: true,
            cursor: 'grab'
        });

        document.getElementById('paper').appendChild(paperScroller.el);
        paperScroller.render().center();
        */




        //HALO, OPCIONES DE CADA ELEMENTVIEW
        paper.on('cell:pointerup', function(cellView) {
            // We don't want a Halo for links.
            if (cellView.model instanceof joint.dia.Link) return;
            var halo = new joint.ui.Halo({ cellView: cellView });
            halo.render();
        });




        // Figuras por defecto
        // ------------

        joint.dia.Element.define('myApp.MyShape', {
            attrs: {
                body: {
                    refWidth: '100%',
                    refHeight: '100%',
                    strokeWidth: 2,
                    stroke: '#000000',
                    fill: '#FFFFFF'
                },
                label: {
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    refX: '50%',
                    refY: '50%',
                    fontSize: 14,
                    fill: '#333333'
                },
                root: {
                    magnet: false // Disable the possibility to connect the body of our shape. Only ports can be connected.
                }
            },
            level: 10,
            ports: {
                groups: {
                    'in': {
                        markup: [{
                            tagName: 'circle',
                            selector: 'portBody',
                            attributes: { r: 12 }
                        }],
                        z: -1,
                        attrs: {
                            portBody: {
                                magnet: true,
                                fill: '#7C68FC'
                            }
                        },
                        position: { name: 'left' },
                        label: { position: { name: 'left' }}
                    },
                    'out': {
                        markup: [{
                            tagName: 'circle',
                            selector: 'portBody',
                            attributes: { r: 12 }
                        }],
                        z: -1,
                        attrs: {
                            portBody: {
                                magnet: true,
                                fill: '#7C68FC'
                            }
                        },
                        position: { name: 'right' },
                        label: { position: { name: 'right' }}
                    }
                }
            }
        }, {
            markup: [{
                tagName: 'rect',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }]
        });

        // Stencil
        // -------
        var stencil = new joint.ui.Stencil({
            paper: paper,
            scaleClones: true,
            width: 240,
            groups: {
                myShapesGroup1: { index: 1, label: ' My Shapes 1' },
                myShapesGroup2: { index: 2, label: ' My Shapes 2' },
                umlShapes: { index: 3, label: 'Formas Uml'}
            },
            dropAnimation: true,
            groupsToggleButtons: true,
            layout: true  // Use default Grid Layout
        });


        document.getElementById('stencil').appendChild(stencil.el);
        stencil.render().load({
            umlShapes:[{
                type:'uml.Abstract',
                name: 'Main',
                methods: [
                    'Metodo 1',
                    'Metodo 2'
                ],
            },{
                type:'uml.Aggregation'
            },{
                type:'uml.Association'
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
            myShapesGroup1: [{
                type: 'standard.Rectangle'
            },{
                type: 'standard.Ellipse'
            },{
                type: 'standard.Circle'
            },{
                type: 'standard.Path'
            },{
                type: 'standard.Polygon'
            },{
                type: 'standard.Polyline'
            },{
                type: 'standard.Cylinder'
            },{
                type: 'standard.HeaderedRectangle'
            },{
                type: 'standard.TextBlock'
            },{
                type: 'standard.Link'
            },{
                type: 'standard.DoubleLink'
            },{
                type: 'standard.ShadowLink'
            }],
            myShapesGroup2: [{
                type: 'standard.Cylinder'
            }, {
                type: 'myApp.MyShape',
                attrs: { label: { text: 'Shape' }},
                ports: { items: [{ group: 'in' },{ group: 'in' }, { group: 'out' }, { group: 'out' }] }
            }]
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
                        label:{
                            text:{
                                type: 'text',
                                label: 'Label',
                                group: 'basic',
                                index: 1
                            },
                            'font-size':{
                                type: 'range',
                                unit: 'x',
                                min: 8,
                                max: 30,
                                label: 'Font size',
                                group: 'basic',
                                index: 2
                            },
                            'font-family': {
                                type: 'select',
                                options: ['Arial', 'Times New Roman', 'Courier New'],
                                label: 'Font family',
                                group: 'basic',
                                index: 3
                            }
                        },
                        myShapesGroup1:{
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
                            }
                        }
                    },
                    level: {
                        type: 'range',
                        min: 1,
                        max: 10,
                        unit: 'x',
                        defaultValue: 6,
                        label: 'Level',
                        group: 'advanced',
                        index: 5
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
                { type: 'zoom-out', name: 'zoom-out', group: 'zoom' },
                { type: 'zoom-in', name: 'zoom-in', group: 'zoom' }
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
