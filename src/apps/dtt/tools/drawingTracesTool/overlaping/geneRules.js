import { moveUpElement, moveUpFeature } from "./move"

/* Reglas */
//Genes mas pequeños van encima de genes grandes*/
const RULE1 = true
// Genes se enciman un 50%
const PERCENTAGE_OVER = 0.5
/*
 */

export function geneRulesOverlaping(feature, element) {
  let obj = { feature, element }
  //console.log(feature._id,element._id)
  if (obj.feature.dnaPriority <= obj.element.dnaPriority) {
    if (
      obj.feature.size <= obj.element.size &&
      obj.feature.leftEndPosition >= obj.element.leftEndPosition &&
      obj.feature.rightEndPosition >= obj.element.rightEndPosition &&
      RULE1
    ) {
      obj = moveUpFeature(obj)
    } else {
      obj = moveUpElement(obj)
    }
  } else {
    obj = moveUpFeature(obj)
  }
  return obj
}

export function geneRulesInitialSettings(feature, CONF) {
  feature.separation = 0
  feature.downPosition = 0
  let defH = Number(CONF[feature.objectType].height)
  feature.height = defH - (defH * PERCENTAGE_OVER)
  feature.upPosition = feature.height
  feature.size = feature.rightEndPosition - feature.leftEndPosition
  feature.leftPosition = feature.leftEndPosition
  feature.rightPosition = feature.rightEndPosition
  feature.dnaPriority = CONF.dnaPriority[feature.objectType]
}