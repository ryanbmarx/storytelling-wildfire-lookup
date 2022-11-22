import { scaleQuantize } from "d3-scale";

// establish color ramp for WHP
const scale = scaleQuantize()
  .domain([1, 5])
  .range(["#ffc800", "#eb9c1b", "#d67123", "#bf4225"]);

export function getWhpColor(val) {
  return scale(val);
}
