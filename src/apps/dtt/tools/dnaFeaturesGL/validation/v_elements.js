import { toInt, eMes } from './utiles'

export function validateElements(dnaFeatures_data = []) {
    let features = [];
    dnaFeatures_data.map((feature, inx) => {
        if (feature?._id) {
            if (feature?.objectType) {
                if (feature?.leftEndPosition && feature?.rightEndPosition) {
                    let leftEndPosition = toInt(feature?.leftEndPosition);
                    let rightEndPosition = toInt(feature?.rightEndPosition);
                    if (leftEndPosition < rightEndPosition) {
                        feature.leftEndPosition = leftEndPosition;
                        feature.rightEndPosition = rightEndPosition;
                        if (feature?.strand) {
                            features.push(feature);
                        } else {
                            eMes("strand", inx);
                        }
                    } else {
                        console.warn(
                            inx,
                            "positions error",
                            feature?.leftEndPosition,
                            feature?.rightEndPosition
                        );
                    }
                } else {
                    if (feature?.linkedObjectsWhenNoPositions) {
                        if (feature?.strand) {
                            feature.push(feature);
                        } else {
                            eMes("strand", inx);
                        }
                    } else {
                        eMes("posLeft and PosRigth", inx);
                    }
                }
            } else {
                eMes("object Type", inx);
            }
        } else {
            eMes("id", inx);
        }
        return null;
    });
    if (features.length > 0) {
        //console.log(dnaFeatures_data)
        //console.log(features)
        return features;
    }
    return;
}