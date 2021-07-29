// TranscripAtt 0.10.0
/**
 * Falta testear
 */
import { stroke_validate, font_validate, color_validate } from "./validation";
import { label } from "./label";
import config from "./element.conf.json";
const conf = config.transcriptionalA;

export default function DrawTransncriptionalAttenuator({
  id,
  canva,
  anchor,
  dna,
  separation = 0,
  leftEndPosition = 0,
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

  // atributos de Cuerpo
  let bodyHeigth = proportion * 2 + separation;
  let bodyFootH = proportion / 4;
  let bodyFootW = 0;
  if (sizeP >= proportion) {
    bodyFootW = sizeP / 2 - 6 - proportion / 3;
  }

  let posX = x + dnaX;
  let posY = dnaY - bodyHeigth - bodyFootH;
  // atributos de Cabezas
  let headSacale = () => {
    //return (proportion * 33) / 25 / 33;
    if (proportion / 25 > 1) {
      return 1;
    }
    return proportion / 25;
  };
  let headWidth = () => {
    //return 46 - ((20 - proportion) * 8) / 10;
    return headSacale() * 41;
  };
  let headHeigth = () => {
    //return 48 - ((25 - proportion) * 8) / 10;
    return headSacale() * 55;
  };

  let heigth = bodyHeigth + headHeigth();

  // atributos de la linea
  let lineX = x + dnaX + sizeP / 2;
  let lineY = dnaY - bodyHeigth + 5;

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
  body.fill(color).move(posX, posY);
  body.stroke(stroke);
  body.opacity(opacity);
  // dibujo de HEAD's
  var head1 = canva.path(
    "m 25 55 c -11.9 -9.5 -5 -23 1.6 -25. l 0.0 -1.7 C 30 24.6 33.4 20 33.4 15 C 33.4 6.8 26.8 0.2 18.6 0.2 v 0 C 10.5 0.250109 3.90831 6.8556 3.9082 15.0039 C 3.91361 20.0093 5.7943 24.6707 10 27.3848 v 0.865234 v 26.75"
  );
  var head2 = canva.path(
    "m 60 110 v 0 c 3.5 -2.4 5.7 -6.6 5.7 -11.1 c -0.09 -7.3 -5.6 -13.2 -12.5 -13.2 v 0 c -6.91559 0.0001 -12.5218 5.94519 -12.5219 13.2788 c 0.0046 4.50501 2.1627 8.70032 5.73214 11.1431 v 0.0122"
  );
  let head = canva.group();
  let headX = dnaX + x - headWidth() * 0.15;
  let headY = dnaY - separation - bodyHeigth - headHeigth();
  head.add(head1);
  head.add(head2);
  head.move(headX, headY);
  head.transform({
    scale: headSacale(),
    origin: "center"
  });
  head.move(headX, headY);
  head.fill(color);
  head.stroke(stroke);
  head.opacity(opacity);
  // dibujo de LINE
  var line = canva.path("m 0 5 V" + bodyHeigth + "");
  line.stroke(stroke).move(lineX, lineY);
  var group = canva.group();
  group.add(body);
  group.add(head);
  group.add(line);
  // reverse effect
  if (strand === "reverse") {
    group.transform({
      rotate: 180,
      translateY: bodyHeigth + headHeigth() * 2
    });
  }
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
    heigth: heigth,
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
    objectType: "transcriptional_attenuator",
    tooltip: tooltip
  };
}
