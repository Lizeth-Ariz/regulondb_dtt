// Promoter 0.10.0
/**
 *
 */
import { stroke_validate, font_validate, color_validate } from "./validation";
import { label } from "./label";
import config from "./element.conf.json";
const conf = config.promoter;

export default function DrawPromoter({
  id,
  canva,
  anchor,
  dna,
  separation = 20,
  leftEndPosition = 10,
  rightEndPosition = 50,
  labelName = "Name",
  strand = "forward",
  color = "aqua",
  opacity = 1,
  stroke,
  font,
  tooltip = ""
}) {
  if (!canva || !dna || !id || leftEndPosition > rightEndPosition) {
    return null;
  }
  stroke = stroke_validate(stroke, conf.stroke);
  font = font_validate(font, conf.font);
  color = color_validate(color, "#000");
  //anchor
  if (anchor) {
    leftEndPosition = anchor.leftEndPosition;
    rightEndPosition = leftEndPosition + 10;
  }
  // atributos
  const dnaX = dna.x,
    dnaY = dna.y,
    widthActive = dna.widthActive,
    dnaSize = dna.size,
    x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize,
    sizeP = ((rightEndPosition - leftEndPosition) * widthActive) / dnaSize;
  //atributos de Cuerpo
  const bodyH = conf.heigth;
  const heigth = conf.heigth + separation + 50;
  let px = x + dnaX;
  let py = dnaY - heigth;
  let ay = dnaY - heigth - 5;

  //text
  const text = label({
    canvas: canva,
    x: px,
    y: dnaY - heigth - font.size,
    text: labelName,
    font: font
  });
  // draw body
  const body = canva.path("M 0 0 V " + -heigth + "H " + text.length() + "v");
  body.fill("none").move(px, py);
  body.stroke(stroke);
  //atributos de arrow
  let headH = conf.heigth;
  let ax = x + dnaX + text.length() - 4;

  let PromH = bodyH + headH;
  let posX = x;
  let posY = ay;
  // draw arrow
  const arrow = canva.path("m 0,0 5,5 -5,5 v 0");
  arrow.fill("none").move(ax, ay);
  arrow.stroke(stroke);
  //anchor effect
  if (anchor) {
    posX = anchor.posX;
    posY = anchor.posY - separation - anchor.heigth;
    if (anchor.strand === "reverse") {
      posX = anchor.posX;
      posY = anchor.posY + anchor.heigth + separation;
    }
  }
  var group = canva.group();
  group.add(body);
  group.add(arrow);

  // reverse effect
  if (strand === "reverse") {
    group.transform({
      rotate: 180,
      translateX: -bodyH,
      translateY: heigth + 5
    });
    text.transform({
      translateY: heigth * 2 + 15,
      translateX: -bodyH + 5
    });
  }
  // group.add(text);
  // Toltip
  group.attr({
    "data-tip": "",
    "data-for": `${canva.node?.id}-${id}`
  });
  return {
    id: id,
    canva: canva,
    sizeP: sizeP,
    draw: group,
    posX: posX,
    posY: posY,
    heigth: PromH,
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
    objectType: "promoter",
    tooltip: tooltip
  };
}
