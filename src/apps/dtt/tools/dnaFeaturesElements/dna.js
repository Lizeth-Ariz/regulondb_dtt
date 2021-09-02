//draw DNA v 0.2.0
/**
 * Requiere documetacion y encabezados del manifiesto de RegulonDB
 *  falta etiqueta
 */
import { stroke_validate, font_validate } from "./draw_validation";
import config from "./elements.conf.json";
const conf = config.dna;

export default function DrawDna({
  id,
  canva,
  x = 0,
  y = 150,
  leftEndPosition = 800,
  rightEndPosition = 1000,
  labelName = "DNA",
  opacity = 1,
  stroke,
  font
}) {
  //validacion
  if (!canva || !id) {
    return null;
  }
  stroke = stroke_validate(stroke, conf.stroke);
  font = font_validate(font, conf.font);
  //atributos de text
  const dnaLletter = `${leftEndPosition}`;
  const dnaRletter = `${rightEndPosition}`;
  //atributos de DNA
  const canvaW = canva.node.clientWidth;
  const lx1 = x + (font["size"] * dnaLletter.length) / 2 + 5;
  const lx2 = canvaW - font["size"] * dnaRletter.length;
  const widthActive = lx2 - lx1;
  //console.log(canva.node.clientHeight)
  const forwardActive = y;
  const reverseActive = canva.node.clientHeight - y - stroke.width;
  //draw text
  canva
    .text(dnaLletter)
    .font(font)
    .move(x, y - font["size"] / 2);
  canva
    .text(dnaRletter)
    .font(font)
    .move(canvaW - font["size"] * dnaRletter.length, y - font["size"] / 2);
  //draw dna
  const dna_line = canva.line(lx1, y, lx2, y).stroke(stroke).opacity(opacity);
  //return
  return {
    id: id,
    canva: canva,
    draw: dna_line,
    x: lx1,
    y: y,
    widthActive: widthActive,
    forwardActive: forwardActive,
    reverseActive: reverseActive,
    leftEndPosition: leftEndPosition,
    rightEndPosition: rightEndPosition,
    size: rightEndPosition - leftEndPosition,
    labelName: labelName,
    opacity: opacity,
    stroke: stroke,
    font: font,
    objectType: "dna"
  };
}
