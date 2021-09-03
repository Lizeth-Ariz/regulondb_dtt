// Terminador 0.10.0
/**
 * Falta testear
 * head de la figura se sale de posicion
 */
import { stroke_validate, font_validate, color_validate } from "./draw_validation";
import { label } from "./label";
import config from "./elements.conf.json";
const conf = config.terminator;

export default function DrawTerminador({
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
  color = color_validate(color, "#000000");
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
  const proportion = conf.height / 40;
  //atributos de Cuerpo
  let bodyHeight = 12 * proportion + separation;
  let bodyFootH = 5 * proportion;
  let bodyFootW = 0;
  if (sizeP > 10) {
    bodyFootW = (sizeP / 2) - 5;
  }

  let posX = x + dnaX;
  let posY = dnaY - bodyHeight - bodyFootH;
  //dibujo del Cuerpo
  const body = canva.path(
    `m 15 18 v ${bodyHeight} h -${bodyFootW} v ${bodyFootH} h ${sizeP} v -${bodyFootH} h -${bodyFootW} v -${bodyHeight}`
  );
  body.move(posX, posY);
  body.attr({
    "fill-opacity": 0
  });
  body.stroke(stroke);
  body.opacity(opacity);
  //atributos de Cabeza
  let headH = 18 * proportion;
  //let headW = 20 * proportion;
  let headX = dnaX + x + bodyFootW - (5 * proportion);
  let headY = dnaY - bodyHeight - bodyFootH - headH;
  var head = canva.path(
    `m 15 18 c -2 0 -5 -3 -5 -8 c 0 -13 20 -13 20 0 c 0 5 -3 8 -5 8`
  );
  head.move(headX, headY);
  head.attr({
    "fill-opacity": 0
  });
  head.stroke(stroke);
  head.opacity(opacity);
  //atributos Generales
  let height = bodyHeight + bodyFootH + headH;
  var group = canva.group();
  group.add(body);
  group.add(head);
  // reverse effect
  if (strand === "reverse") {
    group.move(dnaX + x, dnaY);
    group.transform({
      rotate: 180
    });
    /*
    text.transform({
      translateY: (bodyHeight + bodyFootH + 30) * 2
    });
  */
  }
  // tooltip data
  group.attr({
    "data-tip": "",
    "data-for": `${canva.node?.id}-${id}`
  });
  /*
     //text (label Name)
     const text = label({
       canvas: canva,
       x: headX,
       y: headY - font.size,
       text: labelName,
       font: font
     });
     
  */
  return {
    id: id,
    canva: canva,
    //draw: group,
    posX: posX,
    posY: posY,
    sizeP: sizeP,
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
    objectType: "terminator",
    tooltip: tooltip
  };
}
