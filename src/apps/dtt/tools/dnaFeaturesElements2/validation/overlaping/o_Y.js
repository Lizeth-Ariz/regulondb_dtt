
//import {font_validate} from '../../draw_validation'

export function orderY(dnaFeatures_data = []) {
  dnaFeatures_data.map((feature) => {
    if (feature.objectType !== "dna") {
      if (feature.objectType === "promoter") {
        //console.log(getTextWidth(feature?.labelName,font_validate(font(feature),DEFAULT_font)))
        feature.rightEndPosition = feature.leftEndPosition + 30 
        //getTextWidth(feature?.labelName,font_validate(font(feature),DEFAULT_font));
      }
      feature.level = 1;
      feature.OverlapObjects = [];
      feature.idObjects = [];
    }
    /*else{
      //console.log(feature)
    }*/
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
  console.log(dnaFeatures_data);
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
/*
const DEFAULT_font = {
  "font": {
    "size": 12,
    "family": "arial",
    "fill": "#000"
  }
}

function font(feature) {
  return {
    family: feature?.labelFont,
    size: feature?.labelSize,
    fill: rgb_to_rgbFormat(feature?.labelRGBColor),
    separation: "middle"
  };

}
function rgb_to_rgbFormat(rgb) {
  if (rgb) {
    return `rgb(${rgb})`;
  }
  return undefined;
}


/** * Uses canvas.measureText to compute and return the width of the given text of given font in pixels. * * 
 * @param {String} text The text to be rendered. 
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana"). * 
 * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393 
 * Fuente: https://www.iteramos.com/pregunta/2545/calcular-el-ancho-del-texto-con-javascript
 *  
 
 let getTextWidth = function(text, font) { 
  // re-use canvas object for better performance 
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas")); 
  var context = canvas.getContext("2d"); context.font = font; 
  var metrics = context.measureText(text); 
  return metrics.width; 
 };

 */