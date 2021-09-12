//DrawGene v 1.0.0
/**
 * falta agregar la funcion para mostrar el corte del elemento,
 */
import {
    stroke_validate,
    font_validate,
    color_validate
  } from "../../validation/v_draw";
  import { label } from "./label";
  
  export default function DrawGene({
    id,
    canvas,
    anchor,
    dna,
    separation = 0,
    leftEndPosition = 0,
    rightEndPosition = 20,
    labelName = "geneName",
    strand = "forward",
    color = "aqua",
    opacity = 1,
    stroke,
    font,
    tooltip = "",
    conf
  }) {
    //Validation
    if (!canvas || !dna || !id || !conf || (leftEndPosition > rightEndPosition)) {
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
    const height = conf.height;
    const proportion = height / 40;
    const body_height = 20 * proportion;
  
    const rowW = () => {
      return body_height * conf?.rowSize;
    };
    const lx1 = width + dnaX + x;
    const ly1 = body_height;
    const lx2 = width + dnaX - rowW() + x;
    const ly2 = 0;
    let posX = x + dnaX;
    let posY = dnaY - separation - body_height * 2;
    //Draw Gene
    const gene = canvas.path(
      "m " +
        (x + dnaX) +
        "," +
        body_height / 2 +
        " v " +
        body_height +
        " h " +
        (width - rowW()) +
        " v " +
        body_height / 2 +
        " L " +
        lx1 +
        "," +
        ly1 +
        " " +
        lx2 +
        "," +
        ly2 +
        " v " +
        body_height / 2 +
        " z"
    );
    gene.move(posX, posY);
    gene.fill(color);
    gene.stroke(stroke);
    gene.opacity(opacity);
    //label
    const text = label({
      canvas: canvas,
      element_x: posX,
      element_y: posY + body_height / 2,
      element_h: body_height,
      element_w: width,
      text: labelName,
      font: font
    });
    // reverse effect
    if (strand === "reverse") {
      if (anchor) {
        posX = x;
        posY = dnaY + separation;
      }
      gene.transform({
        rotate: 180,
        translateY: body_height * 2
      });
      text.transform({
        translateY: body_height * 2
      });
      posY = body_height * 2 + posY;
      
    }
    let overlapArea = canvas.path(`M ${posX} ${posY+body_height/2} l ${width} 0 l 0 ${body_height}`).fill("none")
    overlapArea.id(id)
    // Toltip
    gene.attr({
      "data-tip": "",
      "data-for": `${canvas.node?.id}-${id}`
    });
    let group = canvas.group();
    group.add(overlapArea)
    group.add(gene)
    group.add(text)
    return {
      id: id,
      canvas: canvas,
      draw: group,
      posX: posX,
      posY: posY,
      width: width,
      height: body_height,
      dna: dna,
      separation: separation,
      leftEndPosition: leftEndPosition,
      rightEndPosition: rightEndPosition,
      size: leftEndPosition-rightEndPosition,
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