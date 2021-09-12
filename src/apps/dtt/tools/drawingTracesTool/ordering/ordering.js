import { orderX } from "./o_X"; // ordena de Izquierda a Derecha
import { orderZ } from "./o_Z";
export default function ordering (dnaFeatures_data) {
  if (!dnaFeatures_data || dnaFeatures_data.length === 0) {
    return null;
  }
  dnaFeatures_data = orderX(dnaFeatures_data);
  dnaFeatures_data = orderZ(dnaFeatures_data);

  return dnaFeatures_data;
}
