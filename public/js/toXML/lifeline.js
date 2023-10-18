/**
 * Los Links que van dentro de la etiqueta Element, son todos los links que
 * llegan o salen de esa linea de vida
 */

export class Lifeline{

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
