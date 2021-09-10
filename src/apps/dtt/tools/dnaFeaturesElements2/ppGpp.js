import {
  stroke_validate,
  font_validate,
  color_validate
} from "./draw_validation";
import { label } from "./label";
import config from "./elements.conf.json";
const conf = config.ppGpp;

export default function DrawPpGpp({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  leftEndPosition = 0,
  rightEndPosition = 10,
  labelName = "ppGpp",
  strand = "forward",
  color = "#AFAFAF",
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
  color = color_validate(color, "#AFAFAF");
  // anchor
  if (anchor) {
    leftEndPosition = anchor.leftEndPosition;
    rightEndPosition = leftEndPosition + 10;
  }
  //atributos
  const dnaX = dna.x,
    dnaY = dna.y,
    widthActive = dna.widthActive,
    dnaSize = dna.size,
    x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize;
  //atributos de cuerpo
  let ell_w = font.size * 4;
  let ell_h = font.size + 10;
  const height = conf.height;
  let posX = x + dnaX;
  let posY = dnaY - separation - height / 2 - ell_h / 2;
  if (strand === "reverse") {
    posY = dnaY + separation + height / 2 - ell_h / 2;
  }
  //Draw
  if (labelName === "DksA-ppGpp") {
    canva
      .ellipse(ell_w + 3, ell_h + 2)
      .move(posX, posY)
      .stroke(stroke)
      .fill(color);
    font.size += 2;
    label({
      canvas: canva,
      element_x: posX,
      element_y: posY,
      element_h: ell_h,
      element_w: ell_w,
      text: "DksA",
      font: font
    });
    font.size -= 2;
    posX += ell_w - 1;
  }
  canva.ellipse(ell_w, ell_h).move(posX, posY).stroke(stroke).fill(color);
  label({
    canvas: canva,
    element_x: posX,
    element_y: posY,
    element_h: ell_h,
    element_w: ell_w,
    text: "ppGpp",
    font: font
  });
  const group = canva.group();

  // Toltip
  group.attr({
    "data-tip": "",
    "data-for": `${canva.node?.id}-${id}`
  });

  return {
    id: id,
    canva: canva,
    posX: posX,
    posY: posY,
    height: height,
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
    objectType: "ppGpp",
    tooltip: tooltip
  };
}
