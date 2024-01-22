// import {Lifeline} from "./lifeline.js"
// import {Actor} from "./actor.js"
// import {Link} from "./link.js"
// import {Occurrence} from "./occurrence.js";

 class Package{
    constructor(json){
        this.id = this._getUuid
        this.collaId = this._getUuid
        this.interactId = this._getUuid
        this.diagramID = this._getUuid
        this.lifelines = []
        this.actors = []
        this.occurrences = []
        this.links = []
        this.auxLifeLinks = []
        this.auxOccLinks = []
        this.json = json
    }

    /** =============== GETTERS AND SETTERS =============== **/

    /**
     * Retorna el documento json con el que se instancia la clase
     * @returns {this.json}
     */
    get getJsonDoc(){
        return this.json
    }

    /**
     * Genera y retorna un Uuid para los identificadores de las secciones del documento xml
     * @returns {string}
     * @private
     */
    get _getUuid(){
        // credit: http://stackoverflow.com/posts/2117523/revisions

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0;
            var v = (c === 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Retorna el ID del elemento package
     * @returns {*}
     */
    get getId(){
        return this.id;
    }

    /**
     * Retorna el ID del elemento Collaboration
     * @returns {*}
     */
    get getCollabId(){
        return this.collaId
    }

    /**
     * Retorna el ID del elemento Interaction
     * @returns {*}
     */
    get getIntercatId(){
        return this.interactId
    }

    /**
     * Retorna el ID del elemento Diagram
     * @returns {*}
     */
    get getDiagramId(){
        return this.diagramID;
    }

    /**
     * Retorna la lista de objetos tipo Link
     * @returns {this.links[]}
     */
    getLinks(){
        return this.links
    }

    getOccurrences(){
        return this.occurrences
    }

    /**
     * Retorna la lista de objetos tipo actor
     * @returns {this.actors[]}
     */
    getActors(){
        return this.actors
    }

    /**
     * Retorna la lista de objetos tipo Lifeline
     * @returns {this.lifeline[]}
     */
    getLifelines(){
        return this.lifelines
    }

    /** ================================================= **/

    /** ================ Procedimientos ================ **/

    /**
     * Estructura los datos del json para posteriormente convertirlos en objetos
     */
    getArrayOfArraysFromJson() {
        let jsonData = this.getJsonDoc
        for (const cell of jsonData.cells) {
            if (cell.type === "sequence.LifeLine")
            {
                let array = [cell.id, cell.attrs.label["text"], cell.position["x"] + cell.size["width"], cell.position["y"] + cell.size["height"]];
                this.lifelines.push(array)

            }
            else if (cell.type === "standard.Link")
            {
                if (/*cell.source.hasOwnProperty('id') &&*/ cell.target.hasOwnProperty('id')) {
                    let array = []
                    array = [cell.id, cell.source.id, cell.target.id];
                    cell.hasOwnProperty('labels') ? array.push(cell.labels[0].attrs.text["text"]) : array.push('');
                    !cell.attrs.line ? array.push('') : array.push(cell.attrs.line.strokeDasharray);

                    this.links.push(array)
                }
                /*else{
                    let array = []
                    array = [cell.id, cell.source.id, ""];
                    cell.hasOwnProperty('labels') ? array.push(cell.labels[0].attrs.text["text"]) : array.push('');
                    !cell.attrs.line ? array.push('') : array.push(cell.attrs.line.strokeDasharray);
                    this.links.push(array)

                }*/
            }
            else if (cell.type === 'org.Member')
            {
                let array = [cell.id, cell.attrs[".name"].text, cell.position["x"] + cell.size["width"], cell.position["y"] + cell.size["height"]];
                this.actors.push(array)

            }
            else if (cell.type === 'sequence.Activation')
            {
                let array = [cell.id, cell.position["x"] + cell.size["width"], cell.position["y"] + cell.size["height"]];
                this.occurrences.push(array)
            }
        }
        this.determineLifelinesOfTheOccurrences(jsonData)
        this.getLifelinesObjects()
        this.getActorsObjects()
        this.getOccurrencesObjects()
        this.getLinksObjects()
        console.log('revisa')
    }
    exist(array, propertyToLookFor ){
        let exist  = false;
        array.map(arr => {
            if( arr[0] === propertyToLookFor ){
                exist = true
                return exist
            }
        });
        return exist
    }
    determineLifelinesOfTheOccurrences(jsonData){
        let lifeLineX = []; let lifeOcc = [];
        // let activationID = '';
        for (const cell of jsonData.cells){
            if(cell.type === "standard.Link"){
                let sourceId = cell.source.id
                if(this.exist(this.occurrences, sourceId)){
                    let array = []
                    array = [cell.id, cell.source.id, ""];
                    cell.hasOwnProperty('labels') ? array.push(cell.labels[0].attrs.text["text"]) : array.push('');
                    !cell.attrs.line ? array.push('') : array.push(cell.attrs.line.strokeDasharray);
                    this.links.push(array)
                }




                this.getLifelines().map(lifelink =>{
                    if(lifelink[0] === sourceId){
                        this.auxLifeLinks.push(lifelink)
                        lifeLineX.push(lifelink[2])
                    }
                });
                this.getActors().map(lifelink =>{
                    if(lifelink[0] === sourceId){
                        this.auxLifeLinks.push(lifelink)
                        lifeLineX.push(lifelink[2])

                    }
                });
                this.getOccurrences().map(occlink =>{
                    if(occlink[0] === sourceId){
                        this.auxOccLinks.push(occlink)
                        lifeOcc.push(occlink[1])
                    }
                });

            }
        }
        let aux = 0;
        for(let i = 0; i < lifeLineX.length; i++ ){
            for(let j = 0; j < lifeOcc.length;j++){
                if(lifeOcc[j] > aux && lifeOcc[j] < lifeLineX[i]){
                    if(lifeOcc[j] !== lifeOcc[j+1] &&  lifeOcc[j+1] != null ) {
                        aux = lifeOcc[j]
                    }
                    this.occurrences[j].push(this.auxLifeLinks[i][0])
                }
            }
        }

    }

    /**
     * Convierte en objetos tipo Actor a partir de los datos estructurados del documento json
     */
    getActorsObjects(){
        let auxLinks = [];
        this.actors.map(actor =>{
            let actorObject = new Actor(actor[0], actor[1])
            auxLinks.push(actorObject)
        });
        this.actors = auxLinks;
    }
    /**
     * Convierte en objetos tipo LifeLine a partir de los datos estructurados del documento json
     */
    getLifelinesObjects(){
        let auxLifelines = [];
        this.lifelines.map(lifeline =>{
            let lifeLinfeObject = new Lifeline(lifeline[0], lifeline[1])
            auxLifelines.push(lifeLinfeObject)
        });
        this.lifelines = auxLifelines;
    }
    /**
     * Convierte en objetos tipo Link a partir de los datos estructurados del documento json
     */
    getLinksObjects(){
        let auxLinks = [];
        this.links.map(link =>{
            let linkObject = new Link(link[0], link[1], link[2], link[3], link[4])
            auxLinks.push(linkObject)
        });
        this.links = auxLinks;
    }
    getOccurrencesObjects(){
        let auxOcc = [];
        this.occurrences.map(occ => {
            let occObject = new Occurrence(occ[0],occ[3])
            auxOcc.push(occObject)
        });
        this.occurrences = auxOcc;

    }


    /** ================================================ **/

    /** ================ Generacion del documento XML ================ **/

    generateCompleteFile(){
        let result = ' ';
        result = result
            + this.generateBaseDocuemnt()
            + this.generateOpenXmiTag()
            + this.generateCloseXmiTag();
        return result;
    }
    generateBaseDocuemnt(){
        let tag;
        tag =
            '<?xml version="1.0" encoding="windows-1252"?>\n';
        return tag;
    }
    generateOpenXmiTag(){
        let tag;
        tag =
            '<xmi:XMI xmi:version="2.1" xmlns:uml="http://schema.omg.org/spec/UML/2.1" xmlns:xmi="http://schema.omg.org/spec/XMI/2.1">\n'+
            '\t<xmi:Documentation exporter="BolivianDev" exporterVersion="1.0"/>\n';
        return tag;
    }
    generateCloseXmiTag(){
        let tag;
        tag ='</xmi:XMI>\n';
        return tag;
    }
    generateUmlModelSection(){
        let headTag;
        headTag =
            '\t<uml:Model xmi:type="uml:Model" name="EA_Model" visibility="public">\n'+
            '\t\t<packagedElement xmi:type="uml:Package" xmi:id="'+this.getId+'" name="My project" visibility="public">\n'+
            '\t\t\t<packagedElement xmi:type="uml:Collaboration" xmi:id="'+this.getCollabId+'" name="EA_Collaboration1" visibility="public">\n'+
            '\t\t\t\t<ownedBehavior xmi:type="uml:Interaction" xmi:id="'+this.getIntercatId+'" name="EA_Interaction1" visibility="public">\n';
        let middleTag;
        middleTag =
            '\t\t\t\t\t Aqui vienen todos los elementos \n';
        for(let i=0; i<= this.lifelines.length; i++){
            new Lifeline()
        }
        let footTag;
        footTag =
            '\t\t\t\t</ownedBehavior>\n'+
            '\t\t\t</packagedElement>\n'+
            '\t\t @ \n'+
            '\t\t</packagedElement>\n'+
            '\t</uml:Model>';
        return headTag+ middleTag + footTag;
    }
    generateXmiExtensionSection(){
        let headTag;
        let openElementsTag;
        let closeElementsTag;
        let openConnectorsTag;
        let closeConnectorsTag;
        let footTag;
        headTag  =
            '\t<xmi:Extension extender="Enterprise Architect" extenderID="6.5">\n';
        openElementsTag = '\t\t<elements>\n';
        closeElementsTag = '\t\t</elements>\n';
        openConnectorsTag = '\t\t<connectors>\n';
        closeConnectorsTag = '\t\t</connectors>\n';
        footTag =
            '\t\t<primitivetypes>\n' +
            '\t\t\t<packagedElement xmi:type="uml:Package" xmi:id="EAPrimitiveTypesPackage" name="EA_PrimitiveTypes_Package" visibility="public"/>\n' +
            '\t\t</primitivetypes>\n' +
            '\t\t<profiles/>'+
            this.generateDiagramsSection();
        return headTag + openElementsTag + closeElementsTag +
            openConnectorsTag + closeConnectorsTag + footTag;
    }
    generateDiagramsSection(){
        let tag;
        tag =
            '\t\t<diagrams>\n' +
            '\t\t\t<diagram xmi:id="'+ this.getDiagramId+'">\n' +
            '\t\t\t\t<model package="'+this.getId+'" localID="1" owner="'+this.getId+'"/>\n' +
            '\t\t\t\t<properties name="My sequence diagram" type="Sequence" documentation="GenerateDocs"/>\n' +
            '\t\t\t\t<project author="willi" version="1.0" created="2023-09-28 15:44:26" modified="2023-10-11 23:21:44"/>\n' +
            '\t\t\t\t<style1 value="ShowPrivate=1;ShowProtected=1;ShowPublic=1;HideRelationships=0;Locked=0;Border=1;HighlightForeign=1;PackageContents=1;SequenceNotes=0;ScalePrintImage=0;PPgs.cx=1;PPgs.cy=1;DocSize.cx=826;DocSize.cy=1169;ShowDetails=0;Orientation=P;Zoom=100;ShowTags=0;OpParams=1;VisibleAttributeDetail=0;ShowOpRetType=1;ShowIcons=1;CollabNums=0;HideProps=0;ShowReqs=0;ShowCons=0;PaperSize=9;HideParents=0;UseAlias=0;HideAtts=0;HideOps=0;HideStereo=0;HideElemStereo=0;ShowTests=0;ShowMaint=0;ConnectorNotation=UML 2.1;ExplicitNavigability=0;ShowShape=1;AllDockable=0;AdvancedElementProps=1;AdvancedFeatureProps=1;AdvancedConnectorProps=1;m_bElementClassifier=1;SPT=1;ShowNotes=0;SuppressBrackets=0;SuppConnectorLabels=0;PrintPageHeadFoot=0;ShowAsList=0;"/>\n' +
            '\t\t\t\t<style2 value="ExcludeRTF=0;DocAll=0;HideQuals=0;AttPkg=1;ShowTests=0;ShowMaint=0;SuppressFOC=0;INT_ARGS=;INT_RET=;INT_ATT=;SeqTopMargin=50;MatrixActive=0;SwimlanesActive=1;KanbanActive=0;MatrixLineWidth=1;MatrixLineClr=0;MatrixLocked=0;TConnectorNotation=UML 2.1;TExplicitNavigability=0;AdvancedElementProps=1;AdvancedFeatureProps=1;AdvancedConnectorProps=1;m_bElementClassifier=1;SPT=1;MDGDgm=;STBLDgm=;ShowNotes=0;VisibleAttributeDetail=0;ShowOpRetType=1;SuppressBrackets=0;SuppConnectorLabels=0;PrintPageHeadFoot=0;ShowAsList=0;SuppressedCompartments=;Theme=:119;SaveTag=F415043A;"/>\n' +
            '\t\t\t\t<swimlanes value="locked=false;orientation=0;width=0;inbar=false;names=false;color=-1;bold=false;fcol=0;tcol=-1;ofCol=-1;ufCol=-1;hl=0;ufh=0;hh=0;cls=0;bw=0;hli=0;SwimlaneFont=lfh:-13,lfw:0,lfi:0,lfu:0,lfs:0,lfface:Calibri,lfe:0,lfo:0,lfchar:1,lfop:0,lfcp:0,lfq:0,lfpf=0,lfWidth=0;"/>\n' +
            '\t\t\t\t<matrixitems value="locked=false;matrixactive=false;swimlanesactive=true;kanbanactive=false;width=1;clrLine=0;"/>\n' +
            '\t\t\t\t<extendedProperties/>\n' +
            '\t\t\t\t<elements>\n' +
            // '\t\t\t\t\t<element geometry="Left=210;Top=50;Right=301;Bottom=352;" subject="EAID_38EBFCA1_8307_4028_A6F8_B40730BCE784" seqno="1" style="DUID=12C57771;"/>\n' +
            // '\t\t\t\t\t<element geometry="Left=375;Top=50;Right=465;Bottom=352;" subject="EAID_40710416_3601_444b_A2A2_690F53FDBE20" seqno="2" style="DUID=662E9B66;"/>\n' +
            '\t\t\t\t\t<element geometry="Left=34;Top=50;Right=124;Bottom=352;" subject="EAID_7570BA22_0C31_4e38_AF7C_EFB962430769" seqno="3" style="DUID=FB3E7F43;"/>\n' +
            '\t\t\t\t\t<element geometry="SX=0;SY=0;EX=0;EY=0;Path=;" subject="EAID_13C7BD43_0C61_4563_8BCB_512DDEE54152" style=";Hidden=0;"/>\n' +
            '\t\t\t\t\t<element geometry="SX=0;SY=0;EX=0;EY=0;Path=;" subject="EAID_C79DB465_A788_4f30_8D7D_74C7019A702F" style=";Hidden=0;"/>\n' +
            '\t\t\t\t\t<element geometry="SX=0;SY=0;EX=0;EY=0;Path=;" subject="EAID_79BDFD27_29B0_4ce9_9D6E_010A2B483391" style=";Hidden=0;"/>\n' +
            '\t\t\t\t\t<element geometry="SX=0;SY=0;EX=0;EY=0;Path=;" subject="EAID_DFA670F4_0375_4798_8822_CF3E1EDFA460" style=";Hidden=0;"/>\n' +
            '\t\t\t\t</elements>\n' +
            '\t\t\t</diagram>\n' +
            '\t\t</diagrams>';
        return tag;
    }

    /** ============================================================== **/

}
let jsonDoc = {
    "cells": [
        { "z": 1,
            "id": "8dee3ab3-53a7-4bcf-b2d9-a702cc448b02",
            "size": {
                "width": 260,
                "height": 80
            },
            "type": "sequence.LifeLine",
            "angle": 0,
            "attrs": {
                "body": {
                    "rx": 2,
                    "ry": 2,
                    "fill": "#c6c7e2",
                    "width": 50,
                    "height": 30,
                    "stroke": "#c6c7e2",
                    "strokeDasharray": "0"
                },
                "root": {
                    "dataTooltipPosition": "left",
                    "dataTooltipPositionSelector": ".joint-stencil"
                },
                "label": {
                    "fill": "#222138",
                    "text": "Linea de Vida",
                    "ref-y": "55%",
                    "refY2": 5,
                    "fontSize": 11,
                    "fontFamily": "Roboto Condensed",
                    "fontWeight": "Normal",
                    "strokeWidth": 0
                }
            },
            "position": {
                "x": 70,
                "y": 40.5
            }
        },
        { "z": 2,
            "id": "b24dc16c-596c-4694-8977-6c2bc3b31513",
            "type": "standard.Link",
            "attrs": {
                "line": {
                    "sourceMarker": {
                        "d": "M 0 0 0 0"
                    },
                    "targetMarker": {
                        "d": "M 2 2 L 13 13 M 2 13 L 13 2 z"
                    }
                }
            },
            "router": {
                "name": "normal"
            },
            "source": {
                "id": "8dee3ab3-53a7-4bcf-b2d9-a702cc448b02"
            },
            "target": {
                "x": 200,
                "y": 470
            }
        },
        { "z": 3,
            "id": "71a33a3d-e36e-4a03-9b35-faec12de7621",
            "attrs": {
                "body": {
                    "rx": 5,
                    "ry": 5,
                    "fill": "#00aa00aa",
                    "width": 15,
                    "height": 60,
                    "stroke": "#D2D3D5",
                    "strokeWidth": 2,
                    "strokeDasharray": "0"
                },
                "root": {
                    "dataTooltip": "Activation",
                    "dataTooltipPosition": "left",
                    "dataTooltipPositionSelector": ".joint-stencil"
                },
                "label": {
                    "fill": "#c6c7e2",
                    "text": "Activacion",
                    "ref-y": "55%",
                    "refY2": 5,
                    "fontSize": 11,
                    "fontFamily": "Roboto Condensed",
                    "fontWeight": "Normal",
                    "strokeWidth": 0
                }
            },
            "size": {
                "width": 15,
                "height": 54
            },
            "type": "sequence.Activation",
            "angle": 0,
            "position": {
                "x": 192.5,
                "y": 190
            }
        },
        { "z": 4,
            "id": "d1148875-aaaf-41d6-8735-dee407e3c4af",
            "size": {
                "width": 90,
                "height": 35
            },
            "type": "org.Member",
            "angle": 0,
            "attrs": {
                "root": {
                    "dataTooltipPosition": "left",
                    "dataTooltipPositionSelector": ".joint-stencil"
                },
                ".card": {
                    "fill": "#FFBD50",
                    "stroke-width": 0,
                    "stroke-dasharray": "0"
                },
                ".name": {
                    "fill": "#000000",
                    "text": "Persona",
                    "font-size": 10,
                    "font-family": "Roboto Condensed",
                    "font-weight": "Normal"
                },
                ".rank": {
                    "fill": "#000000",
                    "text": "Actor",
                    "font-size": 12,
                    "font-family": "Roboto Condensed",
                    "font-weight": "Bold",
                    "text-decoration": "none"
                },
                "image": {
                    "x": 16,
                    "y": 13,
                    "ref": null,
                    "ref-x": null,
                    "ref-y": null,
                    "width": 32,
                    "height": 32,
                    "xlink:href": "assets/member-male.png",
                    "y-alignment": null
                }
            },
            "position": {
                "x": 411,
                "y": 63
            }
        },
        { "z": 5,
            "id": "c1bee546-6bbf-4972-82de-2063587c6dba",
            "type": "standard.Link",
            "attrs": {
                "line": {
                    "sourceMarker": {
                        "d": "M 0 0 0 0"
                    },
                    "targetMarker": {
                        "d": "M 0 0 0 0"
                    }
                }
            },
            "router": {
                "name": "normal"
            },
            "source": {
                "id": "d1148875-aaaf-41d6-8735-dee407e3c4af"
            },
            "target": {
                "x": 460,
                "y": 470
            }
        },
        { "z": 6,
            "id": "08e5e934-9402-47ef-bf24-ea7f90ccb382",
            "attrs": {
                "body": {
                    "rx": 5,
                    "ry": 5,
                    "fill": "#00aa00aa",
                    "width": 15,
                    "height": 60,
                    "stroke": "#D2D3D5",
                    "strokeWidth": 2,
                    "strokeDasharray": "0"
                },
                "root": {
                    "dataTooltip": "Activation",
                    "dataTooltipPosition": "left",
                    "dataTooltipPositionSelector": ".joint-stencil"
                },
                "label": {
                    "fill": "#c6c7e2",
                    "text": "Activacion",
                    "ref-y": "55%",
                    "refY2": 5,
                    "fontSize": 11,
                    "fontFamily": "Roboto Condensed",
                    "fontWeight": "Normal",
                    "strokeWidth": 0
                }
            },
            "size": {
                "width": 15,
                "height": 54
            },
            "type": "sequence.Activation",
            "angle": 0,
            "position": {
                "x": 449,
                "y": 190
            }
        },
        { "z": 7,
            "id": "4daa50ee-40d5-419e-8414-b071b8f48862",
            "type": "standard.Link",
            "attrs": {},
            "labels": [
                {
                    "attrs": {
                        "rect": {
                            "stroke": "#feb663"
                        },
                        "text": {
                            "text": "isSet()"
                        }
                    },
                    "position": 0.5
                }
            ],
            "router": {
                "name": "normal"
            },
            "source": {
                "id": "71a33a3d-e36e-4a03-9b35-faec12de7621",
                "anchor": {
                    "args": {
                        "dx": "50%",
                        "dy": "19%",
                        "rotate": true
                    },
                    "name": "topLeft"
                }
            },
            "target": {
                "id": "08e5e934-9402-47ef-bf24-ea7f90ccb382",
                "anchor": {
                    "args": {
                        "dx": "50%",
                        "dy": "19%",
                        "rotate": true
                    },
                    "name": "topLeft"
                }
            },
            "vertices": []
        },
        { "z": 8,
            "id": "1a0577ba-6933-499f-a822-c9ab0477b483",
            "type": "standard.Link",
            "attrs": {
                "line": {
                    "sourceMarker": {
                        "d": "M 0 0 0 0"
                    },
                    "targetMarker": {
                        "d": "M 0 -3 -6 0 0 3 z"
                    },
                    "strokeDasharray": "10,5"
                }
            },
            "labels": [
                {
                    "attrs": {
                        "text": {
                            "text": "Response"
                        }
                    }
                }
            ],
            "router": {
                "name": "normal"
            },
            "source": {
                "id": "08e5e934-9402-47ef-bf24-ea7f90ccb382"
            },
            "target": {
                "id": "71a33a3d-e36e-4a03-9b35-faec12de7621"
            }
        },
        { "z": 9,
            "id": "3886b726-031d-498f-9ec2-227a6d644f09",
            "attrs": {
                "body": {
                    "rx": 5,
                    "ry": 5,
                    "fill": "#00aa00aa",
                    "width": 15,
                    "height": 60,
                    "stroke": "#D2D3D5",
                    "strokeWidth": 2,
                    "strokeDasharray": "0"
                },
                "root": {
                    "dataTooltip": "Activation",
                    "dataTooltipPosition": "left",
                    "dataTooltipPositionSelector": ".joint-stencil"
                },
                "label": {
                    "fill": "#c6c7e2",
                    "text": "Activacion",
                    "ref-y": "55%",
                    "refY2": 5,
                    "fontSize": 11,
                    "fontFamily": "Roboto Condensed",
                    "fontWeight": "Normal",
                    "strokeWidth": 0
                }
            },
            "size": {
                "width": 15,
                "height": 54
            },
            "type": "sequence.Activation",
            "angle": 0,
            "position": {
                "x": 449,
                "y": 282
            }
        },
        { "z": 10,
            "id": "31ebb33c-1442-4fd1-9063-4c9747995988",
            "size": {
                "width": 90,
                "height": 54
            },
            "type": "sequence.LifeLine",
            "angle": 0,
            "attrs": {
                "body": {
                    "rx": 2,
                    "ry": 2,
                    "fill": "#b75d32",
                    "width": 50,
                    "height": 30,
                    "stroke": "transparent",
                    "strokeDasharray": "0"
                },
                "root": {
                    "dataTooltipPosition": "left",
                    "dataTooltipPositionSelector": ".joint-stencil"
                },
                "label": {
                    "fill": "#222138",
                    "text": "Linea de Vida",
                    "ref-y": "55%",
                    "refY2": 5,
                    "fontSize": 11,
                    "fontFamily": "Roboto Condensed",
                    "fontWeight": "Normal",
                    "strokeWidth": 0
                }
            },
            "position": {
                "x": 578,
                "y": 53
            }
        },
        { "z": 11,
            "id": "fb81c091-e480-4f27-bc48-7506ca3e4fe3",
            "type": "standard.Link",
            "attrs": {
                "line": {
                    "sourceMarker": {
                        "d": "M 0 0 0 0"
                    },
                    "targetMarker": {
                        "d": "M 0 0 0 0"
                    }
                }
            },
            "router": {
                "name": "normal"
            },
            "source": {
                "id": "31ebb33c-1442-4fd1-9063-4c9747995988"
            },
            "target": {
                "x": 630,
                "y": 470
            }
        },
        { "z": 12,
            "id": "420b90b1-ab40-45c6-aeb6-92b8e810dece",
            "attrs": {
                "body": {
                    "rx": 5,
                    "ry": 5,
                    "fill": "#00aa00aa",
                    "width": 15,
                    "height": 60,
                    "stroke": "#D2D3D5",
                    "strokeWidth": 2,
                    "strokeDasharray": "0"
                },
                "root": {
                    "dataTooltip": "Activation",
                    "dataTooltipPosition": "left",
                    "dataTooltipPositionSelector": ".joint-stencil"
                },
                "label": {
                    "fill": "#c6c7e2",
                    "text": "Activacion",
                    "ref-y": "55%",
                    "refY2": 5,
                    "fontSize": 11,
                    "fontFamily": "Roboto Condensed",
                    "fontWeight": "Normal",
                    "strokeWidth": 0
                }
            },
            "size": {
                "width": 15,
                "height": 54
            },
            "type": "sequence.Activation",
            "angle": 0,
            "position": {
                "x": 615.5,
                "y": 362
            }
        },
        { "z": 13,
            "id": "4dedff92-4551-4b9f-bcfe-821936b66f9f",
            "type": "standard.Link",
            "attrs": {},
            "router": {
                "name": "normal"
            },
            "source": {
                "id": "3886b726-031d-498f-9ec2-227a6d644f09",
                "anchor": {
                    "args": {
                        "dx": "50%",
                        "dy": "15%",
                        "rotate": true
                    },
                    "name": "topLeft"
                }
            },
            "target": {
                "id": "3886b726-031d-498f-9ec2-227a6d644f09",
                "anchor": {
                    "args": {
                        "dx": "33%",
                        "dy": "70%",
                        "rotate": true
                    },
                    "name": "topLeft"
                }
            },
            "vertices": [
                {
                    "x": 500,
                    "y": 290.1
                },
                {
                    "x": 500,
                    "y": 320
                }
            ]
        },
        { "z": 14,
            "id": "0dc95f8d-3afc-4879-9fd8-f87a5fd5980e",
            "type": "standard.Link",
            "attrs": {
                "line": {
                    "sourceMarker": {
                        "d": "M 0 0 0 0"
                    },
                    "targetMarker": {
                        "d": "M 0 0 0 0"
                    },
                    "strokeDasharray": "10,5"
                }
            },
            "labels": [
                {
                    "attrs": {
                        "rect": {
                            "stroke": "#7c68fc"
                        },
                        "text": {
                            "fill": "#61549c",
                            "text": "exit()"
                        }
                    }
                }
            ],
            "router": {
                "name": "normal"
            },
            "source": {
                "id": "420b90b1-ab40-45c6-aeb6-92b8e810dece"
            },
            "target": {
                "x": 200,
                "y": 390
            }
        }
    ]
};
let packaged = new Package(jsonDoc);

// let packaged = new Package(jsonDoc);
/*console.log(packaged.generateBaseDocuemnt());
console.log(packaged.generateOpenXmiTag());
console.log(packaged.generateUmlModelSection());
console.log(packaged.generateXmiExtensionSection());
console.log(packaged.generateCloseXmiTag());*/
// packaged.getArrayOfArraysFromJson();
// console.log(packaged.getLifelines());
// console.log(packaged.getArrayOfArraysFromJson());
// console.log(packaged.getActorsObjects());
// console.log(packaged.getLifelinesObjects());

/**
 * START LIFELINE SECTION
 */
/**
 * Los Links que van dentro de la etiqueta Element, son todos los links que
 * llegan o salen de esa linea de vida
 */

class Lifeline{

    /**
     *
     * @param id
     * @param name
     */
    constructor(id, name) {
        this.idShape = id;
        this.nameShape = name;
        this.typeShape = 'uml:Lifeline';
        this.representsId = '';
    }

    get getId(){
        return this.idShape;
    }
    set setId(id){
        this.idShape = id
    }
    get getName(){
        return this.nameShape;
    }
    set setName(name){
        this.nameShape = name
    }
    get _getUuid(){
        // credit: http://stackoverflow.com/posts/2117523/revisions

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0;
            var v = (c === 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    get getRepresentId(){
        if( this.representsId === '' ){
            this.setRepresentsId();
        }
        return this.representsId;
    }

    get getTypeShape(){
        return this.typeShape;
    }
    set setTypeShape(type){
        this.typeShape = type;
    }

    setRepresentsId(){
        this.representsId = this._getUuid()
    }
    generateLifelineTag(){

        let tag;
        tag =
            '\t\t\t\t\t<lifeline xmi:type=' + '"' + this.getTypeShape+ '" '  + 'xmi:id=' + '"' + this.getId + '"' + ' name='+ '"'+ this.getName + '"' +
            ' visibility="public"  represents=' + '"' +   this.getRepresentId  + '"' + '/>';
        return tag;
    }

    generateOwnedAttrTag()
    {
        let tag;
        tag = '<ownedAttribute xmi:type="uml:Property" xmi:id=' + '"' + this.getRepresentId+ '"' + '/>';
        return tag;

    }

    generateElementTag(packageId)
    {
        let tag; tag =

        '<element xmi:idref='+'"'+this.getId+'"'+ ' xmi:type="uml:Sequence" name=' +'"'+this.getName+'"' + ' scope="public">'+ '\n'
        + '<model package=' + '"' + packageId + '"' + ' tpos="0" <!--ea_localid="7"--> ea_eleType="element" />' + '\n'
        + '<properties isSpecification="false" sType="Sequence" nType="0" scope="public"/>' + '\n'
        ///TODO:ELIMINAR O BUSCAR DINAMISMO EN LA FECHA Y HORA
        + '<project author="willi" version="1.0" phase="1.0" created="2023-10-11 23:11:35" modified="2023-10-11 23:11:41" complexity="1" status="Proposed"/>' + '\n'
        + '<code gentype="&lt;none&gt;"/>' + '\n'
        + '<style appearance="BackColor=-1;BorderColor=-1;BorderWidth=-1;FontColor=-1;VSwimLanes=1;HSwimLanes=1;BorderStyle=0;"/>' + '\n'
        + '<tags/>' + '\n'
        + '<xrefs/>' + '\n'
        + '<extendedProperties tagged="0" package_name="Starter Sequence Diagram"/>' + '\n' +
        this.insertLinks()
        + '</element>' ;

        return tag;


    }

    insertLinks(id, source, target){
        return ' this is a link con: '+ id + source + target;
        /*
         <links>
             <Sequence xmi:id="EAID_13C7BD43_0C61_4563_8BCB_512DDEE54152" start="source" end="target"/>
         </links>
        */
    }
}
// module.exports()
// let lifeline = new Lifeline('thisis455-my-id','My name');
// console.log(lifeline.generateLifelineTag());
// console.log(lifeline.generateOwnedAttr());
// console.log(lifeline.generateElementTag()))
// console.log(lifeline.getUuid)
/**
 * END LIFELINE SECTION
 */

/**
 * START ACTOR SECTION
 */
class Actor {
    /**
     *
     * @param id
     * @param name
     */
    constructor(id, name) {
        this.idShape = id;
        this.nameShape = name;
        this.typeShape = 'uml:Actor';
        this.representsId = ''
    }

    generateLifelineTag(){
        let tag;
        tag =
            '<lifeline xmi:type="uml:Lifeline" xmi:id=' + '"' + this._getUuid() + '"' + ' name='+ '"'+ this.getName + '"' +
            ' visibility="public"  represents=' + '"' +   this.getRepresentId  + '"' + '/>';
        return tag;
    }

    generateSinglePackagedElementTag(){
        let tag;
        tag = '<packagedElement xmi:type='+'"'+ this.getTypeShape+'"'+ ' xmi:id="'+this.getId+'" name="'+this.getName+'" visibility="public"/>\n';
        return tag;
    }

    generateOwnedAtrrTag(){
        let tag;
        tag =
            '<ownedAttribute xmi:type="uml:Property" xmi:id=' + '"' + this.getRepresentId+ '"' + '>\n' +
            '\t<type xmi:idref="'+ this.getId+'"/>\n' +
            '</owneedAttribute>';
        return tag;

    }
    generateElementTag(packageId){
        let tag;
        tag =
            '<element xmi:idref="'+ this.getId +'" xmi:type="'+this.getTypeShape+'" name="'+this.getName+'" scope="public">\n' +
            '\t<model package="'+ packageId +'" tpos="0" ea_localid="9" ea_eleType="element"/>\n' +
            '\t<properties isSpecification="false" sType="Actor" nType="0" scope="public" isRoot="false" isLeaf="false" isAbstract="false"/>\n' +
            '\t<project author="willi" version="1.0" phase="1.0" created="2023-10-11 23:12:22" modified="2023-10-11 23:12:27" complexity="1" status="Proposed"/>\n' +
            '\t<code gentype="&lt;none&gt;"/>\n' +
            '\t<style appearance="BackColor=-1;BorderColor=-1;BorderWidth=-1;FontColor=-1;VSwimLanes=1;HSwimLanes=1;BorderStyle=0;"/>\n' +
            '\t<tags/>\n' +
            '\t<xrefs/>\n' +
            '\t<extendedProperties tagged="0" package_name="Starter Sequence Diagram"/>\n' +
            '\t<links>\n' +
            '\t\t<Sequence xmi:id="EAID_79BDFD27_29B0_4ce9_9D6E_010A2B483391" start="EAID_38EBFCA1_8307_4028_A6F8_B40730BCE784" end="EAID_38EBFCA1_8307_4028_A6F8_B40730BCE784"/>\n' +
            '\t\t<Sequence xmi:id="EAID_C79DB465_A788_4f30_8D7D_74C7019A702F" start="EAID_38EBFCA1_8307_4028_A6F8_B40730BCE784" end="EAID_7570BA22_0C31_4e38_AF7C_EFB962430769"/>\n' +
            '\t\t<Sequence xmi:id="EAID_13C7BD43_0C61_4563_8BCB_512DDEE54152" start="EAID_7570BA22_0C31_4e38_AF7C_EFB962430769" end="EAID_38EBFCA1_8307_4028_A6F8_B40730BCE784"/>\n' +
            '\t\t<Sequence xmi:id="EAID_79BDFD27_29B0_4ce9_9D6E_010A2B483391" start="EAID_38EBFCA1_8307_4028_A6F8_B40730BCE784" end="EAID_38EBFCA1_8307_4028_A6F8_B40730BCE784"/>\n' +
            '\t</links>\n' +
            '<\element>';
        return tag;
    }

    get getId(){
        return this.idShape;
    }
    set setId(id){
        this.idShape = id
    }
    get getName(){
        return this.nameShape;
    }
    set setName(name){
        this.nameShape = name
    }
    _getUuid(){
        // credit: http://stackoverflow.com/posts/2117523/revisions

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0;
            var v = (c === 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    get getRepresentId(){
        if( this.representsId === '' ){
            this.setRepresentsId();
        }
        return this.representsId;
    }
    get getTypeShape(){
        return this.typeShape;
    }
    set setTypeShape(type){
        this.typeShape = type;
    }

    setRepresentsId(){
        this.representsId = this._getUuid()
    }
}
// let actor = new Actor('Iddelactor', 'Actor')
// console.log(actor.generateLifelineTag())
// console.log(actor.generateSinglePackagedElementTag())
// console.log(actor.generateOwnedAtrrTag())
// console.log(actor.generateElementTag('packageId'))


/**
 * END ACTOR SECTION
 */


/**
 * START LINK SECTION
 */

/*
* Cuando el elemento standard.Link() de joint:
*   -   No tiene un id dentro del
*       atributo target, se debe ignorar pues eso quiere decir que no forma
*       parte de los mensajes que se envian entre las entidades.
*   -   Aun por confirmar, cuando un standard.Link tiene
*       el atributo "strokeDasharray" signfica que es una linea segmentada,
*       por lo tanto, corresponde ser un messageSort=reply
*   -   Si tiene un punta -> asi, sin relleno, quiere decir que es asincrono,
*       por lo tanto, el menssageSort=asynchronchCall
*
*/


class Link {
    constructor(id, source, target, label = '', messageSort = 'synchCall') {
        this.id = id;
        this.source = source;
        this.target = target;
        this.label = label;
        this.messageSort = messageSort;
        this.type = 'uml:Message';
    }


    get getId() {
        return this.id;
    }

    get getLabel() {
        return this.label;
    }

    get getSource() {
        return this.source;
    }

    get getTarget() {
        return this.target;
    }

    get getType(){
        return this.type;
    }

    get getMessageSort(){
        return this.messageSort;
    }
    set setMessageSort(messageSort){
        this.messageSort = messageSort;
    }


    generateMessageTag(){
        let tag;
        tag =
            '<message xmi:type=' + '"' + this.getType+ '" '  + 'xmi:id=' + '"' + this.getId + '"' + ' messageSort='+ '"'+ this.getMessageSort + '"' +
            ' sendEvent=' + '"' +   this.getSource  +'"' + ' receiveEvent=' + '"' +   this.getTarget  + '"' + ' messageKind="complete" />';

        return tag;
    }

    generateConectorTag(){
        let tag;
        tag =
            '<connector xmi:idref='+'"'+this.getId+'">'+ '\n'+
            '<source xmi:idref="'+this.getSource+'"> \n'+
            '<model ea_localid="7" type="'+ this.getModelTypeFake +'" name="' + this.getModelNameFake +'" /> \n' +
            '<role visibility="Public" targetScope="instance"/> \n'+
            '<type containment="Unspecified"/> \n' +
            '<constraints/> \n' +
            '<modifiers isOrdered="false" changeable="none" isNavigable="false"/> \n '+
            '<style value="Union=0;Derived=0;AllowDuplicates=0;Owned=0;Navigable=Non-Navigable;"/> \n' +
            '<documentation/> \n' +
            '<xrefs/> \n' +
            '<tags/> \n' +
            '</source> \n '+
            '<target xmi:idref="'+ this.getTarget +'"> \n '+
            '<model ea_localid="9" type="'+ this.getModelTypeFake +'" name="'+ this.getModelNameFake+ '"/> \n' +
            '<role visibility="Public" targetScope="instance"/> \n' +
            '<type aggregation="none" containment="Unspecified"/> \n' +
            '<constraints/> \n' +
            '<modifiers isOrdered="false" changeable="none" isNavigable="true"/> \n' +
            '<style value="Union=0;Derived=0;AllowDuplicates=0;Owned=0;Navigable=Navigable;"/> \n' +
            '<documentation/> \n'+
            '<xrefs/> \n' +
            '<tags/> \n ' +
            '</target> \n' +
            '<model ea_localid="5"/> \n' +
            '<properties ea_type="Sequence" direction="Source -&gt; Destination"/> \n' +
            '<documentation/> \n' +
            '<appearance linemode="1" linecolor="-1" linewidth="0" seqno="1" headStyle="0" lineStyle="0"/> \n' +
            '<labels mt="'+ this.getLabel +'"/> \n'+
            '<extendedProperties stateflags="Activation=0;ExtendActivationUp=0;" virtualInheritance="0" diagram="' + this.diagramIdFake + '" privatedata1="Synchronous" privatedata2="retval=isSet();" privatedata3="Call" privatedata4="0" privatedata5="SX=0;SY=-6;EX=0;EY=0;$LLB=;LLT=;LMT=;LMB=;LRT=;LRB=;IRHS=;ILHS=;" sequence_points="PtStartX=84;PtStartY=-141;PtEndX=250;PtEndY=-141;"/> \n' +
            '<style/> \n' +
            '<xrefs/> \n' +
            '<tags/> \n' +
            '</connector> \n';
        return tag
    }

}

// let link = new Link('this-is_my_id_11231354', 'este es el label', 'source', 'target')
// console.log( link.generateMessageTag())
// console.log(  (link.generateConectorTag() == eaCopy))

/**
 * END LINK SECTION
 */

/**
 * START OCCURRENCE SECTION
 */

// import {Lifeline} from "./lifeline.js";

class Occurrence {
    constructor(id, coveredId) {
        this.idShape = id;
        this.coveredId = coveredId;
        this.type = 'uml:OccurrenceSpecification';
    }

    get getIdShape(){
        return this.idShape
    }
    get getCoveredId(){
        return this.coveredId
    }
    get getTypeShape(){
        return this.type
    }
    get _getUuid(){
        // credit: http://stackoverflow.com/posts/2117523/revisions

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0;
            var v = (c === 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    generateFragmentTag(){
        let tag;
        tag =
            '\t\t\t\t\t<fragment xmi:type="'+this.getTypeShape+'" xmi:id="'+this.getIdShape+'" covered="'+this.getCoveredId+'"/>\n';
        return tag;
    }
}

/**
 * END OCCURRENCE SECTION
 */
