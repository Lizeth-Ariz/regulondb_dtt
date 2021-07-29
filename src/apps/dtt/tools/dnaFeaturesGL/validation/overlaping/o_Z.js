const orderDraw = [
  "dna",
  "promoter",
  "riboswitch",
  "transcriptional_attenuator",
  "transnational_attenuator",
  "terminator",
  "operon",
  "gene",
  "srna",
  "rna",
  "ppGpp",
  "tf_binding_site"
];

export function orderZ(dnaFeatures_data) {
  dnaFeatures_data.map((feature) => {
    let drawPriority = orderDraw.indexOf(feature?.objectType);
    if (drawPriority < 0) {
      drawPriority = orderDraw.length;
    }
    feature.drawPriority = drawPriority;
    return null;
  });
  dnaFeatures_data.sort(function (a, b) {
    if (a?.drawPriority > b?.drawPriority) {
      return 1;
    }
    if (a?.drawPriority < b?.drawPriority) {
      return -1;
    }
    return 0;
  });
  return dnaFeatures_data;
}

/*
-> Agregar drawPriority
-> Hacer sort en el arreglo

**/
