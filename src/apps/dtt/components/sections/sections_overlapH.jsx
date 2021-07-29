//Transnational_Attenuator
import React from "react";
import { DNAfeatures } from "../../tools/dnaFeaturesGL/dna_features";
import { dataA } from "../../conf/ge_overlapHorizontal";

export const OverlapH = () => {
  return (
    <div id="section_Transnational_Attenuator">
      <h2>OvelapH</h2>
      <div id="tnA_Draw">
        <DNAfeatures
          id_drawPlace="tnA_Draw"
          id_canvas="tnA_canvas03"
          dnaFeatures_data={dataA}
        />
      </div>
    </div>
  );
};


