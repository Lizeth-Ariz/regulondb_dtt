//DrawOperon v 1.0.0
/**
 *falta agregar la funcion para mostrar el corte del elemento
 *  falta etiqueta
 */
import {
  stroke_validate,
  font_validate,
  color_validate
} from "./draw_validation";
import { label } from "./label";
import config from "./elements.conf.json";
const conf = config?.operon;

export default function DrawOperon({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  leftEndPosition = 0,
  rightEndPosition = 20,
  labelName = "operonName",
  strand = "forward",
  color = "aqua",
  opacity = 1,
  stroke,
  font,
  tooltip = ""
}) {
  //Validation
  if (!canva || !dna || !id || leftEndPosition > rightEndPosition) {
    return null;
  }
  stroke = stroke_validate(stroke, conf.stroke);
  font = font_validate(font, conf.font);
  color = color_validate(color, "#00FFFF");
  //anchor
  if (anchor) {
    leftEndPosition = anchor.leftEndPosition;
    rightEndPosition = leftEndPosition + 10;
  }
  //atributos
  const dnaX = dna.x,
    dnaY = dna.y,
    dnaSize = dna.size,
    x = ((leftEndPosition - dna.leftEndPosition) * dna?.widthActive) / dnaSize,
    width = ((rightEndPosition - leftEndPosition) * dna.widthActive) / dnaSize;
  // separation
  if (strand === "reverse") {
    separation *= -1;
  }
  //atributos de cuerpo
  const height = conf?.height;
  const rowW = () => {
    return height * conf?.rowSize;
  };
  let posX = x + dnaX;
  let posY = dnaY - separation - height;
  //Draw operon
  const operon = canva.path(
    "m 0,0 v " +
      height +
      " h " +
      (width - rowW()) +
      " L " +
      width +
      "," +
      height / 2 +
      " L " +
      (width - rowW()) +
      "," +
      0 +
      " z"
  );
  operon.move(posX, posY);
  operon.id(id);
  operon.fill(color);
  operon.stroke(stroke);
  operon.opacity(opacity);
  const text = label({
    canvas: canva,
    element_x: posX,
    element_y: posY,
    element_h: height,
    element_w: width,
    text: labelName,
    font: font
  });
  // reverse effect
  if (strand === "reverse") {
    if (anchor) {
      posX = x + dnaX;
      posY = dnaY + separation;
    }
    operon.transform({
      rotate: 180,
      translateY: height
    });
    text.transform({
      translateY: height
    });
    posY = height * 2 + posY;
  }
  // Toltip
  operon.attr({
    "data-tip": "",
    "data-for": `${canva.node?.id}-${id}`
  });
  //return
  return {
    id: id,
    canva: canva,
    draw: operon,
    posX: posX,
    posY: posY,
    width: width,
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
    objectType: conf?.objectType,
    tooltip: tooltip
  };
}
