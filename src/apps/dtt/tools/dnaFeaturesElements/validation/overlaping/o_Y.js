export function orderY(dnaFeatures_data = []) {
  dnaFeatures_data.map((feature) => {
    if (feature.objectType !== "dna") {
      if (feature.objectType === "promoter") {
        feature.rightEndPosition += 50;
      }
      feature.level = 1;
      feature.OverlapObjects = [];
      feature.idObjects = [];
    }
    return null;
  });
  let save = 0;
  while (!evaluate(dnaFeatures_data) && save < 20) {
    let featureCheck = [];
    dnaFeatures_data.map((feature) => {
      featureCheck.push(feature);
      if (feature.objectType !== "dna") {
        detectOverlap(feature, featureCheck);
      }
      return null;
    });
    save++;
  }
  //console.log(save);

  function detectOverlap(featureA, featureCheck) {
    //console.log(featureA.objectType);
    dnaFeatures_data.map((feature) => {
      if (
        (feature.leftEndPosition <= featureA.rightEndPosition ||
          feature.rightEndPosition <= featureA.leftEndPosition) &&
        !featureCheck.find((f) => f === feature) &&
        featureA.level === feature.level &&
        featureA.strand === feature.strand
      ) {
        if (featureA.dnaPriority <= feature.dnaPriority) {
          feature.level += 1;
          feature.OverlapObjects.push(featureA.objectType);
        } else {
          let indx = dnaFeatures_data.indexOf(featureA);
          //console.log(indx)
          featureA.level += 1;
          featureA.OverlapObjects.push(feature.objectType);
          dnaFeatures_data[indx] = featureA;
        }
      }
      return null;
    });
  }
  //console.log(dnaFeatures_data);
  return dnaFeatures_data;
}

function evaluate(dnaFeatures_data) {
  let no_overlap = true;
  let featureCheck = [];
  dnaFeatures_data.map((feature) => {
    if (feature.objectType !== "dna" && no_overlap) {
      featureCheck.push(feature);
      let t = dnaFeatures_data.find(
        (element) =>
          element.level === feature.level &&
          (element.leftEndPosition <= feature.rightEndPosition ||
            element.rightEndPosition <= feature.leftEndPosition) &&
          element.strand === feature.strand &&
          !featureCheck.find((f) => f === element)
      );
      if (t) {
        no_overlap = false;
      }
    }
    return null;
  });
  return no_overlap;
}
