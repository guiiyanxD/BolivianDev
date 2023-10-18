export class Actor {
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
