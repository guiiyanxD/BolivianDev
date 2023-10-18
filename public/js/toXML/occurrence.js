import {Lifeline} from "./lifeline.js";

export class Occurrence {
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
