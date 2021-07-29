//Draw RNA v 0.10.0
/**
 *
 */
import { stroke_validate, font_validate, color_validate } from "./validation";
import { label } from "./label";
import config from "./element.conf.json";
const conf = config.srna;

export default function DrawRna({
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
  stroke = stroke_validate(stroke, conf?.stroke);
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

  const proportion = conf.heigth;
  //atributos de rectangulo
  let rnaW = sizeP;
  let rnaH = proportion;
  let posX = x + dnaX;
  let posY = dnaY - separation - rnaH * 2;

  //atributos de lineas
  let l = x + dnaX + sizeP;
  let i = l - sizeP / 5;
  let n = i - sizeP / 5;
  let e = n - sizeP / 5;
  let s = e - sizeP / 5;
  let p = s - sizeP / 5;
  //let posY = dnaY - separation - rnaH;

  //Draw rect
  let rna = canva.rect(rnaW, rnaH);
  rna.move(posX, posY);
  rna.stroke(stroke);
  rna.fill(color);
  //text

  //Draw lines
  var line1 = canva
    .line(l, 0, l, rnaH)
    .stroke(stroke)
    .move(l, posY + rnaH);
  var line2 = canva
    .line(i, 0, i, rnaH)
    .stroke(stroke)
    .move(i, posY + rnaH);
  var line3 = canva
    .line(n, 0, n, rnaH)
    .stroke(stroke)
    .move(n, posY + rnaH);
  var line4 = canva
    .line(e, 0, e, rnaH)
    .stroke(stroke)
    .move(e, posY + rnaH);
  var line5 = canva
    .line(s, 0, s, rnaH)
    .stroke(stroke)
    .move(s, posY + rnaH);
  var line6 = canva
    .line(p, 0, p, rnaH)
    .stroke(stroke)
    .move(p, posY + rnaH);

  var group = canva.group();
  group.add(rna);
  group.add(line1);
  group.add(line2);
  group.add(line3);
  group.add(line4);
  group.add(line5);
  group.add(line6);
  const text = label({
    canvas: canva,
    element_x: posX,
    element_y: posY,
    element_h: rnaH,
    element_w: rnaW,
    text: labelName,
    font: font
  });
  if (strand === "reverse") {
    group.rotate(180);
    group.move(posX, posY - rnaH * 2);
    text.transform({
      translateY: posY - rnaH * 2 - 10
    });
  }
  // Toltip
  group.attr({
    "data-tip": "",
    "data-for": `${canva.node?.id}-${id}`
  });
  return {
    id: id,
    canva: canva,
    draw: group,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: rnaW,
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
    objectType: "rna",
    tooltip: tooltip
  };
}
