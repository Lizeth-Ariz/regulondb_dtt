// Promoter 0.10.0
/**
 *
 */
import {
  stroke_validate,
  font_validate,
  color_validate
} from "./draw_validation";
import { label } from "./label";
import config from "./elements.conf.json";
const conf = config.promoter;

export default function DrawPromoter({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  geneHeight = 50,
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
  if(separation>0){
    geneHeight = 0;
  }
  let group = canva.group();
  const dnaX = dna.x,
    dnaY = dna.y,
    widthActive = dna.widthActive,
    dnaSize = dna.size,
    x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize,
    sizeP = ((rightEndPosition - leftEndPosition) * widthActive) / dnaSize;
  //scale
  let scaleH = conf.height/10
  let scaleW = conf.width/30
  //Row attributes
  let arrowH = 10 * scaleH/2
  let arrowW = 30 * scaleW
  //Leg attributes
  let legH = separation + geneHeight + arrowH/2;
  let height = legH+scaleH;
  let posX = x + dnaX;
  let posY = dnaY - legH - arrowH*2;
  //draw Arrow
  const ARROW = canva.path(
    `m ${posX} ${dnaY} l 0 -${legH} l ${arrowW} 0 l -${arrowH/2} -${arrowH/2} l ${arrowH/2} ${arrowH/2} l -${arrowH/2} ${arrowH/2}`
  );
  ARROW.fill("none");
  ARROW.stroke(stroke);
  //text
  const TEXT = label({
    canvas: canva,
    x: posX,
    y: posY,
    text: labelName,
    font: font
  });
  if (strand === "reverse") {
    ARROW.move(posX,dnaY)
    ARROW.rotate(180)
    TEXT.move(posX,dnaY+legH)
  }
  /*
  let bodyH = conf.height / 2 + separation - 15;
  //console.log(conf);
  let bodyW = conf.width;
  const headH = conf.height;
  const height = headH + bodyH;
  let posX = x + dnaX;
  let posY = dnaY;
  let txtX;
  let txtY;
  // atributos de flecha
  let pmX;
  let pmY;
  let az;
  // atributos de position
  if (strand === "reverse") {
    bodyH = posY + bodyH + headH / 2;
    bodyW = posX - bodyW;
    txtX = bodyW;
    txtY = bodyH + font.size - 5;
    pmX = bodyW;
    pmY = bodyH;
    az = -5;
  } else {
    bodyH = posY - bodyH - headH / 2;
    bodyW = posX + bodyW;
    txtX = posX;
    txtY = bodyH - font.size - 5;
    pmX = bodyW;
    pmY = bodyH;
    az = 5;
  }

  // draw body
  const body = canva.path(
    "M " + posX + "," + posY + " " + posX + "," + bodyH + "H " + bodyW
  );
  body.fill("none");
  body.stroke(stroke);

  //text
  const text = label({
    canvas: canva,
    x: txtX,
    y: txtY,
    text: labelName,
    font: font
  });

  // draw arrow
  const arrow = canva.path(
    "M " +
      (pmX - az) +
      "," +
      (pmY + az) +
      " " +
      pmX +
      "," +
      pmY +
      " " +
      (pmX - az) +
      "," +
      (pmY - az)
  );
  arrow.fill("none");
  arrow.stroke(stroke);
  */
  return {
    id: id,
    canva: canva,
    sizeP: sizeP,
    draw: group,
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
    objectType: "promoter",
    tooltip: tooltip
  };
}
