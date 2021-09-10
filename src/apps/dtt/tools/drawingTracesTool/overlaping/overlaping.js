import {geneRulesInitialSettings, geneRulesOverlaping} from "./geneRules";
import { promoterRulesInitialSettings, promoterRulesOverlaping } from "./promoterRules";

export default function overlaping(dnaFeatures_data, CONF) {
    //Parametros Iniciales
    dnaFeatures_data.map((feature) => {
        if (feature.objectType !== "dna") {
            try {
                switch (feature.objectType) {
                    case "gene":
                        geneRulesInitialSettings(feature,CONF)
                        break;
                    case "promoter":
                        promoterRulesInitialSettings(feature,CONF)
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.warn(`this feature "${feature?.objectType}" no Initial Setings Rules defined`)
                console.error(error)
            }

        }
        return null;
    });

    //Evaluacion de Sobrelape
    //console.log(dnaFeatures_data)

    let attempts = 0
    while (!evaluateOverlaping(dnaFeatures_data) && attempts < 5) {
        //console.log(attempts)
        dnaFeatures_data.map((feature) => {
            if (feature.objectType !== "dna") {
                overlapCorrection(feature)
            }
            return null;
        });
        attempts++;
    };
    if(attempts===5){
        console.log("attemts ovelaping")
    }

    function overlapCorrection(feature) {
        dnaFeatures_data.map((element) => {
            if (
                feature._id !== element._id &&
                feature.leftPosition < element.leftPosition &&
                feature.strand === element.strand &&
                horizontalCheck(element, feature) &&
                verticalCheck(element, feature)
            ) {
                //console.log(horizontalCheck(element, feature))
                let OverlapEfect = {feature,element}
                switch (feature.objectType) {
                    case "gene":
                        OverlapEfect = geneRulesOverlaping(feature, element)
                        //console.log(geneR)
                        
                        break;
                    case "promoter":
                        OverlapEfect = promoterRulesOverlaping(feature, element)
                        break;
                    default:
                        console.warn(`this feature "${feature.objectType}" no overlaping rules defined`)
                        break;
                }
                let indx = dnaFeatures_data.indexOf(feature);
                element = OverlapEfect.element
                dnaFeatures_data[indx] = OverlapEfect.feature
            } else {
                if (
                    feature.leftPosition === element.leftPosition
                ) {
                    element.leftPosition += 1
                }
            }
            return null
        })
    }
    //console.log(dnaFeatures_data)
    return dnaFeatures_data
}

function horizontalCheck(element, feature) {
    //console.log("h ", `${element.leftPosition} <= ${feature.rightPosition}`)
    return (element.leftPosition <= feature.rightPosition ||
        element.rightPosition <= feature.leftPosition)
}
function verticalCheck(element, feature) {
    return (element.downPosition <= feature.downPosition ||
        element.upPosition <= feature.upPosition)
}

function evaluateOverlaping(dnaFeatures_data) {
    let no_overlap = true;
    dnaFeatures_data.map((feature) => {
        if (feature.objectType !== "dna" && no_overlap) {
            let t = dnaFeatures_data.find(
                (element) =>
                    feature._id !== element._id &&
                    feature.leftPosition < element.leftPosition &&
                    element.strand === feature.strand &&
                    horizontalCheck(element, feature) &&
                    verticalCheck(element, feature)
            );
            if (t) {
                no_overlap = false;
            }
        }
        return null;
    });
    return no_overlap;
}

//!featureCheck.find((f) => f === element)