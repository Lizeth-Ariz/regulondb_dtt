import { move } from "./move"

/* Reglas */
//Genes mas pequeños van encima de genes grandes*/
const RULE1 = true


export function geneRulesOverlaping(draw,feature,posY,dnaPriority) {
  let height = feature.height+1
  if (dnaPriority[draw.objectType] <= dnaPriority[feature.objectType]) {
    if (
      feature.objectType === "gene" &&
      draw.size <= feature.size &&
      draw.leftEndPosition >= feature.leftEndPosition &&
      draw.rightEndPosition >= feature.rightEndPosition &&
      RULE1
    ) {
      posY = move(feature,posY,height)
    } else {
      posY = move(draw,posY,height)
    }
  } else {
    posY = move(feature,posY,height)
  }
  return posY
}