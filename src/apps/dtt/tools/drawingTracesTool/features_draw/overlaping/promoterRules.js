import { moveUpElement, moveUpFeature } from "./move"

/* Reglas */
//Genes mas pequeños van encima de genes grandes*/
const RULE1 = true
// Genes se enciman un 50%
const PERCENTAGE_OVER = 0.5
/*
 */

export function promoterRulesOverlaping(feature, element) {
  let obj = { feature, element }
  //console.log(feature._id,element._id)
  if (obj.feature.dnaPriority <= obj.element.dnaPriority) {
    obj = moveUpElement(obj)
  } else {
    obj = moveUpFeature(obj)
  }
  return obj
}

export function promoterRulesInitialSettings(feature, CONF) {
  feature.separation = 0
  feature.downPosition = 0
  let defH = Number(CONF[feature.objectType].height)
  feature.height = defH
  feature.upPosition = feature.height
  feature.size = feature.rightEndPosition - feature.leftEndPosition
  feature.leftPosition = feature.leftEndPosition
  feature.rightPosition = feature.rightEndPosition
  feature.dnaPriority = CONF.dnaPriority[feature.objectType]
}