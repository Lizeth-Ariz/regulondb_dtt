import { orderX } from "./o_X"; // ordena de Izquierda a Derecha

export default function ordering (dnaFeatures_data) {
  if (!dnaFeatures_data || dnaFeatures_data.length === 0) {
    return null;
  }
  dnaFeatures_data = orderX(dnaFeatures_data);

  return dnaFeatures_data;
}
