// Promoter 0.10.0
/**
 *
 */
import {
  stroke_validate,
  font_validate,
  color_validate
} from "../validation/v_draw";
import { label } from "./label";
export default function DrawPromoter({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  leftEndPosition = 10,
  rightEndPosition = 50,
  labelName = "Name",
  strand = "forward",
  color = "aqua",
  opacity = 1,
  stroke,
  font,
  tooltip = "",
  conf
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
    x = ((leftEndPosition - dna.leftEndPosition) * widthActive) / dnaSize;
  //scale
  let scaleH = conf.height/10
  let scaleW = conf.width/30
  //Row attributes
  let arrowH = 10 * scaleH/2
  let arrowW = 30 * scaleW
  //Leg attributes
  let legH = separation + arrowH/2;
  let height = scaleH+font.size;
  let posX = x + dnaX;
  let posY = dnaY - legH - arrowH*2;
  //draw Arrow
  const ARROW = canva.path(
    `m ${posX} ${dnaY-legH} l ${arrowW} 0 l -${arrowH/2} -${arrowH/2} l ${arrowH/2} ${arrowH/2} l -${arrowH/2} ${arrowH/2}`
  );
  ARROW.fill("none");
  ARROW.stroke(stroke);
  //text
  const TEXT = label({
    canvas: canva,
    x: posX,
    y: posY+3,
    text: labelName,
    font: font
  });
  //leg
  let lh = dnaY-legH;
  if (strand === "reverse") {
    ARROW.move(posX-arrowW,dnaY+legH-arrowH/2);
    ARROW.rotate(180);
    TEXT.move(posX-arrowW,dnaY+legH);
    lh =dnaY+legH;
    posX = posX-arrowW;
    posY = dnaY+legH-arrowH/2
  }
  const leg = canva.line(x + dnaX, dnaY, x + dnaX, lh).stroke(stroke)
  let promoter = canva.group();
  promoter.id(id)
  promoter.add(ARROW)
  promoter.add(TEXT)
  return {
    id: id,
    canva: canva,
    draw: promoter,
    leg: leg,
    posX: posX,
    posY: posY,
    height: height,
    arrowW: arrowW,
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
