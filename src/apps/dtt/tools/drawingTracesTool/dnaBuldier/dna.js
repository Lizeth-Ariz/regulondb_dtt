import { stroke_validate, font_validate, stroke_define, font_define } from "../validation/v_draw"

export default function DNA(CANVAS, dnaFeatures_data, CONF) {
    const DNAelement = dnaFeatures_data.find(element => element.objectType === "dna")
    const DNAconf = CONF.dna
    const ID = DNAelement._id
    //Validacion
    if (!CANVAS || !ID || !DNAconf) {
        console.error(
            `Some elements remain to be defined: \n
            CANVAS: ${CANVAS} \n
            ID: ${ID} \n
            DNA_CONF: ${DNAconf}
            `
        )
        return null;
    }
    let stroke = stroke_validate(stroke_define(DNAelement), DNAconf.stroke);
    let font = font_validate(font_define(DNAelement), DNAconf.font);
    //atributos de text
    const dnaLletter = `${DNAelement.leftEndPosition}`;
    const dnaRletter = `${DNAelement.rightEndPosition}`;
    //DNA attributes
    const x = 0
    const y = CANVAS.height() / 2
    const lx1 = x + (font["size"] * dnaLletter.length) / 2 + 5;
    const lx2 = CANVAS.width() - font["size"] * dnaRletter.length;
    const widthActive = lx2 - lx1;
    const forwardActive = y;
    const reverseActive = y;
    //draw text
    const TEXT_L = CANVAS
        .text(dnaLletter)
        .font(font)
        .move(x, y - font["size"] / 2);
    const TEXT_R = CANVAS
        .text(dnaRletter)
        .font(font)
        .move(CANVAS.width() - font["size"] * dnaRletter.length, y - font["size"] / 2);
    //draw dna line
    const LINE = CANVAS.line(lx1, y, lx2, y).stroke(stroke)
    const DNA_DRAW = CANVAS.group()
    DNA_DRAW.add(TEXT_L);
    DNA_DRAW.add(TEXT_R);
    DNA_DRAW.add(LINE);
    return {
        id: ID,
        canva: CANVAS,
        draw: DNA_DRAW,
        x: lx1,
        y: y,
        widthActive: widthActive,
        forwardActive: forwardActive,
        reverseActive: reverseActive,
        leftEndPosition: DNAelement.leftEndPosition,
        rightEndPosition: DNAelement.rightEndPosition,
        size: DNAelement.rightEndPosition - DNAelement.leftEndPosition,
        labelName: DNAelement.labelName,
        opacity: DNAelement.opacity,
        stroke: stroke,
        font: font,
        objectType: "dna"
    };
}