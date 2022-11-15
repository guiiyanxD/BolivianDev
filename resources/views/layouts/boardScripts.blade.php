{{--<script src="{{asset('js/board.js')}}">

</script>--}}


<link rel="stylesheet" type="text/css" href="{{asset('Jointjs/dist/rappid.css')}}">
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
        height: 800,
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


    // Stencil
    // -------
    var stencil = new joint.ui.Stencil({
        paper: paper,
        scaleClones: true,
        width: 200,
        height: "100%",
        groups: {
            BasicStuff: { index: 1, label: ' Figuras basicas' },
            umlShapes: { index: 2, label: 'Formas Uml', closed: true},
        },
        dropAnimation: true,
        groupsToggleButtons: true,
        layout: true // Use default Grid Layout
    });
    document.getElementById('stencil').appendChild(stencil.el);
    // stencil.render().loadGroup([relativeToTextt],'relativeStuff');
    stencil.render().load({
        BasicStuff: [
            {
                type: 'standard.Rectangle',
                attrs:
                    {
                        label: {text: 'Rectangle'}
                    }
            },
            {
                type: 'standard.Ellipse',
                attrs:{
                    label: {text: 'Ellipse'}
                }
            },
            {
                type: 'standard.Circle',
                attrs:{
                    label: {text: 'Circle'}
                }
            },
            {
                type: 'standard.Cylinder',
                attrs:{
                    label: {text: 'Cylinder'}
                }
            },
            {
                type: 'standard.TextBlock',
                attrs:{
                    label: {
                        text: 'Text block',
                        style:{
                            color: '#000000',
                        }
                    },
                    body: {fill: '#ffffff'}
                }
            },
            {
                type: 'standard.HeaderedRectangle',
                attrs:{
                    bodyText: {
                        text: 'Body Text',
                        fontSize: 12,
                    },
                    headerText:{
                        text: 'Header Text',
                        fontSize: 10
                    }
                }
            }
        ],
        umlShapes:[
            {
                type:'uml.Abstract',
                name: 'Main',
                methods: [
                    'Metodo 1',
                    'Metodo 2'
                ],
            },
            {
                type:'uml.Class'
            },
            {
                type:'uml.Composition'
            },
            {
                type:'uml.EndState'
            },
            {
                type:'uml.Generalization'
            },
            {
                type:'uml.Implementation'
            },
            {
                type:'uml.Interface'
            },
            {
                type:'uml.StartState'
            },
            {
                type:'uml.State'
            },
            {
                type:'uml.Transition'
            }
        ]
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
                            label: 'Fill Shape Color',
                            group: 'basic',
                            index: 1
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
                            label: 'Outline Shape Color',
                            group: 'basic',
                            index: 2
                        },
                        'stroke-width': {
                            type: 'range',
                            min: 0,
                            max: 50,
                            unit: 'px',
                            label: 'Outline thickness',
                            group: 'basic',
                            index: 3
                        }
                    },
                    text: {
                        text: {
                            type: 'textarea',
                            label: 'Text',
                            group: 'text',
                            index: 1
                        },
                        'font-size': {
                            type: 'range',
                            min: 5,
                            max: 30,
                            label: 'Font size',
                            group: 'text',
                            index: 2
                        },
                        'font-family': {
                            type: 'select',
                            options: ['Arial', 'Times New Roman', 'Courier New'],
                            label: 'Font family',
                            group: 'text',
                            index: 3
                        },
                        fill:{
                            type: 'color-palette',
                            options: [
                                { content: '#FFFFFF' },
                                { content: '#FF0000' },
                                { content: '#00FF00' },
                                { content: '#0000FF' },
                                { content: '#000000' }
                            ],
                            label: 'Fill Text color',
                            group: 'text',
                            index: 4
                        },
                    },

                },
            },
            groups: {
                basic: {
                    label: 'Basic',
                    index: 1
                },
                text:{
                    label: 'Text',
                    index: 2,
                    closed:true
                }
            },
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

    function getJson(){
        var jsonString = JSON.stringify(graph.toJSON());
        console.log(jsonString);
    }


</script>
