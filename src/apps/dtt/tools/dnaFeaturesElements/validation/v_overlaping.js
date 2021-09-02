import { orderX } from "./overlaping/o_X"; // ordena de Izquierda a Derecha
import { orderY } from "./overlaping/o_Y"; // ordena los elementos en una determinada altura para evitar sobrelapes
import { orderZ } from "./overlaping/o_Z"; // ordena la prioridad de dibujado

export function overlaping(dnaFeatures_data) {
  if (!dnaFeatures_data || dnaFeatures_data.length === 0) {
    return null;
  }
  dnaFeatures_data = orderX(dnaFeatures_data);
  dnaFeatures_data = orderY(dnaFeatures_data);
  dnaFeatures_data = orderZ(dnaFeatures_data);

  return dnaFeatures_data;
}
