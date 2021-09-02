export function orderX(dnaFeatures_data = []) {
    dnaFeatures_data.sort(function (a, b) {
      if (a?.leftEndPosition > b?.leftEndPosition) {
        return 1;
      }
      if (a?.leftEndPosition < b?.leftEndPosition) {
        return -1;
      }
      return 0;
    });
    //console.log(dnaFeatures_data);
    return dnaFeatures_data;
  }