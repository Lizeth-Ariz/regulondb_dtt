import { move } from "./move"

/* Reglas */

export function promoterRulesOverlaping(draw,feature,posY,dnaPriority) {
  let height = feature.height +1 
  if (dnaPriority[draw.objectType] >= dnaPriority[feature.objectType]) {
    posY = move(draw,posY,height)
    draw.leg.height(draw.leg.height()+(height))
    if(draw.strand === "forward"){
      draw.leg.dy(-height-1)
    }
  } else {
    height = draw.height
    posY = move(feature,posY,height)
  }

  return posY
}
