export function move(obj,posY,height) {
    if(posY===0){
        posY = obj.posY
    }
    if (obj.strand === "reverse") {
        posY = posY + height
    } else {
        posY = posY - height
    }
    obj.draw.move(obj.posX, posY)
    return posY
}

/*

    
    
    */