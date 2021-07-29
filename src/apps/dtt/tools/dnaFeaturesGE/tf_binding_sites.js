//Draw Sites v 0.10.0
/**
 * Falta etiqueta
 */
import { stroke_validate, font_validate, color_validate } from "./validation";
//import { label } from "./label";
import config from "./element.conf.json";
const conf = config.sitedna;

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
  // scale
  const proportion = conf.heigth;
  //atributos de cuerpo
  let tfH = proportion;
  let tfW = proportion / 2;
  let posX = x + dnaX;
  let posY = dnaY - separation - tfW;
  //Draw SITES
  let tf_binding = canva.rect(tfH, tfW);
  tf_binding.move(posX, posY).stroke(stroke).fill(color);
  //Text properties
  const textP = canva.text(labelName);
  textP
    .font({
      family: "Arial",
      size: proportion / 5,
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
    heigth: tfH,
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
