const orderDraw = [
  "dna",
  "promoter",
  "riboswitch",
  "transcriptional_attenuator",
  "transnational_attenuator",
  "terminator",
  "gene",
  "operon",
  "srna",
  "rna",
  "ppGpp",
  "tf_binding_site"
];

const orderDNA = {
  dna: 0,
  gene: 1,
  operon: 2,
  promoter: 3,
  riboswitch: 4,
  transcriptional_attenuator: 5,
  transnational_attenuator: 6,
  terminator: 7,
  srna: 8,
  rna: 9,
  ppGpp: 10,
  tf_binding_site: 11
};

export function orderZ(dnaFeatures_data) {
  dnaFeatures_data.map((feature) => {
    let drawPriority = orderDraw.indexOf(feature?.objectType);
    if (drawPriority < 0) {
      drawPriority = orderDraw.length;
    }
    feature.drawPriority = drawPriority;
    feature.dnaPriority = orderDNA[feature.objectType];
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
