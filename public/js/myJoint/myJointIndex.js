
class MyJointIndex{


    constructor() {
        this.intiPaper();
        this.initializeStencil();
        this.initializeSelection();
        this.initializeToolsAndInspector();
        this.initializeToolbar();
        this.initializeKeyboardShortcuts();
        this.initializeTooltips();
    }

    intiPaper(){
        joint.setTheme('dark');
        let graph = this.graph = new joint.dia.Graph;

        this.commandManager = new joint.dia.CommandManager({ graph: graph });

        let paper = this.paper = new joint.dia.Paper({
            width: 4000,
            height: screen.height,
            gridSize: 10,
            drawGrid: true,
            model: graph,
            defaultLink: new joint.shapes.standard.Link(),
            // defaultConnectionPoint: joint.shapes.standard.Link.connectionPoint,
            interactive: { linkMove: false },
            async: true,
            // sorting: joint.dia.Paper.sorting.APPROX
        });

        this.snaplines = new joint.ui.Snaplines({ paper: paper });

        let paperScroller = this.paperScroller = new joint.ui.PaperScroller({
            paper: paper,
            autoResizePaper: true,
            scrollWhileDragging: true,
            cursor: 'grab'
        });

        document.getElementById('paper').append(paperScroller.el);
        paperScroller.render();

        paper.on('paper:pan', (evt, tx, ty) => {
            evt.preventDefault();
            paperScroller.el.scrollLeft += tx;
            paperScroller.el.scrollTop += ty;
        });

        paper.on('paper:pinch', (evt, ox, oy, scale) => {
            // the default is already prevented
            const zoom = paperScroller.zoom();
            paperScroller.zoom(zoom * scale, { min: 0.2, max: 5, ox, oy, absolute: true });
        });
    }
    initializeStencil() {

        // console.log(MyStencil.myStencilGroups);

        // var myStencil = new MyStencil();


        let stencil = this.stencil = new joint.ui.Stencil({
            paper: this.paperScroller,
            snaplines: this.snaplines,
            scaleClones: true,
            width: 240,
            // groups: myStencil['myStencilGroups'],
            groups: {
                standard: { index: 1, label: 'Standard shapes' },
                fsa: { index: 2, label: 'State machine' },
                pn: { index: 3, label: 'Petri nets' },
                erd: { index: 4, label: 'Entity-relationship' },
                uml: { index: 5, label: 'UML' },
                org: { index: 6, label: 'ORG' },
            },
            dropAnimation: true,
            groupsToggleButtons: true,
            search: {
                '*': ['type', 'attrs/text/text', 'attrs/root/dataTooltip', 'attrs/label/text'],
                'org.Member': ['attrs/.rank/text', 'attrs/root/dataTooltip', 'attrs/.name/text']
            },
            layout: {
                columns: 2,
                marginX: 10,
                marginY: 10,
                columnGap: 10,
                columnWidth: 100,
                // reset defaults
                resizeToFit: false,
                dx: 0,
                dy: 0
            },

            // Remove tooltip definition from clone
            dragStartClone: function(cell) {
                return cell.clone().removeAttr('root/dataTooltip');
            }
        });

        document.getElementById('stencil').append(stencil.el);
        //TODO: PONER LOS SHAPES EN OTRO DOCUEMNTO
        stencil.render().load(
            {
                standard: [
                    {
                        type: 'standard.Rectangle',
                        size: { width: 90, height: 54 },
                        attrs: {
                            root: {
                                dataTooltip: 'Rectangle',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            body: {
                                rx: 2,
                                ry: 2,
                                width: 50,
                                height: 30,
                                fill: 'transparent',
                                stroke: '#5BC3EB',
                                strokeWidth: 2,
                                strokeDasharray: '0'
                            },
                            label: {
                                text: '',
                                fill: '#c6c7e2',
                                fontFamily: 'Roboto Condensed',
                                fontWeight: 'Normal',
                                fontSize: 11,
                                strokeWidth: 0
                            }
                        }
                    },
                    {
                        type: 'standard.Ellipse',
                        size: { width: 90, height: 54 },
                        attrs: {
                            root: {
                                dataTooltip: 'Ellipse',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            body: {
                                width: 50,
                                height: 30,
                                fill: 'transparent',
                                stroke: '#5BC3EB',
                                strokeWidth: 2,
                                strokeDasharray: '0'
                            },
                            label: {
                                text: ' ',
                                fill: '#c6c7e2',
                                fontFamily: 'Roboto Condensed',
                                fontWeight: 'Normal',
                                fontSize: 11,
                                strokeWidth: 0
                            }
                        }
                    },
                    {
                        type: 'standard.Polygon',
                        size: { width: 90, height: 54 },
                        attrs: {
                            root: {
                                dataTooltip: 'Rhombus',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            body: {
                                points: 'calc(0.5 * w),0 calc(w),calc(0.5 * h) calc(0.5 * w),calc(h) 0,calc(0.5 * h)',
                                fill: 'transparent',
                                stroke: '#5BC3EB',
                                strokeWidth: 2,
                                strokeDasharray: '0'
                            },
                            label: {
                                text: ' ',
                                fill: '#c6c7e2',
                                fontFamily: 'Roboto Condensed',
                                fontWeight: 'Normal',
                                fontSize: 11,
                                strokeWidth: 0
                            }
                        }
                    },
                    {
                        type: 'standard.Cylinder',
                        size: { width: 90, height: 54 },
                        attrs: {
                            root: {
                                dataTooltip: 'Cylinder',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            body: {
                                fill: 'transparent',
                                stroke: '#5BC3EB',
                                strokeWidth: 2,
                                strokeDasharray: '0'
                            },
                            top: {
                                fill: 'transparent',
                                stroke: '#5BC3EB',
                                strokeWidth: 2,
                                strokeDasharray: '0'
                            },
                            label: {
                                text: ' ',
                                fill: '#c6c7e2',
                                fontFamily: 'Roboto Condensed',
                                fontWeight: 'Normal',
                                fontSize: 11,
                                strokeWidth: 0
                            }
                        }
                    },
                    {
                        type: 'standard.HeaderedRectangle',
                        size: { width: 90, height: 54 },
                        attrs: {
                            root: {
                                dataTooltip: 'Rectangle with header',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            body: {
                                fill: 'transparent',
                                stroke: '#5BC3EB',
                                strokeWidth: 2,
                                strokeDasharray: '0'
                            },
                            header: {
                                stroke: '#5BC3EB',
                                fill: 'transparent',
                                strokeWidth: 2,
                                strokeDasharray: '0',
                                height: 20
                            },
                            bodyText: {
                                textWrap: {
                                    text: ' ',
                                    width: -10,
                                    height: -20,
                                    ellipsis: true
                                },
                                fill: '#c6c7e2',
                                fontFamily: 'Roboto Condensed',
                                fontWeight: 'Normal',
                                fontSize: 11,
                                strokeWidth: 0,
                                refY2: 12,
                            },
                            headerText: {
                                text: ' ',
                                fill: '#f6f6f6',
                                fontFamily: 'Roboto Condensed',
                                fontWeight: 'Normal',
                                fontSize: 11,
                                strokeWidth: 0,
                                refY: 12
                            }
                        }
                    }

                ],
                fsa: [
                    {
                        type: 'org.Member',
                        size: { width: 90, height: 35 },
                        attrs: {
                            root: {
                                dataTooltip: 'Member',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.rank': {
                                text: 'Rank',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-size': 12,
                                'font-weight': 'Bold',
                                'text-decoration': 'none'
                            },
                            '.name': {
                                text: 'Person',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 10
                            },
                            '.card': {
                                fill: '#31d0c6',
                                stroke: 'transparent',
                                'stroke-width': 0,
                                'stroke-dasharray': '0'
                            },
                            image: {
                                width: 32,
                                height: 32,
                                x: 16,
                                y: 13,
                                ref: null,
                                'ref-x': null,
                                'ref-y': null,
                                'y-alignment': null,
                                'xlink:href': 'assets/user-member.png',
                            }
                        }
                    }
                ],
                pn :[

                    {
                        type: 'pn.Place',
                        size: { width: 60, height: 60 },
                        preserveAspectRatio: true,
                        tokens: 3,
                        attrs: {
                            root: {
                                dataTooltip: 'Place',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.root': {
                                fill: 'transparent',
                                stroke: '#61549c',
                                'stroke-width': 2,
                                'stroke-dasharray': '0'
                            },
                            '.tokens circle': {
                                fill: '#6a6c8a',
                                stroke: '#000',
                                'stroke-width': 0
                            },
                            '.label': {
                                text: '',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal'
                            }
                        }
                    },
                    {
                        type: 'pn.Transition',
                        size: { width: 14, height: 60 },
                        preserveAspectRatio: true,
                        attrs: {
                            root: {
                                dataTooltip: 'Transition',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            rect: {
                                rx: 3,
                                ry: 3,
                                width: 12,
                                height: 50,
                                fill: '#61549c',
                                stroke: '#7c68fc',
                                'stroke-width': 0,
                                'stroke-dasharray': '0'
                            },
                            '.label': {
                                text: 'transition',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'stroke-width': 0,
                                'fill': '#222138'
                            }
                        }
                    }
                ],

                erd: [

                    {
                        type: 'erd.Entity',
                        size: { width: 90, height: 36 },
                        attrs: {
                            root: {
                                dataTooltip: 'Entity',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                rx: 3,
                                ry: 3,
                                fill: '#31d0c6',
                                'stroke-width': 2,
                                stroke: 'transparent',
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'Entity',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                fill: '#f6f6f6',
                                'stroke-width': 0
                            }
                        }
                    },
                    {
                        type: 'erd.WeakEntity',
                        size: { width: 90, height: 36 },
                        attrs: {
                            root: {
                                dataTooltip: 'Weak Entity',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                fill: 'transparent',
                                stroke: '#feb663',
                                'stroke-width': 2,
                                points: '100,0 100,60 0,60 0,0',
                                'stroke-dasharray': '0'
                            },
                            '.inner': {
                                fill: '#feb663',
                                stroke: 'transparent',
                                points: '97,5 97,55 3,55 3,5',
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'Weak entity',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                fill: '#f6f6f6',
                                'stroke-width': 0
                            }
                        }
                    },
                    {
                        type: 'erd.Relationship',
                        size: { width: 60, height: 60 },
                        attrs: {
                            root: {
                                dataTooltip: 'Relationship',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                fill: '#61549c',
                                stroke: 'transparent',
                                'stroke-width': 2,
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'Relation',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                fill: '#f6f6f6',
                                'stroke-width': 0
                            }
                        }
                    },
                    {
                        type: 'erd.IdentifyingRelationship',
                        size: { width: 60, height: 60 },
                        attrs: {
                            root: {
                                dataTooltip: 'Identifying Relationship',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                fill: 'transparent',
                                stroke: '#6a6c8a',
                                'stroke-dasharray': '0'
                            },
                            '.inner': {
                                fill: '#6a6c8a',
                                stroke: 'transparent',
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'Relation',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                fill: '#f6f6f6',
                                'stroke-width': 0
                            }
                        }
                    },
                    {
                        type: 'erd.ISA',
                        size: { width: 90, height: 45 },
                        attrs: {
                            root: {
                                dataTooltip: 'ISA',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            text: {
                                text: 'ISA',
                                fill: '#f6f6f6',
                                'letter-spacing': 0,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            },
                            polygon: {
                                fill: '#feb663',
                                stroke: 'transparent',
                                'stroke-dasharray': '0'
                            }
                        }
                    },
                    {
                        type: 'erd.Key',
                        size: { width: 90, height: 45 },
                        attrs: {
                            root: {
                                dataTooltip: 'Key',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                fill: 'transparent',
                                stroke: '#fe854f',
                                'stroke-dasharray': '0'
                            },
                            '.inner': {
                                fill: '#fe854f',
                                stroke: 'transparent',
                                display: 'block',
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'Key',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                fill: '#f6f6f6',
                                'stroke-width': 0
                            }
                        }
                    },
                    {
                        type: 'erd.Normal',
                        size: { width: 90, height: 45 },
                        attrs: {
                            root: {
                                dataTooltip: 'Normal',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                fill: '#feb663',
                                stroke: 'transparent',
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'Normal',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                fill: '#f6f6f6',
                                'stroke-width': 0
                            }
                        }
                    },
                    {
                        type: 'erd.Multivalued',
                        size: { width: 90, height: 45 },
                        attrs: {
                            root: {
                                dataTooltip: 'Mutltivalued',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                fill: 'transparent',
                                stroke: '#fe854f',
                                'stroke-dasharray': '0'
                            },
                            '.inner': {
                                fill: '#fe854f',
                                stroke: 'transparent',
                                rx: 43,
                                ry: 21,
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'MultiValued',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                fill: '#f6f6f6',
                                'stroke-width': 0
                            }
                        }
                    },
                    {
                        type: 'erd.Derived',
                        size: { width: 90, height: 45 },
                        attrs: {
                            root: {
                                dataTooltip: 'Derived',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.outer': {
                                fill: 'transparent',
                                stroke: '#fe854f',
                                'stroke-dasharray': '0'
                            },
                            '.inner': {
                                fill: '#feb663',
                                stroke: 'transparent',
                                'display': 'block',
                                'stroke-dasharray': '0'
                            },
                            text: {
                                text: 'Derived',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11,
                                'stroke-width': 0
                            }
                        }
                    }
                ],

                uml: [

                    {
                        type: 'uml.Class',
                        name: 'Class',
                        attributes: ['+attr1'],
                        methods: ['-setAttr1()'],
                        size: { width: 90, height: 60 },
                        attrs: {
                            root: {
                                dataTooltip: 'Class',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.uml-class-name-rect': {
                                top: 2,
                                fill: '#61549c',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-attrs-rect': {
                                top: 2,
                                fill: '#61549c',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-methods-rect': {
                                top: 2,
                                fill: '#61549c',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-name-text': {
                                ref: '.uml-class-name-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            },
                            '.uml-class-attrs-text': {
                                ref: '.uml-class-attrs-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            },
                            '.uml-class-methods-text': {
                                ref: '.uml-class-methods-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            }
                        }
                    },
                    {
                        type: 'uml.Interface',
                        name: 'Interface',
                        attributes: ['+attr1'],
                        methods: ['-setAttr1()'],
                        size: { width: 90, height: 60 },
                        attrs: {
                            root: {
                                dataTooltip: 'Interface',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.uml-class-name-rect': {
                                fill: '#fe854f',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-attrs-rect': {
                                fill: '#fe854f',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-methods-rect': {
                                fill: '#fe854f',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-name-text': {
                                ref: '.uml-class-name-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            },
                            '.uml-class-attrs-text': {
                                ref: '.uml-class-attrs-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-size': 11
                            },
                            '.uml-class-methods-text': {
                                ref: '.uml-class-methods-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            }
                        }
                    },
                    {
                        type: 'uml.Abstract',
                        name: 'Abstract',
                        attributes: ['+attr1'],
                        methods: ['-setAttr1()'],
                        size: { width: 90, height: 60 },
                        attrs: {
                            root: {
                                dataTooltip: 'Abstract',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.uml-class-name-rect': {
                                fill: '#6a6c8a',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-attrs-rect': {
                                fill: '#6a6c8a',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-methods-rect': {
                                fill: '#6a6c8a',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8
                            },
                            '.uml-class-name-text': {
                                ref: '.uml-class-name-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            },
                            '.uml-class-attrs-text': {
                                ref: '.uml-class-attrs-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            },
                            '.uml-class-methods-text': {
                                ref: '.uml-class-methods-rect',
                                'ref-y': 0.5,
                                'y-alignment': 'middle',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 11
                            }
                        }
                    },

                    {
                        type: 'uml.State',
                        name: 'State',
                        events: ['entry/', 'create()'],
                        size: { width: 90, height: 60 },
                        attrs: {
                            root: {
                                dataTooltip: 'State',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.uml-state-body': {
                                fill: '#feb663',
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                rx: 8,
                                ry: 8,
                                'stroke-dasharray': '0'
                            },
                            '.uml-state-separator': {
                                stroke: '#f6f6f6',
                                'stroke-width': 1,
                                'stroke-dasharray': '0'
                            },
                            '.uml-state-name': {
                                fill: '#f6f6f6',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal'
                            },
                            '.uml-state-events': {
                                fill: '#f6f6f6',
                                'font-size': 11,
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal'
                            }
                        }
                    }
                ],

                org: [

                    {
                        type: 'org.Member',
                        size: { width: 90, height: 35 },
                        attrs: {
                            root: {
                                dataTooltip: 'Member',
                                dataTooltipPosition: 'left',
                                dataTooltipPositionSelector: '.joint-stencil'
                            },
                            '.rank': {
                                text: 'Rank',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-size': 12,
                                'font-weight': 'Bold',
                                'text-decoration': 'none'
                            },
                            '.name': {
                                text: 'Person',
                                fill: '#f6f6f6',
                                'font-family': 'Roboto Condensed',
                                'font-weight': 'Normal',
                                'font-size': 10
                            },
                            '.card': {
                                fill: '#31d0c6',
                                stroke: 'transparent',
                                'stroke-width': 0,
                                'stroke-dasharray': '0'
                            },
                            image: {
                                width: 32,
                                height: 32,
                                x: 16,
                                y: 13,
                                ref: null,
                                'ref-x': null,
                                'ref-y': null,
                                'y-alignment': null,
                                'xlink:href': 'assets/member-male.png'
                            }
                        }
                    }
                ],
            }
        );

/*        stencil.on('element:drop', function(elementView) {
            this.selection.collection.reset([elementView.model]);
        }, this);*/
    }
    initializeKeyboardShortcuts() {

        this.keyboard = new joint.ui.Keyboard();
        this.keyboard.on({

            'ctrl+c': function() {
                // Copy all selected elements and their associated links.
                this.clipboard.copyElements(this.selection.collection, this.graph);
            },

            'ctrl+v': function() {

                var pastedCells = this.clipboard.pasteCells(this.graph);

                var elements = pastedCells.filter((cell) => cell.isElement());

                // Make sure pasted elements get selected immediately. This makes the UX better as
                // the user can immediately manipulate the pasted elements.
                this.selection.collection.reset(elements);
            },

            'ctrl+x shift+delete': function() {
                this.clipboard.cutElements(this.selection.collection, this.graph);
            },

            'delete backspace': function(evt) {
                evt.preventDefault();
                this.graph.removeCells(this.selection.collection.toArray());
            },

            'ctrl+z': function() {
                this.commandManager.undo();
                this.selection.collection.reset([]);
            },

            'ctrl+y': function() {
                this.commandManager.redo();
                this.selection.collection.reset([]);
            },

            'ctrl+a': function() {
                this.selection.collection.reset(this.graph.getElements());
            },

            'ctrl+plus': function(evt) {
                evt.preventDefault();
                this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
            },

            'ctrl+minus': function(evt) {
                evt.preventDefault();
                this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
            },

            'keydown:shift': function(evt) {
                this.paperScroller.setCursor('crosshair');
            },

            'keyup:shift': function() {
                this.paperScroller.setCursor('grab');
            }

        });
    }
    initializeSelection() {

        this.clipboard = new joint.ui.Clipboard();

        this.selection = new joint.ui.Selection({
            paper: this.paper,
            handles:[{
                name: 'remove',
                position: 'nw',
                events: {
                    pointerdown: 'removeElements'
                },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': 'Click to remove the selected elements',
                        'data-tooltip-position': 'right',
                        'data-tooltip-padding': 15
                    }
                }

            }, {
                name: 'rotate',
                position: 'sw',
                events: {
                    pointerdown: 'startRotating',
                    pointermove: 'doRotate',
                    pointerup: 'stopBatch'
                },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': 'Click and drag to rotate the selected elements',
                        'data-tooltip-position': 'right',
                        'data-tooltip-padding': 15
                    }
                }

            }, {
                name: 'resize',
                position: 'se',
                events: {
                    pointerdown: 'startResizing',
                    pointermove: 'doResize',
                    pointerup: 'stopBatch'
                },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': 'Click and drag to resize the selected elements',
                        'data-tooltip-position': 'left',
                        'data-tooltip-padding': 15
                    }
                }
            }],
            useModelGeometry: true,
            // translateConnectedLinks: joint.ui.Selection.ConnectedLinksTranslation.ALL
        });

        this.selection.collection.on('reset add remove', this.onSelectionChange.bind(this));

        // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
        // Otherwise, initiate paper pan.
        this.paper.on('blank:pointerdown', function(evt, x, y) {

            if (this.keyboard.isActive('shift', evt)) {
                this.selection.startSelecting(evt);
            } else {
                this.selection.collection.reset([]);
                this.paperScroller.startPanning(evt, x, y);
                this.paper.removeTools();
            }

        }, this);

        this.paper.on('element:pointerdown', function(elementView, evt) {

            // Select an element if CTRL/Meta key is pressed while the element is clicked.
            if (this.keyboard.isActive('ctrl meta', evt)) {
                if (this.selection.collection.find(function(cell) { return cell.isLink() })) {
                    // Do not allow mixing links and elements in the selection
                    this.selection.collection.reset([elementView.model]);
                } else {
                    this.selection.collection.add(elementView.model);
                }
            }

        }, this);

        this.graph.on('remove', function(cell) {

            // If element is removed from the graph, remove from the selection too.
            if (this.selection.collection.has(cell)) {
                this.selection.collection.reset(this.selection.collection.models.filter(c => c !== cell));
            }

        }, this);

        this.selection.on('selection-box:pointerdown', function(elementView, evt) {

            // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
            if (this.keyboard.isActive('ctrl meta', evt)) {
                evt.preventDefault();
                this.selection.collection.remove(elementView.model);
            }

        }, this);

        this.selection.on('selection-box:pointerup', (elementView, evt) => {

            if (evt.button === 2) {
                evt.stopPropagation();
                this.renderContextToolbar({ x: evt.clientX, y: evt.clientY }, this.selection.collection.toArray());
            }

        }, this);
    }
    renderContextToolbar(point, cellsToCopy = []) {
        this.selection.collection.reset(cellsToCopy);
        const contextToolbar = new joint.ui.ContextToolbar({
            target: point,
            root: this.paper.el,
            padding: 0,
            vertical: true,
            anchor: 'top-left',
            tools: [
                {
                    action: 'copy',
                    content: 'Copy',
                    attrs: {
                        'disabled': cellsToCopy.length === 0
                    }
                },
                {
                    action: 'paste',
                    content: 'Paste',
                    attrs: {
                        'disabled': this.clipboard.isEmpty()
                    }
                }]
        });

        contextToolbar.on('action:copy', () => {
            contextToolbar.remove();

            this.clipboard.copyElements(cellsToCopy, this.graph);
        });

        contextToolbar.on('action:paste', () => {
            contextToolbar.remove();
            const pastedCells = this.clipboard.pasteCellsAtPoint(this.graph, this.paper.clientToLocalPoint(point));

            const elements = pastedCells.filter(cell => cell.isElement());

            // Make sure pasted elements get selected immediately. This makes the UX better as
            // the user can immediately manipulate the pasted elements.
            this.selection.collection.reset(elements);
        });
        contextToolbar.render();
    }
    onSelectionChange() {
        var paper = this.paper;
        var selection = this.selection;
        var collection = selection.collection;
        paper.removeTools();
        joint.ui.Halo.clear(paper);
        joint.ui.FreeTransform.clear(paper);
        joint.ui.Inspector.close();
        if (collection.length === 1) {
            var primaryCell = collection.first();
            var primaryCellView = paper.findViewByModel(primaryCell);
            selection.destroySelectionBox(primaryCell);
            this.selectPrimaryCell(primaryCellView);
        } else if (collection.length === 2) {
            collection.each(function(cell) {
                selection.createSelectionBox(cell);
            });
        }
    }
    selectPrimaryCell (cellView) {
        var cell = cellView.model

        if (cell.isElement()) {
            this.selectPrimaryElement(cellView);
        } else {
            this.selectPrimaryLink(cellView);
        }
        this.createInspector(cell);
    }
    selectPrimaryElement(elementView) {

        var element = elementView.model;

        new joint.ui.FreeTransform({
            cellView: elementView,
            allowRotation: false,
            preserveAspectRatio: !!element.get('preserveAspectRatio'),
            allowOrthogonalResize: element.get('allowOrthogonalResize') !== false
        }).render();

        new joint.ui.Halo({
            cellView: elementView,
            handles: [
                {
                name: 'remove',
                position: 'nw',
                events: { pointerdown: 'removeElement' },
                attrs: {
                    '.handle': {
                        'data-tooltip-class-name': 'small',
                        'data-tooltip': 'Click to remove the object',
                        'data-tooltip-position': 'right',
                        'data-tooltip-padding': 15
                    }
                }
            },
                {
                    name: 'fork',
                    position: 'ne',
                    events: { pointerdown: 'startForking', pointermove: 'doFork', pointerup: 'stopForking' },
                    attrs: {
                        '.handle': {
                            'data-tooltip-class-name': 'small',
                            'data-tooltip': 'Click and drag to clone and connect the object in one go',
                            'data-tooltip-position': 'left',
                            'data-tooltip-padding': 15
                        }
                    }
                },
                {
                    name: 'clone',
                    position: 'se',
                    events: { pointerdown: 'startCloning', pointermove: 'doClone', pointerup: 'stopCloning' },
                    attrs: {
                        '.handle': {
                            'data-tooltip-class-name': 'small',
                            'data-tooltip': 'Click and drag to clone the object',
                            'data-tooltip-position': 'left',
                            'data-tooltip-padding': 15
                        }
                    }
                },
                {
                    name: 'unlink',
                    position: 'w',
                    events: { pointerdown: 'unlinkElement' },
                    attrs: {
                        '.handle': {
                            'data-tooltip-class-name': 'small',
                            'data-tooltip': 'Click to break all connections to other objects',
                            'data-tooltip-position': 'right',
                            'data-tooltip-padding': 15
                        }
                    }
                },
                {
                    name: 'link',
                    position: 'e',
                    events: { pointerdown: 'startLinking', pointermove: 'doLink', pointerup: 'stopLinking' },
                    attrs: {
                        '.handle': {
                            'data-tooltip-class-name': 'small',
                            'data-tooltip': 'Click and drag to connect the object',
                            'data-tooltip-position': 'left',
                            'data-tooltip-padding': 15
                        }
                    }
                },
                {
                    name: 'rotate',
                    position: 'sw',
                    events: { pointerdown: 'startRotating', pointermove: 'doRotate', pointerup: 'stopBatch' },
                    attrs: {
                        '.handle': {
                            'data-tooltip-class-name': 'small',
                            'data-tooltip': 'Click and drag to rotate the object',
                            'data-tooltip-position': 'right',
                            'data-tooltip-padding': 15
                        }
                    }
                }],
            useModelGeometry: true
        }).render();
    }
    selectPrimaryLink(linkView) {

        var ns = joint.linkTools;
        var toolsView = new joint.dia.ToolsView({
            name: 'link-pointerdown',
            tools: [
                new ns.Vertices(),
                new ns.SourceAnchor(),
                new ns.TargetAnchor(),
                new ns.SourceArrowhead(),
                new ns.TargetArrowhead(),
                new ns.Segments,
                new ns.Boundary({ padding: 15 }),
                new ns.Remove({ offset: -20, distance: 40 })
            ]
        });

        linkView.addTools(toolsView);
    }
    createInspector(cell) {

        const options = {

            colorPalette: [
                { content: 'transparent', icon: 'assets/transparent-icon.svg' },
                { content: '#f6f6f6' },
                { content: '#dcd7d7' },
                { content: '#8f8f8f' },
                { content: '#c6c7e2' },
                { content: '#feb663' },
                { content: '#fe854f' },
                { content: '#b75d32' },
                { content: '#31d0c6' },
                { content: '#7c68fc' },
                { content: '#61549c' },
                { content: '#6a6c8a' },
                { content: '#4b4a67' },
                { content: '#3c4260' },
                { content: '#33334e' },
                { content: '#222138' }
            ],

            colorPaletteReset: [
                { content: undefined, icon: 'assets/no-color-icon.svg' },
                { content: '#f6f6f6' },
                { content: '#dcd7d7' },
                { content: '#8f8f8f' },
                { content: '#c6c7e2' },
                { content: '#feb663' },
                { content: '#fe854f' },
                { content: '#b75d32' },
                { content: '#31d0c6' },
                { content: '#7c68fc' },
                { content: '#61549c' },
                { content: '#6a6c8a' },
                { content: '#4b4a67' },
                { content: '#3c4260' },
                { content: '#33334e' },
                { content: '#222138' }
            ],

            fontWeight: [
                { value: '300', content: '<span style="font-weight: 300">Light</span>' },
                { value: 'Normal', content: '<span style="font-weight: Normal">Normal</span>' },
                { value: 'Bold', content: '<span style="font-weight: Bolder">Bold</span>' }
            ],

            fontFamily: [
                { value: 'Alegreya Sans', content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>' },
                { value: 'Averia Libre', content: '<span style="font-family: Averia Libre">Averia Libre</span>' },
                { value: 'Roboto Condensed', content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>' }
            ],

            strokeStyle: [
                { value: '0', content: 'Solid' },
                { value: '2,5', content: 'Dotted' },
                { value: '10,5', content: 'Dashed' }
            ],

            side: [
                { value: 'top', content: 'Top Side' },
                { value: 'right', content: 'Right Side' },
                { value: 'bottom', content: 'Bottom Side' },
                { value: 'left', content: 'Left Side' }
            ],

            portLabelPositionRectangle: [
                { value: { name: 'top', args: { y: -12 }}, content: 'Above' },
                { value: { name: 'right', args: { y: 0 }}, content: 'On Right' },
                { value: { name: 'bottom', args: { y: 12 }}, content: 'Below' },
                { value: { name: 'left', args: { y: 0 }}, content: 'On Left' }
            ],

            portLabelPositionEllipse: [
                { value: 'radial' , content: 'Horizontal' },
                { value: 'radialOriented' , content: 'Angled' }
            ],

            imageIcons: [
                { value: 'assets/image-icon1.svg', content: '<img height="42px" src="assets/image-icon1.svg"/>' },
                { value: 'assets/image-icon2.svg', content: '<img height="80px" src="assets/image-icon2.svg"/>' },
                { value: 'assets/image-icon3.svg', content: '<img height="80px" src="assets/image-icon3.svg"/>' },
                { value: 'assets/image-icon4.svg', content: '<img height="80px" src="assets/image-icon4.svg"/>' }
            ],

            imageGender: [
                { value: 'assets/member-male.png', content: '<img height="50px" src="assets/member-male.png" style="margin: 5px 0 0 2px;"/>' },
                { value: 'assets/member-female.png', content: '<img height="50px" src="assets/member-female.png" style="margin: 5px 0 0 2px;"/>' }
            ],

            arrowheadSize: [
                { value: 'M 0 0 0 0', content: 'None' },
                { value: 'M 0 -3 -6 0 0 3 z', content: 'Small' },
                { value: 'M 0 -5 -10 0 0 5 z', content: 'Medium' },
                { value: 'M 0 -10 -15 0 0 10 z', content: 'Large' },
            ],

            strokeWidth: [
                { value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
                { value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
                { value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
                { value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
            ],

            router: [
                { value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
                { value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
                { value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
            ],

            connector: [
                { value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
                { value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
                { value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
            ],

            labelPosition: [
                { value: 30, content: 'Close to source' },
                { value: 0.5, content: 'In the middle' },
                { value: -30, content: 'Close to target' },
            ],

            portMarkup: [{
                value: [{
                    tagName: 'rect',
                    selector: 'portBody',
                    attributes: {
                        'width': 20,
                        'height': 20,
                        'x': -10,
                        'y': -10
                    }
                }],
                content: 'Rectangle'
            }, {
                value: [{
                    tagName: 'circle',
                    selector: 'portBody',
                    attributes: {
                        'r': 10
                    }
                }],
                content: 'Circle'
            }, {
                value: [{
                    tagName: 'path',
                    selector: 'portBody',
                    attributes: {
                        'd': 'M -10 -10 10 -10 0 10 z'
                    }
                }],
                content: 'Triangle'
            }]
        };
        const inspectorShapes = {
            'app.Link': {
                inputs: {
                    attrs: {
                        line: {
                            strokeWidth: {
                                type: 'select-button-group',
                                options: options.strokeWidth,
                                group: 'connection',
                                label: 'Link thickness',
                                when: { ne: { 'attrs/line/stroke': 'transparent' }},
                                index: 4
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                group: 'connection',
                                label: 'Link style',
                                when: { ne: { 'attrs/line/stroke': 'transparent' }},
                                index: 5
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                group: 'connection',
                                label: 'Color',
                                index: 6
                            },
                            sourceMarker: {
                                d: {
                                    type: 'select-box',
                                    options: options.arrowheadSize,
                                    group: 'marker-source',
                                    label: 'Source arrowhead',
                                    index: 1
                                },
                                fill: {
                                    type: 'color-palette',
                                    options: options.colorPaletteReset,
                                    group: 'marker-source',
                                    label: 'Color',
                                    when: { ne: { 'attrs/line/sourceMarker/d': 'M 0 0 0 0' }},
                                    index: 2
                                }
                            },
                            targetMarker: {
                                d: {
                                    type: 'select-box',
                                    options: options.arrowheadSize,
                                    group: 'marker-target',
                                    label: 'Target arrowhead',
                                    index: 1
                                },
                                fill: {
                                    type: 'color-palette',
                                    options: options.colorPaletteReset,
                                    group: 'marker-target',
                                    label: 'Color',
                                    when: { ne: { 'attrs/line/targetMarker/d': 'M 0 0 0 0' }},
                                    index: 2
                                }
                            }
                        }
                    },
                    router: {
                        name: {
                            type: 'select-button-group',
                            options: options.router,
                            group: 'connection',
                            label: 'Connection type',
                            index: 1
                        },
                        args: {
                            side: {
                                type: 'select-box',
                                options: options.side,
                                placeholder: 'Pick a side',
                                group: 'connection',
                                label: 'Anchors side',
                                when: { eq: { 'router/name': 'oneSide' }, otherwise: { unset: true }},
                                index: 2
                            }
                        }
                    },
                    connector: {
                        name: {
                            type: 'select-button-group',
                            options: options.connector,
                            group: 'connection',
                            label: 'Connection style',
                            index: 3
                        }
                    },
                    labels: {
                        type: 'list',
                        group: 'labels',
                        label: 'Labels',
                        attrs: {
                            label: {
                                'data-tooltip': 'Set (possibly multiple) labels for the link',
                                'data-tooltip-position': 'right',
                                'data-tooltip-position-selector': '.joint-inspector'
                            }
                        },
                        item: {
                            type: 'object',
                            properties: {
                                attrs: {
                                    text: {
                                        text: {
                                            type: 'content-editable',
                                            html: false,
                                            label: 'text',
                                            defaultValue: 'label',
                                            index: 1,
                                            attrs: {
                                                label: {
                                                    'data-tooltip': 'Set text of the label',
                                                    'data-tooltip-position': 'right',
                                                    'data-tooltip-position-selector': '.joint-inspector'
                                                }
                                            }
                                        },
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: 'Text Color',
                                            index: 5
                                        }
                                    },
                                    rect: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: 'Fill',
                                            index: 3
                                        },
                                        stroke: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: 'Outline',
                                            index: 4
                                        }
                                    }
                                },
                                position: {
                                    type: 'select-box',
                                    options: options.labelPosition || [],
                                    defaultValue: 0.5,
                                    label: 'Position',
                                    placeholder: 'Custom',
                                    index: 2,
                                    attrs: {
                                        label: {
                                            'data-tooltip': 'Position the label relative to the source of the link',
                                            'data-tooltip-position': 'right',
                                            'data-tooltip-position-selector': '.joint-inspector'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                groups: {
                    connection: {
                        label: 'Connection',
                        index: 1
                    },
                    'marker-source': {
                        label: 'Source marker',
                        index: 2
                    },
                    'marker-target': {
                        label: 'Target marker',
                        index: 3
                    },
                    labels: {
                        label: 'Labels',
                        index: 4
                    }
                }
            },
            'standard.Rectangle': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                html: false,
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'standard.Ellipse': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                html: false,
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'standard.Polygon': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                html: false,
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'standard.Cylinder': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                html: false,
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        top: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'top',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'top',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'top',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'top',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    top: {
                        label: 'Top',
                        index: 2
                    },
                    text: {
                        label: 'Text',
                        index: 3
                    }
                }
            },
            'standard.Image': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                html: false,
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        image: {
                            xlinkHref: {
                                type: 'select-box',
                                options: options.imageIcons,
                                label: 'Image',
                                group: 'presentation',
                                index: 1
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'standard.InscribedImage': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                html: false,
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        image: {
                            xlinkHref: {
                                type: 'select-box',
                                options: options.imageIcons,
                                label: 'Image',
                                group: 'presentation',
                                index: 1
                            }
                        },
                        background: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 2
                            }
                        },
                        border: {
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 3
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 10,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/border/stroke': 'transparent' }},
                                index: 4
                            }
                        }
                    },
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'standard.EmbeddedImage': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        image: {
                            xlinkHref: {
                                type: 'select-box',
                                options: options.imageIcons,
                                label: 'Image',
                                group: 'image',
                                index: 1
                            }
                        }
                    }
                },
                groups: {
                    image: {
                        label: 'image',
                        index: 1
                    },
                    presentation: {
                        label: 'Presentation',
                        index: 2
                    },
                    text: {
                        label: 'Text',
                        index: 3
                    }
                }
            },
            'standard.HeaderedRectangle': {
                inputs: {
                    attrs: {
                        bodyText: {
                            textWrap: {
                                text: {
                                    type: 'content-editable',
                                    label: 'Wrapped text',
                                    group: 'text',
                                    index: 1
                                }
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/bodyText/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/bodyText/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/bodyText/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/boduText/text': '' }},
                                index: 5
                            }
                        },
                        headerText: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'headerText',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'headerText',
                                when: { ne: { 'attrs/headerText/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'headerText',
                                when: { ne: { 'attrs/headerText/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'headerText',
                                when: { ne: { 'attrs/headerText/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'headerText',
                                when: { ne: { 'attrs/headerText/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        header: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'header',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'header',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'header',
                                when: { ne: { 'attrs/header/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'header',
                                when: {
                                    and: [
                                        { ne: { 'attrs/header/stroke': 'transparent' }},
                                        { ne: { 'attrs/header/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    },
                    header: {
                        label: 'Header',
                        index: 3
                    },
                    headerText: {
                        label: 'Header Text',
                        index: 4
                    }
                }
            },
            'app.RectangularModel': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    },
                    ports: {
                        items: {
                            group: 'ports',
                            type: 'list',
                            label: 'Ports',
                            item: {
                                type: 'object',
                                properties: {
                                    group: {
                                        type: 'select-button-group',
                                        label: 'Group',
                                        defaultValue: 'out',
                                        options: [
                                            { value: 'in', content: 'IN' },
                                            { value: 'out', content: 'OUT' }
                                        ]
                                    },
                                    attrs: {
                                        portLabel: {
                                            text: { type: 'text', label: 'Label' }
                                        },
                                        portBody: {
                                            fill: {
                                                type: 'color-palette',
                                                options: options.colorPaletteReset,
                                                label: 'Override Group Fill',
                                                index: 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        groups: {
                            'in': {
                                attrs: {
                                    portBody: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPalette,
                                            label: 'Fill',
                                            when: { not: { equal: { inPorts: [] }}},
                                            group: 'inPorts',
                                            index: 1
                                        }
                                    }
                                },
                                position: {
                                    name: {
                                        type: 'select-box',
                                        options: options.side,
                                        label: 'Position',
                                        when: { not: { equal: { inPorts: [] }}},
                                        group: 'inPorts',
                                        index: 3
                                    }
                                },
                                label: {
                                    position: {
                                        type: 'select-box',
                                        options: options.portLabelPositionRectangle,
                                        label: 'Text Position',
                                        when: { not: { equal: { inPorts: [] }}},
                                        group: 'inPorts',
                                        index: 4
                                    }
                                },
                                markup: {
                                    type: 'select-box',
                                    options: options.portMarkup,
                                    label: 'Port Shape',
                                    group: 'inPorts',
                                    index: 5,
                                    overwrite: true
                                }
                            },
                            'out': {
                                attrs: {
                                    portBody: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPalette,
                                            label: 'Fill',
                                            when: { not: { equal: { outPorts: [] }}},
                                            group: 'outPorts',
                                            index: 2
                                        }
                                    }
                                },
                                position: {
                                    name: {
                                        type: 'select-box',
                                        options: options.side,
                                        label: 'Position',
                                        when: { not: { equal: { outPorts: [] }}},
                                        group: 'outPorts',
                                        index: 4
                                    }
                                },
                                label: {
                                    position: {
                                        type: 'select-box',
                                        options: options.portLabelPositionRectangle,
                                        label: 'Text Position',
                                        when: { not: { equal: { outPorts: [] }}},
                                        group: 'outPorts',
                                        index: 5
                                    }
                                },
                                markup: {
                                    type: 'select-box',
                                    options: options.portMarkup,
                                    label: 'Port Shape',
                                    group: 'outPorts',
                                    index: 6,
                                    overwrite: true
                                }
                            }
                        }
                    }
                },
                groups: {
                    inPorts: {
                        label: 'Input Ports Defaults',
                        index: 1
                    },
                    outPorts: {
                        label: 'Output Ports Defaults',
                        index: 2
                    },
                    ports: {
                        label: 'Ports',
                        index: 3
                    },
                    presentation: {
                        label: 'Presentation',
                        index: 4
                    },
                    text: {
                        label: 'Text',
                        index: 5
                    }
                }
            },
            'app.CircularModel': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' }},
                                index: 5
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/body/stroke': 'transparent' }},
                                index: 3
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/body/stroke': 'transparent' }},
                                        { ne: { 'attrs/body/strokeWidth': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    },
                    ports: {
                        items: {
                            group: 'ports',
                            type: 'list',
                            label: 'Ports',
                            item: {
                                type: 'object',
                                properties: {
                                    group: {
                                        type: 'select-button-group',
                                        label: 'Group',
                                        defaultValue: 'out',
                                        options: [
                                            { value: 'in', content: 'IN' },
                                            { value: 'out', content: 'OUT' }
                                        ]
                                    },
                                    attrs: {
                                        portLabel: {
                                            text: { type: 'text', label: 'Label' }
                                        },
                                        portBody: {
                                            fill: {
                                                type: 'color-palette',
                                                options: options.colorPaletteReset,
                                                label: 'Override Group Fill',
                                                index: 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        groups: {
                            'in': {
                                attrs: {
                                    portBody: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPalette,
                                            label: 'Fill',
                                            when: { not: { equal: { 'ports/items': [] }}},
                                            group: 'inPorts',
                                            index: 1
                                        }
                                    }
                                },
                                position: {
                                    args: {
                                        startAngle: {
                                            type: 'range',
                                            min: 0,
                                            max: 360,
                                            step: 1,
                                            defaultValue: 0,
                                            unit: '°',
                                            label: 'Position',
                                            when: { not: { equal: { 'ports/items': [] }}},
                                            group: 'inPorts',
                                            index: 3
                                        }
                                    }
                                },
                                label: {
                                    position: {
                                        name: {
                                            type: 'select-button-group',
                                            options: options.portLabelPositionEllipse,
                                            label: 'Text direction',
                                            when: { not: { equal: { 'ports/items': [] }}},
                                            group: 'inPorts',
                                            index: 4
                                        }
                                    }
                                },
                                markup: {
                                    type: 'select-box',
                                    options: options.portMarkup,
                                    label: 'Port Shape',
                                    group: 'inPorts',
                                    index: 5,
                                    overwrite: true
                                }
                            },
                            'out': {
                                attrs: {
                                    portBody: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPalette,
                                            label: 'Fill',
                                            when: { not: { equal: { 'ports/items': [] }}},
                                            group: 'outPorts',
                                            index: 2
                                        }
                                    }
                                },
                                position: {
                                    args: {
                                        startAngle: {
                                            type: 'range',
                                            min: 0,
                                            max: 360,
                                            step: 1,
                                            defaultValue: 180,
                                            unit: '°',
                                            label: 'Position',
                                            when: { not: { equal: { 'ports/items': [] }}},
                                            group: 'outPorts',
                                            index: 4
                                        }
                                    }
                                },
                                label: {
                                    position: {
                                        name: {
                                            type: 'select-button-group',
                                            options: options.portLabelPositionEllipse,
                                            label: 'Text Position',
                                            when: { not: { equal: { 'ports/items': [] }}},
                                            group: 'outPorts',
                                            index: 5
                                        }
                                    }
                                },
                                markup: {
                                    type: 'select-box',
                                    options: options.portMarkup,
                                    label: 'Port Shape',
                                    group: 'outPorts',
                                    index: 6,
                                    overwrite: true
                                }
                            }
                        }
                    }
                },
                groups: {
                    inPorts: {
                        label: 'Input Ports Defaults',
                        index: 1
                    },
                    outPorts: {
                        label: 'Output Ports Defaults',
                        index: 2
                    },
                    ports: {
                        label: 'Ports',
                        index: 3
                    },
                    presentation: {
                        label: 'Presentation',
                        index: 4
                    },
                    text: {
                        label: 'Text',
                        index: 5
                    }
                }
            },
            'fsa.StartState': {
                inputs: {
                    attrs: {
                        circle: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    }
                }
            },
            'fsa.EndState': {
                inputs: {
                    attrs: {
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        '.inner': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Inner fill',
                                group: 'presentation',
                                index: 2
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'fsa.State': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        circle: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/circle/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/circle/stroke': 'transparent' }},
                                        { ne: { 'attrs/circle/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'pn.Place': {
                inputs: {
                    attrs: {
                        '.label': {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 5
                            }
                        },
                        '.root': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/.root/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.root/stroke': 'transparent' }},
                                        { ne: { 'attrs/.root/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    },
                    tokens: {
                        type: 'number',
                        min: 1,
                        max: 500,
                        group: 'data',
                        index: 1
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 2
                    },
                    text: {
                        label: 'Text',
                        index: 3
                    },
                    data: {
                        label: 'Data',
                        index: 1
                    }
                }
            },
            'pn.Transition': {
                inputs: {
                    attrs: {
                        '.label': {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/.label/text': '' }},
                                index: 5
                            }
                        },
                        rect: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/rect/stroke': 'transparent' }},
                                index: 2
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/rect/stroke': 'transparent' }},
                                        { ne: { 'attrs/rect/stroke-width': 0 }}
                                    ]
                                },
                                index: 3
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'erd.Entity': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'erd.WeakEntity': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'outer',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'outer',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'outer',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'outer',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        '.inner': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'inner',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'inner',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'inner',
                                when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'inner',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                        { ne: { 'attrs/.inner/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    text: {
                        label: 'Text',
                        index: 1
                    },
                    outer: {
                        label: 'Outer rectangle',
                        index: 2
                    },
                    inner: {
                        label: 'Inner rectangle',
                        index: 3
                    }
                }
            },
            'erd.Relationship': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'erd.IdentifyingRelationship': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'outer',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'outer',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'outer',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'outer',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        '.inner': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'inner',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'inner',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'inner',
                                when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'inner',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                        { ne: { 'attrs/.inner/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    text: {
                        label: 'Text',
                        index: 1
                    },
                    outer: {
                        label: 'Outer polygon',
                        index: 2
                    },
                    inner: {
                        label: 'Inner polygon',
                        index: 3
                    }
                }
            },
            'erd.Key': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'outer',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'outer',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'outer',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'outer',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        '.inner': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'inner',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'inner',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'inner',
                                when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'inner',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                        { ne: { 'attrs/.inner/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    text: {
                        label: 'Text',
                        index: 1
                    },
                    outer: {
                        label: 'Outer ellipse',
                        index: 2
                    },
                    inner: {
                        label: 'Inner ellipse',
                        index: 3
                    }
                }
            },
            'erd.Normal': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'erd.Multivalued': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'outer',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'outer',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'outer',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'outer',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        '.inner': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'inner',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'inner',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'inner',
                                when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'inner',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                        { ne: { 'attrs/.inner/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    text: {
                        label: 'Text',
                        index: 1
                    },
                    outer: {
                        label: 'Outer ellipse',
                        index: 2
                    },
                    inner: {
                        label: 'Inner ellipse',
                        index: 3
                    }
                }
            },
            'erd.Derived': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        '.outer': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'outer',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'outer',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'outer',
                                when: { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'outer',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.outer/stroke': 'transparent' }},
                                        { ne: { 'attrs/.outer/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        '.inner': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'inner',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'inner',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'inner',
                                when: { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'inner',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.inner/stroke': 'transparent' }},
                                        { ne: { 'attrs/.inner/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    text: {
                        label: 'Text',
                        index: 1
                    },
                    outer: {
                        label: 'Outer ellipse',
                        index: 2
                    },
                    inner: {
                        label: 'Inner ellipse',
                        index: 3
                    }
                }
            },
            'erd.ISA': {
                inputs: {
                    attrs: {
                        text: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/text/text': '' }},
                                index: 5
                            }
                        },
                        polygon: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/polygon/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/polygon/stroke': 'transparent' }},
                                        { ne: { 'attrs/polygon/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'uml.Class': {
                inputs: {
                    attrs: {
                        '.uml-class-name-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'name',
                                index: 4
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'name',
                                index: 5
                            }
                        },
                        '.uml-class-attrs-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'attributes',
                                index: 4
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'attributes',
                                index: 5
                            }
                        },
                        '.uml-class-methods-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'methods',
                                index: 4
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'methods',
                                index: 5
                            }
                        }
                    },
                    name: {
                        type: 'text',
                        group: 'name',
                        index: 1,
                        label: 'Class name'
                    },
                    attributes: {
                        type: 'list',
                        item: {
                            type: 'text'
                        },
                        group: 'attributes',
                        index: 1,
                        label: 'Attributes'
                    },
                    methods: {
                        type: 'list',
                        item: {
                            type: 'text'
                        },
                        group: 'methods',
                        index: 1,
                        label: 'Methods'
                    }
                },
                groups: {
                    name: {
                        label: 'Class name',
                        index: 1
                    },
                    attributes: {
                        label: 'Attributes',
                        index: 2
                    },
                    methods: {
                        label: 'Methods',
                        index: 3
                    }
                }
            },
            'uml.Interface': {
                inputs: {
                    attrs: {
                        '.uml-class-name-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'name',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'name',
                                index: 2
                            }
                        },
                        '.uml-class-attrs-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'attributes',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'attributes',
                                index: 2
                            }
                        },
                        '.uml-class-methods-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'methods',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'methods',
                                index: 2
                            }
                        }
                    },
                    name: {
                        type: 'text',
                        group: 'name',
                        index: 0,
                        label: 'Interface name'
                    },
                    attributes: {
                        type: 'list',
                        item: {
                            type: 'text'
                        },
                        group: 'attributes',
                        index: 0,
                        label: 'Attributes'
                    },
                    methods: {
                        type: 'list',
                        item: {
                            type: 'text'
                        },
                        group: 'methods',
                        index: 0,
                        label: 'Methods'
                    }
                },
                groups: {
                    name: {
                        label: 'Interface name',
                        index: 1
                    },
                    attributes: {
                        label: 'Attributes',
                        index: 2
                    },
                    methods: {
                        label: 'Methods',
                        index: 3
                    }
                }
            },
            'uml.Abstract': {
                inputs: {
                    attrs: {
                        '.uml-class-name-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'name',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'name',
                                index: 2
                            }
                        },
                        '.uml-class-attrs-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'attributes',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'attributes',
                                index: 2
                            }
                        },
                        '.uml-class-methods-rect': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'methods',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'methods',
                                index: 2
                            }
                        }
                    },
                    name: {
                        type: 'text',
                        group: 'name',
                        index: 0,
                        label: 'Abstract class name'
                    },
                    attributes: {
                        type: 'list',
                        item: {
                            type: 'text'
                        },
                        group: 'attributes',
                        index: 0,
                        label: 'Attributes'
                    },
                    methods: {
                        type: 'list',
                        item: {
                            type: 'text'
                        },
                        group: 'methods',
                        index: 0,
                        label: 'Methods'
                    }
                },
                groups: {
                    name: {
                        label: 'Abstract class name',
                        index: 1
                    },
                    attributes: {
                        label: 'Attributes Text',
                        index: 2
                    },
                    methods: {
                        label: 'Methods Text',
                        index: 3
                    }
                }
            },
            'uml.State': {
                inputs: {
                    name: {
                        group: 'text',
                        index: 1,
                        type: 'text'
                    },
                    events: {
                        group: 'events',
                        index: 1,
                        type: 'list',
                        item: {
                            type: 'text'
                        }
                    },
                    attrs: {
                        '.uml-state-name': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'name': '' }},
                                index: 5
                            }
                        },
                        '.uml-state-body': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/.uml-state-body/stroke': 'transparent' }},
                                index: 4
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.uml-state-body/stroke': 'transparent' }},
                                        { ne: { 'attrs/.uml-state-body/stroke-width': 0 }}
                                    ]
                                },
                                index: 5
                            }
                        },
                        '.uml-state-separator': {
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Horizontal rule outline',
                                group: 'presentation',
                                index: 3
                            }
                        },
                        '.uml-state-events': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'events',
                                when: { ne: { 'events': 0 }},
                                index: 5
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'State name text',
                        index: 2
                    },
                    events: {
                        label: 'State events text',
                        index: 3
                    }
                }
            },
            'org.Member': {
                inputs: {
                    attrs: {
                        '.rank': {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'rank',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'rank',
                                when: { ne: { 'attrs/.rank/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'rank',
                                when: { ne: { 'attrs/.rank/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'rank',
                                when: { ne: { 'attrs/.rank/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'rank',
                                when: { ne: { 'attrs/.rank/text': '' }},
                                index: 5
                            }
                        },
                        '.name': {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'name',
                                index: 1
                            },
                            'font-size': {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'name',
                                when: { ne: { 'attrs/.name/text': '' }},
                                index: 2
                            },
                            'font-family': {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'name',
                                when: { ne: { 'attrs/.name/text': '' }},
                                index: 3
                            },
                            'font-weight': {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'name',
                                when: { ne: { 'attrs/.name/text': '' }},
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'name',
                                when: { ne: { 'attrs/.name/text': '' }},
                                index: 5
                            }
                        },
                        '.card': {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 2
                            },
                            'stroke-width': {
                                type: 'range',
                                min: 0,
                                max: 30,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/.card/stroke': 'transparent' }},
                                index: 3
                            },
                            'stroke-dasharray': {
                                type: 'select-box',
                                options: options.strokeStyle,
                                label: 'Outline style',
                                group: 'presentation',
                                when: {
                                    and: [
                                        { ne: { 'attrs/.card/stroke': 'transparent' }},
                                        { ne: { 'attrs/.card/stroke-width': 0 }}
                                    ]
                                },
                                index: 4
                            }
                        },
                        image: {
                            'xlink:href': {
                                type: 'select-button-group',
                                options: options.imageGender,
                                label: 'Gender',
                                group: 'gender',
                                index: 1
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 4
                    },
                    rank: {
                        label: 'Rank',
                        index: 2
                    },
                    name: {
                        label: 'Name',
                        index: 3
                    },
                    gender: {
                        label: 'Gender',
                        index: 1
                    }
                }
            }

        };

        const inspectorOpts = Object.assign({ cell }, inspectorShapes[cell.get("type")]);
        return joint.ui.Inspector.create(document.getElementById('inspector'),inspectorOpts);
    }
    initializeToolsAndInspector() {

        this.paper.on({

            'cell:pointerup': function(cellView) {
                var cell = cellView.model;
                var collection = this.selection.collection;
                if (collection.includes(cell)) return;
                collection.reset([cell]);
            },

            'link:mouseenter': function(linkView) {

                // Open tool only if there is none yet
                if (linkView.hasTools()) return;

                var ns = joint.linkTools;
                var toolsView = new joint.dia.ToolsView({
                    name: 'link-hover',
                    tools: [
                        new ns.Vertices({ vertexAdding: false }),
                        new ns.SourceArrowhead(),
                        new ns.TargetArrowhead()
                    ]
                });

                linkView.addTools(toolsView);
            },

            'link:mouseleave': function(linkView) {
                // Remove only the hover tool, not the pointerdown tool
                if (linkView.hasTools('link-hover')) {
                    linkView.removeTools();
                }
            }

        }, this);

        this.graph.on('change', function(cell, opt) {

            if (!cell.isLink() || !opt.inspector) return;

            var ns = joint.linkTools;
            var toolsView = new joint.dia.ToolsView({
                name: 'link-inspected',
                tools: [
                    new ns.Boundary({ padding: 15 }),
                ]
            });

            cell.findView(this.paper).addTools(toolsView);

        }, this)
    }
    initializeToolbar() {

        var toolbar = this.toolbar = new joint.ui.Toolbar({
            autoToggle: true,
            groups: {
                'undo-redo': { index: 1 },
                'clear': { index: 2 },
                'export': { index: 3 },
                'print': { index: 4 },
                'fullscreen': { index: 5 },
                'order': { index: 6 },
                'layout': { index: 7 },
                'zoom': { index: 8 },
                'grid': { index: 9 },
                'snapline': { index: 10 }
            },
            tools: [
                {
                    type: 'undo',
                    name: 'undo',
                    group: 'undo-redo',
                    attrs: {
                        button: {
                            'data-tooltip': 'Undo',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'redo',
                    name: 'redo',
                    group: 'undo-redo',
                    attrs: {
                        button: {
                            'data-tooltip': 'Redo',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'clear',
                    group: 'clear',
                    attrs: {
                        button: {
                            id: 'btn-clear',
                            'data-tooltip': 'Clear Paper',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                /*{
                    type: 'button',
                    name: 'svg',
                    group: 'export',
                    text: 'Export SVG',
                    attrs: {
                        button: {
                            id: 'btn-svg',
                            'data-tooltip': 'Open as SVG in a pop-up',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'png',
                    group: 'export',
                    text: 'Export PNG',
                    attrs: {
                        button: {
                            id: 'btn-png',
                            'data-tooltip': 'Open as PNG in a pop-up',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },*/
                {
                    type: 'button',
                    name: 'print',
                    group: 'print',
                    attrs: {
                        button: {
                            id: 'btn-print',
                            'data-tooltip': 'Open a Print Dialog',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'to-front',
                    group: 'order',
                    text: 'Send To Front',
                    attrs: {
                        button: {
                            id: 'btn-to-front',
                            'data-tooltip': 'Bring Object to Front',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'to-back',
                    group: 'order',
                    text: 'Send To Back',
                    attrs: {
                        button: {
                            id: 'btn-to-back',
                            'data-tooltip': 'Send Object to Back',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    group: 'layout',
                    name: 'layout',
                    attrs: {
                        button: {
                            id: 'btn-layout',
                            'data-tooltip': 'Auto-layout Graph',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'zoom-to-fit',
                    name: 'zoom-to-fit',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom To Fit',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'zoom-out',
                    name: 'zoom-out',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom Out',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'label',
                    name: 'zoom-slider-label',
                    group: 'zoom',
                    text: 'Zoom:'
                },
                {
                    type: 'zoom-slider',
                    name: 'zoom-slider',
                    group: 'zoom'
                },
                {
                    type: 'zoom-in',
                    name: 'zoom-in',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom In',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'separator',
                    group: 'grid'
                },
                {
                    type: 'label',
                    name: 'grid-size-label',
                    group: 'grid',
                    text: 'Grid size:',
                    attrs: {
                        label: {
                            'data-tooltip': 'Change Grid Size',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'range',
                    name: 'grid-size',
                    group: 'grid',
                    text: 'Grid size:',
                    min: 1,
                    max: 50,
                    step: 1,
                    value: 10
                },
                {
                    type: 'separator',
                    group: 'snapline'
                },
                {
                    type: 'checkbox',
                    name: 'snapline',
                    group: 'snapline',
                    label: 'Snaplines:',
                    value: true,
                    attrs: {
                        input: {
                            id: 'snapline-switch'
                        },
                        label: {
                            'data-tooltip': 'Enable/Disable Snaplines',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'fullscreen',
                    name: 'fullscreen',
                    group: 'fullscreen',
                    attrs: {
                        button: {
                            'data-tooltip': 'Toggle Fullscreen Mode',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                }
            ],
            references: {
                paperScroller: this.paperScroller,
                commandManager: this.commandManager
            }
        });

        toolbar.on({
            'svg:pointerclick': this.openAsSVG.bind(this),
            'png:pointerclick': this.openAsPNG.bind(this),
            'to-front:pointerclick': this.applyOnSelection.bind(this, 'toFront'),
            'to-back:pointerclick': this.applyOnSelection.bind(this, 'toBack'),
            'layout:pointerclick': this.layoutDirectedGraph.bind(this),
            'snapline:change': this.changeSnapLines.bind(this),
            'clear:pointerclick': this.graph.clear.bind(this.graph),
            'print:pointerclick': this.paper.print.bind(this.paper),
            'grid-size:change': this.paper.setGridSize.bind(this.paper)
        });

        document.getElementById('toolbar-container').append(toolbar.el);
        toolbar.render();
    }
    applyOnSelection(method) {
        this.graph.startBatch('selection');
        this.selection.collection.models.forEach(function(model) { model[method](); });
        this.graph.stopBatch('selection');
    }
    changeSnapLines(checked) {

        if (checked) {
            this.snaplines.enable();
        } else {
            this.snaplines.disable();
        }
    }
    // exportStylesheet: '.scalable * { vector-effect: non-scaling-stroke }',
    initializeTooltips() {

        new joint.ui.Tooltip({
            rootTarget: document.body,
            target: '[data-tooltip]',
            direction: 'auto',
            padding: 10,
            animation: true
        });
    }
    openAsSVG() {

        var paper = this.paper;
        paper.hideTools().toSVG(function(svg) {
            new joint.ui.Lightbox({
                image: 'data:image/svg+xml,' + encodeURIComponent(svg),
                downloadable: true,
                fileName: 'Rappid'
            }).open();
            paper.showTools();
        }, {
            preserveDimensions: true,
            convertImagesToDataUris: true,
            useComputedStyles: false,
            stylesheet: this.exportStylesheet
        });
    }
    openAsPNG() {

        var paper = this.paper;
        paper.hideTools().toPNG(function(dataURL) {
            new joint.ui.Lightbox({
                image: dataURL,
                downloadable: true,
                fileName: 'Rappid'
            }).open();
            paper.showTools();
        }, {
            padding: 10,
            useComputedStyles: false,
            stylesheet: this.exportStylesheet
        });
    }
    layoutDirectedGraph() {

        joint.layout.DirectedGraph.layout(this.graph, {
            setLinkVertices: true,
            rankDir: 'TB',
            marginX: 100,
            marginY: 100
        });

        this.paperScroller.centerContent({ useModelGeometry: true });
    }

}
