import { toInt, eMes } from "./utiles";
import confElements from "../elements.conf.json";

export function validateElements(dnaFeatures_data = []) {
  if (!dnaFeatures_data || dnaFeatures_data.length === 0) {
    return null;
  }
  let features = [];
  dnaFeatures_data.map((feature, inx) => {
    if (feature?._id) {
      if (feature?.objectType) {
        if (!confElements[feature?.objectType]) {
          eMes(`object Type not defined: ${feature?.objectType} `, inx);
          return null;
        }
        if (feature?.leftEndPosition && feature?.rightEndPosition) {
          let leftEndPosition = toInt(feature?.leftEndPosition);
          let rightEndPosition = toInt(feature?.rightEndPosition);
          if (leftEndPosition <= rightEndPosition) {
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
          if (feature?.linkedObjectWhenNoPositions) {
            let leftEndPosition = toInt(feature?.linkedObjectWhenNoPositions?.leftEndPosition);
            let rightEndPosition = toInt(feature?.linkedObjectWhenNoPositions?.rightEndPosition);
            if (leftEndPosition <= rightEndPosition) {
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
  return null;
}
