import { toInt } from "../utiles";

export function orderY(dnaFeatures_data = []) {
  let featureCheck = [];
  dnaFeatures_data.map((feature) => {
    if (feature.objectType !== "dna") {
      feature.level = 1;
    }
    return null;
  });
  dnaFeatures_data.map((feature) => {
    featureCheck.push(feature);
    if (feature.objectType !== "dna") {
      detectOverlap(
        feature.leftEndPosition,
        feature.rightEndPosition,
        feature.level
      );
    }
    return null;
  });
  dnaFeatures_data.map((feature) => {
    if (feature.objectType !== "dna") {
      feature.separation = feature.level * 30;
    }
    return null;
  });
  function detectOverlap(leftEndPosition, rightEndPosition, level) {
    dnaFeatures_data.map((feature) => {
      if (
        (feature.leftEndPosition <= rightEndPosition ||
          feature.rightEndPosition <= leftEndPosition) &&
        !featureCheck.find((f) => f === feature) &&
        level === feature.level
      ) {
        feature.level += 1;
      }
      return null;
    });
  }
  console.log(dnaFeatures_data);
  return dnaFeatures_data;
}
