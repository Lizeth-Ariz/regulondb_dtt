import geneRules from "./geneRules";

export default function overlaping(dnaFeatures_data, CONF) {
    //Parametros Iniciales
    dnaFeatures_data.map((feature) => {
        if (feature.objectType !== "dna") {
            try {
                feature.separation = 0
                feature.downPosition = 0
                feature.height = CONF[feature.objectType].height
                if (feature.objectType === "gene") {
                    feature.height -= 20
                }
                feature.upPosition = feature.height
                feature.size = feature.rightEndPosition - feature.leftEndPosition
                feature.leftPosition = feature.leftEndPosition
                feature.rightPosition = feature.rightEndPosition
                feature.dnaPriority = CONF.dnaPriority[feature.objectType]
            } catch (error) {
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
                switch (feature.objectType) {
                    case "gene":
                        let geneR = geneRules(feature, element)
                        //console.log(geneR)
                        let indx = dnaFeatures_data.indexOf(feature);
                        element = geneR.element
                        dnaFeatures_data[indx] = geneR.feature
                        break;
                    default:
                        console.warn("Unknow element")
                        break;
                }
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
                console.log("ele",t)
                console.log("fe",feature)
            }
        }
        return null;
    });
    return no_overlap;
}

//!featureCheck.find((f) => f === element)