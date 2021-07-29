import { stroke_validate, font_validate, color_validate } from "./validation";
import { label } from "./label";
import config from "./element.conf.json";
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
    x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize,
    sizeP = conf.width;
  //atributos de cuerpo
  let ppGppH = conf.heigth;
  let ppGppW = sizeP;
  let dksAX = 0;
  let posX = x + dnaX;
  let posY = dnaY - separation - ppGppH;
  if (labelName === "DksA-ppGpp") {
    ppGppW = sizeP / 2;
    dksAX = posX;
    posX += ppGppW;
  }
  //Draw
  const ppGpp = canva.ellipse(ppGppW, ppGppH);
  ppGpp.move(posX, posY).stroke(stroke).fill(color);
  const group = canva.group();
  group.add(ppGpp);
  let text;
  //DksA effect
  if (labelName === "DksA-ppGpp") {
    const dksA = canva.ellipse(ppGppW, ppGppH);
    dksA.move(dksAX, posY).stroke(stroke).fill(color);
    font.size = font.size - 0.2 * font.size;
    text = label({
      canvas: canva,
      element_x: dksAX,
      element_y: posY - 10,
      element_h: ppGppH,
      element_w: ppGppW,
      text: "DksA ppGpp",
      font: font
    });
    group.add(dksA);
  } else {
    text = label({
      canvas: canva,
      element_x: posX,
      element_y: posY - 10,
      element_h: ppGppH,
      element_w: ppGppW,
      text: "ppGpp",
      font: font
    });
  }
  group.add(text);
  //strand effect
  if (strand === "reverse") {
    posY = dnaY + separation;
    if (labelName === "DksA-ppGpp") {
      group.move(dksAX, posY);
    } else {
      group.move(posX, posY);
    }
  }
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
    sizeP: sizeP,
    heigth: ppGppH,
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
