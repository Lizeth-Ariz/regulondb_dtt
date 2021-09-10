export function moveUpElement(obj) {
    let move = obj.feature.height
    obj.element.downPosition += move
    obj.element.upPosition += move
    obj.element.separation = obj.feature.upPosition
    return obj
}

export function moveUpFeature(obj) {
    let move = obj.element.height
    obj.feature.downPosition += move
    obj.feature.upPosition += move
    obj.feature.separation = obj.element.upPosition
    return obj
}
