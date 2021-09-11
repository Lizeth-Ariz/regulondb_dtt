import { geneRulesOverlaping } from "./geneRules"
import { promoterRulesOverlaping } from "./promoterRules"

export default function overlaping(draw, drawFeatures = [], CONF) {
    let dom_draw = document.getElementById(draw.id)
    drawFeatures.map((feature) => {
        if (feature === draw) {
            return null
        }
        let dom_feature = document.getElementById(feature.id)
        let attempts = 50
        let posY = 0
        while (evaluateOverlaping(dom_draw, dom_feature) && attempts > 0) {
            posY = overlapCorrection(draw, feature, posY, CONF.dnaPriority);
            attempts--;
            //console.log(draw)
        }
        return null
    })
}
function overlapCorrection(draw, feature, posY, dnaPriority) {
    switch (draw.objectType) {
        case "gene":
            posY = geneRulesOverlaping(draw, feature, posY, dnaPriority)
            break;
        case "promoter":
            posY = promoterRulesOverlaping(draw, feature, posY, dnaPriority)
            break;
        default:
            console.warn(`this feature "${feature.objectType}" no overlaping rules defined`)
            break;
    }
    return posY
}

function evaluateOverlaping(dom_draw, dom_feature) {
    dom_draw = dom_draw.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    dom_feature = dom_feature.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT

    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
    return !(dom_feature.left > dom_draw.right ||
        dom_feature.right < dom_draw.left ||
        dom_feature.top > dom_draw.bottom ||
        dom_feature.bottom < dom_draw.top);
}