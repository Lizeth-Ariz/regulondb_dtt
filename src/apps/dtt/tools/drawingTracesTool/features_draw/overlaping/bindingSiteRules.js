import { move } from "./move"

/* Reglas */



export function bsiteRulesOverlaping(draw, feature, posY, dnaPriority) {
    let height = feature.height + 1
    if (dnaPriority[draw.objectType] >= dnaPriority[feature.objectType]) {
        posY = move(draw, posY, height)
    } else {
        posY = move(feature, posY, height)
    }
    
    return posY
}