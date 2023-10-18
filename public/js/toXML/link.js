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


export class Link {
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

