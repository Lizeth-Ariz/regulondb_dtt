import { stroke_define, font_define, rgb_to_rgbFormat, opacity_define } from "../validation/v_draw"
import DrawGene from "./gene";

export default function Draw(CANVAS,DNA,dnaFeatures_data = [],CONF) {
    if (!CANVAS || !dnaFeatures_data || !CONF || dnaFeatures_data === []) {
        console.error(
            `Some elements remain to be defined: \n
            CANVAS: ${CANVAS} \n
            Feature Data: ${dnaFeatures_data} \n
            DNA_CONF: ${CONF}
            `
        )
        return null;
    }

    dnaFeatures_data.map(feature=>{
        switch (feature?.objectType) {
            case "gene":
                DrawGene({
                    id: feature?._id,
                    canva: CANVAS,
                    dna: DNA,
                    anchor: feature?.anchor,
                    leftEndPosition: feature?.leftEndPosition,
                    rightEndPosition: feature?.rightEndPosition,
                    strand: feature?.strand,
                    labelName: feature?.labelName,
                    stroke: stroke_define(feature),
                    font: font_define(feature),
                    color: rgb_to_rgbFormat(feature?.objectRGBColor),
                    tooltip: feature?.tooltip,
                    separation: feature.separation,
                    opacity: opacity_define(feature),
                    conf: CONF?.gene
                  });
                break;
            default:
                console.warn(`this feature "${feature?.objectType}" no drawing process`)
                break;
        }
        return null
    })
}