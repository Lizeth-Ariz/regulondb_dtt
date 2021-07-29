// TransAtt 0.10.0
/**
 *
 *Falta etiqueta
 */
import { stroke_validate, font_validate, color_validate } from "./validation";
import { label } from "./label";
import config from "./element.conf.json";
const conf = config.transnationalA;

export default function DrawTransnationalAttenuator({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  leftEndPosition = 0,
  rightEndPosition = 10,
  labelName = "geneName",
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
  color = color_validate(color, "#00FFFF");
  if (anchor) {
    leftEndPosition = anchor.leftEndPosition;
    rightEndPosition = leftEndPosition + 1;
    strand = anchor.strand;
  }
  // atributos
  const dnaX = dna.x,
    dnaY = dna.y,
    size = rightEndPosition - leftEndPosition,
    widthActive = dna.widthActive,
    dnaSize = dna.size,
    x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize;
  let sizeP = (size * widthActive) / dnaSize;
  //scale
  const proportion = conf.heigth;
  //atributos de Cuerpo
  let bodyHeigth = proportion * 3 + separation;
  let bodyFootH = proportion / 4;
  let bodyFootW = 0;
  if (sizeP >= proportion) {
    bodyFootW = sizeP / 2 - proportion / 3;
  }
  let bodyX = x + dnaX;
  let bodyY = dnaY - bodyHeigth - bodyFootH;
  //atributos de Cabeza
  let headH = proportion;
  let headX = dnaX + x + sizeP / 2 - headH / 2;
  let headY = dnaY - bodyHeigth - headH;
  // atributos del rectangulo
  let rectWidth = proportion / 2;
  let rectHeigth = proportion * 2;
  let rectX = dnaX + x + sizeP - bodyFootW;
  let rectY = dnaY - bodyHeigth;
  let posX = x;
  let posY = headY;
  let traH = headH + bodyHeigth;
  // anchor effect
  if (anchor) {
  }
  // dibujo de  BODY
  const body = canva.path(
    "M 0,0 v " +
      bodyHeigth +
      " h -" +
      bodyFootW +
      " v " +
      bodyFootH +
      " h " +
      sizeP +
      " v -" +
      bodyFootH +
      " h -" +
      bodyFootW +
      " v " +
      -bodyHeigth
  );
  body.fill(color).move(bodyX, bodyY);
  body.stroke(stroke);
  body.opacity(opacity);
  // dibujo de HEAD
  const head = canva.circle(headH);
  head.fill(color).move(headX, headY);
  head.stroke(stroke);
  head.opacity(opacity);
  // dibujo de RECT
  const rect = canva.rect(rectWidth, rectHeigth);
  rect.fill(color).move(rectX, rectY);
  rect.stroke(stroke);
  // reverse effect
  let group = canva.group();
  group.add(body);
  group.add(head);
  group.add(rect);
  if (strand === "reverse") {
    group.transform({
      rotate: 180,
      translateY: bodyHeigth + headH + 1
    });
  }
  group.attr({
    "data-tip": "",
    "data-for": `${canva.node?.id}-${id}`
  });
  //returns :C
  return {
    id: id,
    canva: canva,
    draw: group,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
    heigth: traH,
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
    objectType: "transnational_attenuator",
    tooltip: tooltip
  };
}
