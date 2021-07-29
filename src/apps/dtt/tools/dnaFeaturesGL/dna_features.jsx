import React from "react";
import { validation } from './validation/validation'
import Canvas from './canvas'

export const DNAfeatures = ({
  id_drawPlace,
  id_canvas,
  dnaFeatures_data,
  width = "auto",
  height = 300,
  dna_pos = 150
}) => {
  dnaFeatures_data = validation(dnaFeatures_data)
  if (dnaFeatures_data) {
    return (
      <Canvas
        id_canvas={id_canvas}
        id_drawPlace={id_drawPlace}
        dnaFeatures_data={dnaFeatures_data}
        width={width}
        height={height}
        dna_pos={dna_pos}
      />
    );
  }
  return <p>dnaFeature data not valid for drawing</p>;
}