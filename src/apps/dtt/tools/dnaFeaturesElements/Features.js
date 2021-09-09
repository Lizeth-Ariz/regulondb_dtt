//import { stroke_validate, font_validate } from "./validation";
import { validation } from "./validation/validation";
import { SVG } from "@svgdotjs/svg.js";
import DrawDNA from "./dna";
import DrawGene from "./gene";
import DrawOperon from "./operon";
import DrawppGpp from "./ppGpp";
import DrawPromoter from "./promoter";
import DrawTerminador from "./terminator";
import DrawTFBindingSite from "./tf_binding_site";
import config from "./elements.conf.json";

class Feature {
  constructor(id, featureElements_data, labelName) {
    this.id = id;
    this.featureElements_data = validation(featureElements_data);
    this.labelName = labelName;
    //console.log(this.featureElements_data);
    if (!this.featureElements_data) {
      console.log("feature elements no valid");
    } else {
      this.DNA = this.getDNAelement();
      this.height = this.heightProces();
      this.width = this.widthProces();
    }
  }

  widthProces() {
    return this.DNA.rightEndPosition - this.DNA.leftEndPosition;
  }

  heightProces() {
    let level = 0;
    this.featureElements_data.map((feature) => {
      if (feature.objectType !== "dna") {
        if (feature.level > level) {
          level = feature.level;
        }
      }
      return null;
    });
    return (level) * 40 * 2;
  }

  getDNAelement() {
    return this.featureElements_data.find(
      (feature) => feature?.objectType === "dna"
    );
  }

  draw(idDrawPlace, idCanvas, autoAdjust = false) {
    try {
      let drawPlace = document.getElementById(idDrawPlace);
      if (!drawPlace) {
        return null
      }
      drawPlace.innerHTML = "";
      let width = this.width;
      let height = this.height;
      if (autoAdjust) {
        width = drawPlace.clientWidth;
      }
      let svg = SVG()
        .addTo(`#${idDrawPlace}`)
        .width(width)
        .height(height)
        .id(idCanvas);
      svg.rect(width, height).fill("#fAf");
      const dna_info = this.DNA;
      if (dna_info) {
        const DNA = DrawDNA({
          id: dna_info?._id,
          y: this.height / 2,
          canva: svg,
          leftEndPosition: dna_info?.leftEndPosition,
          rightEndPosition: dna_info?.rightEndPosition,
          labelName: dna_info?.labelName,
          stroke: stroke(dna_info),
          font: font(dna_info)
        });

        this.featureElements_data.map((feature, i) => {
          //console.log(feature)
          switch (feature?.objectType) {
            case "dna":
              break;
            case "gene":
              DrawGene({
                id: feature?._id,
                canva: svg,
                dna: DNA,
                anchor: feature?.anchor,
                leftEndPosition: feature?.leftEndPosition,
                rightEndPosition: feature?.rightEndPosition,
                strand: feature?.strand,
                labelName: feature?.labelName,
                stroke: stroke(feature),
                font: font(feature),
                color: rgb_to_rgbFormat(feature?.objectRGBColor),
                tooltip: feature?.tooltip,
                separation: separation(feature),
                opacity: opacity(feature)
              });
              break;
            case "operon":
              DrawOperon({
                id: feature?._id,
                canva: svg,
                dna: DNA,
                anchor: feature?.anchor,
                leftEndPosition: feature?.leftEndPosition,
                rightEndPosition: feature?.rightEndPosition,
                strand: feature?.strand,
                labelName: feature?.labelName,
                stroke: stroke(feature),
                font: font(feature),
                color: rgb_to_rgbFormat(feature?.objectRGBColor),
                tooltip: feature?.tooltip,
                separation: separation(feature)
              });
              break;
            case "ppGpp":
              DrawppGpp({
                id: feature?._id,
                canva: svg,
                dna: DNA,
                anchor: feature?.anchor,
                leftEndPosition: feature?.leftEndPosition,
                rightEndPosition: feature?.rightEndPosition,
                strand: feature?.strand,
                labelName: feature?.labelName,
                stroke: stroke(feature),
                font: font(feature),
                color: rgb_to_rgbFormat(feature?.objectRGBColor),
                tooltip: feature?.tooltip,
                separation: separation(feature)
              });
              break;
            case "promoter":
              DrawPromoter({
                id: feature?._id,
                canva: svg,
                dna: DNA,
                anchor: feature?.anchor,
                leftEndPosition: feature?.leftEndPosition,
                rightEndPosition: feature?.rightEndPosition,
                strand: feature?.strand,
                labelName: feature?.labelName,
                stroke: stroke(feature),
                font: font(feature),
                color: rgb_to_rgbFormat(feature?.objectRGBColor),
                tooltip: feature?.tooltip,
                separation: separation(feature)
              });
              break;
            case "terminator":
              DrawTerminador({
                id: feature?._id,
                canva: svg,
                dna: DNA,
                anchor: feature?.anchor,
                leftEndPosition: feature?.leftEndPosition,
                rightEndPosition: feature?.rightEndPosition,
                strand: feature?.strand,
                labelName: feature?.labelName,
                stroke: stroke(feature),
                font: font(feature),
                color: rgb_to_rgbFormat(feature?.objectRGBColor),
                tooltip: feature?.tooltip,
                separation: separation(feature)
              });
              break;
            case "tf_binding_site":
              DrawTFBindingSite({
                id: feature?._id,
                canva: svg,
                dna: DNA,
                anchor: feature?.anchor,
                leftEndPosition: feature?.leftEndPosition,
                rightEndPosition: feature?.rightEndPosition,
                strand: feature?.strand,
                labelName: feature?.labelName,
                stroke: stroke(feature),
                font: font(feature),
                color: rgb_to_rgbFormat(feature?.objectRGBColor),
                tooltip: feature?.tooltip,
                separation: separation(feature)
              });
              break;
            default:
              console.warn(`error to load ${i} feature`, feature);
              break;
          }
          return null;
        });
      } else {
        console.error("dna_info error...");
      }
    } catch (error) {
      console.error("tring draw", error);
    }
  }
} //enClass

export default Feature;

function stroke(feature) {
  return {
    color: rgb_to_rgbFormat(feature?.lineRGBColor),
    width: feature?.lineWidth,
    linecap: feature?.lineType
  };
}
function font(feature) {
  return {
    family: feature?.labelFont,
    size: feature?.labelSize,
    fill: rgb_to_rgbFormat(feature?.labelRGBColor),
    separation: "middle"
  };
}
function opacity(feature) {
  let op = 1;
  if (feature.OverlapObjects !== []) {
    op = 0.7;
  }
  return op;
}
function separation(feature) {
  let sep = 0;
  feature.OverlapObjects.map((ob) => {
    let h = config[ob].height;
    if (ob === "gene" && feature.objectType === "gene") {
      sep += h - h * 0.5;
    } else {
      if (ob === "gene") {
        sep += h - h * 0.3;
      } else {
        sep += h;
      }
    }
    return null;
  });
  return sep;
}
export function rgb_to_rgbFormat(rgb) {
  if (rgb) {
    return `rgb(${rgb})`;
  }
  return undefined;
}
