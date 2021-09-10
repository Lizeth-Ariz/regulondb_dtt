import { validateElements } from "./v_elements";
import { validateDNA } from "./v_DNA";

export function validation(dnaFeatures_data) {
  dnaFeatures_data = validateElements(dnaFeatures_data);
  dnaFeatures_data = validateDNA(dnaFeatures_data);
  return dnaFeatures_data;
}
