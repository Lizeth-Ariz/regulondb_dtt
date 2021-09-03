//Draw Sites v 0.10.0
/**
 * Falta etiqueta
 */
import { stroke_validate, font_validate, color_validate } from "./draw_validation";
import { label } from "./label";
import config from "./elements.conf.json";
const conf = config.tf_binding_site;

export default function DrawTFBindingSite({
    id,
    canva,
    anchor,
    dna,
    separation = 0,
    leftEndPosition = 0,
    rightEndPosition = 10,
    labelName = "Name",
    strand = "forward",
    color = "#fff",
    opacity = 1,
    stroke,
    font,
    tooltip = ""
}) {
    if (!canva || !dna || !id | (leftEndPosition > rightEndPosition)) {
        return null;
    }
    stroke = stroke_validate(stroke, conf.stroke);
    font = font_validate(font, conf.font);
    color = color_validate(color, "#00FFFF");
    // anchor effect
    if (anchor) {
        leftEndPosition = anchor.leftEndPosition;
        rightEndPosition = leftEndPosition + 10;
    }
    //atributos
    const dnaX = dna.x,
        size = rightEndPosition - leftEndPosition,
        dnaY = dna.y,
        widthActive = dna.widthActive,
        dnaSize = dna.size,
        x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize;
    let sizeP = (size * widthActive) / dnaSize;
    if (sizeP<1) {
        sizeP = 4
    }
    // scale
    const proportion = conf.height / 20;
    //atributos de cuerpo
    let tfH = 20 * proportion;
    let tfW = sizeP;
    let posX = x + dnaX;
    let posY = dnaY - separation - tfH;
    // draw site
    let tf_binding = canva.rect(tfW, tfH);
    tf_binding.move(posX, posY).stroke(stroke).fill(color);
    //Text properties
    const textP = canva.text(labelName);
    textP
        .font({
            family: "Arial",
            size: proportion * 9,
            separation: "middle"
        })
        .move(posX + tfH / 10, posY + tfW / 4);
    //group
    const group = canva.group();
    group.add(tf_binding);
    group.add(textP);
    //strand effect
    if (strand === "reverse") {
        posY = dnaY + separation;
        group.move(posX, posY);
    }
    group.attr({
        "data-tip": "",
        "data-for": `${canva.node?.id}-${id}`
    });

    return {
        id: id,
        canva: canva,
        posX: posX,
        posY: posY,
        sizeP: sizeP,
        height: tfH,
        dna: dna,
        separation: separation,
        leftEndPosition: leftEndPosition,
        rightEndPosition: rightEndPosition,
        labelName: labelName,
        strand: strand,
        color: color,
        opacity: color,
        stroke: stroke,
        font: font,
        objectType: "tf_binding_site",
        tooltip: tooltip
    };
}
