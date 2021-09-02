import { validateElements } from "./v_elements";
import { validateDNA } from "./v_DNA";
import { overlaping } from "./v_overlaping";

export function validation(dnaFeatures_data) {
  // console.log(dnaFeatures_data)
  // validar Id y estructura de dnaFeatures_data es una array []
  dnaFeatures_data = validateElements(dnaFeatures_data);
  dnaFeatures_data = validateDNA(dnaFeatures_data);
  dnaFeatures_data = overlaping(dnaFeatures_data);
  return dnaFeatures_data;
}
