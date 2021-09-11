export function move(obj,posY,height) {
    if(posY===0){
        posY = obj.posY
    }
    if (obj.strand === "reverse") {
        posY = posY + Number(height)
    } else {
        posY = posY - Number(height)
    }
    obj.draw.move(obj.posX, posY)
    return posY
}

/*

    
    
    */