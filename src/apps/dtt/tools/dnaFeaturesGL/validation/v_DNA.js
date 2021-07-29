import {toInt} from './utiles'

export function validateDNA(dnaFeatures_data = []) {
    const dna = dnaFeatures_data.find((feature) => feature?.objectType === "dna");
    if (dna) {
      return dnaFeatures_data;
    }
    let dna_left = undefined;
    let dna_right = undefined;
    dnaFeatures_data.map((feature, idx) => {
      if (feature?.leftEndPosition && feature?.rightEndPosition) {
        let leftEndPosition = toInt(feature?.leftEndPosition);
        let rightEndPosition = toInt(feature?.rightEndPosition);
        let plusLeft = (""+feature?.leftEndPosition).indexOf("+");
        let plusRight = (""+feature?.leftEndPosition).indexOf("+");
        if (plusLeft === -1 && !dna_left) {
          dna_left = leftEndPosition;
        }
        if (plusRight === -1 && !dna_right) {
          dna_right = rightEndPosition;
        }
        if (dna_left > leftEndPosition && plusLeft === -1) {
          dna_left = leftEndPosition;
        }
        if (dna_right < rightEndPosition && plusRight === -1) {
          dna_right = rightEndPosition;
        }
      }
      return null;
    });
    const dna_default = {
      _id: "DNA-Default",
      labelFont: "",
      labelRGGColor: "",
      labelName: "",
      labelSize: "12",
      leftEndPosition: dna_left.toString(),
      lineRGBColor: "0,0,0",
      lineType: "",
      lineWidth: "",
      objectType: "dna",
      objectRGBColor: "",
      rightEndPosition: dna_right.toString(),
      strand: "forward",
      tooltip: ""
    };
    dnaFeatures_data.push(dna_default);
    return dnaFeatures_data;
  }