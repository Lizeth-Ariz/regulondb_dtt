import { Color } from "@svgdotjs/svg.js";

export function stroke_validate(stroke, strokeDefault) {
  stroke.color = color_validate(stroke?.color);
  if (!stroke?.width) {
    stroke.width = strokeDefault.width;
  }
  if (!stroke?.linecap) {
    stroke.linecap = strokeDefault.linecap;
  }
  return stroke;
}

export function font_validate(font, fontDefult) {
  font.fill = color_validate(font?.fill);

  if (!font?.family) {
    font.family = fontDefult.family;
  }
  if (!font?.size || isNaN(font?.size)) {
    font.size = fontDefult.size;
  }
  if (!font?.separation) {
    font.separation = fontDefult.separation;
  }
  return font;
}

export function color_validate(color, defColor = "#000000") {
  try {
    color = new Color(color);
  } catch (e) {
    color = new Color(defColor);
  }
  return color;
}

export function stroke_define(feature) {
  return {
    color: rgb_to_rgbFormat(feature?.lineRGBColor),
    width: feature?.lineWidth,
    linecap: feature?.lineType
  };
}
export function font_define(feature) {
  return {
    family: feature?.labelFont,
    size: feature?.labelSize,
    fill: rgb_to_rgbFormat(feature?.labelRGBColor),
    separation: "middle"
  };
}
export function rgb_to_rgbFormat(rgb) {
  if (rgb) {
    return `rgb(${rgb})`;
  }
  return undefined;
}

export function opacity_define(feature) {
  let op = 1;
  if (feature.OverlapObjects !== []) {
    op = 0.7;
  }
  return op;
}