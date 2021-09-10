import { moveUpElement, moveUpFeature } from "./move"

export default function geneRules(feature,element) {
  let obj = {feature, element}
  //console.log(feature._id,element._id)
    if (obj.feature.dnaPriority <= obj.element.dnaPriority) {
      if(obj.feature.size <= obj.element.size){
        obj = moveUpFeature(obj)
      }else{
        obj = moveUpElement(obj)
      }
      } else {
        obj = moveUpFeature(obj)
      }
    return obj
}
/* Reglas */
/**
 * Genes mas pequeños van encima de genes grandes
 */