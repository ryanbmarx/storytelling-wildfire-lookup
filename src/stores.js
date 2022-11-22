import { readable, writable } from "svelte/store";
import { base } from "./utils/links.js";

const demoString = ",.1%";
const scaleLabelFormat = ",.0f";
const scaleLabelFormatPercent = ",.0%";

export const statMeta = readable({
  whp: {
    label: "Wildfire hazard potential",
    description:
      "Wildfire hazard potential is measured on a scale of 1 to 5. WHP incorporates factors such as slope, vegetation and historic weather data such as precipitation and wind speed. Data from the U.S. Forest Service as of 2018.",
    formatString: ".2f",
    formatLabel: scaleLabelFormat
  },
  egress_dem: {
    label: "Evacuation constraint",
    description:
      "Limited routes out of a community can lead to mass congestion during evacuation. Evacuation constraint is measured as the ratio of total households (including seasonal residences, as estimated in the 2017 American Community Survey) to major roads that exit a community as identified in 2019 Open Street Maps data.",
    formatString: ",.1f",
    formatLabel: scaleLabelFormat
  },
  pc_75p: {
    label: "Percentage of residents over age 75",
    description:
      "Disaster research shows that older adults are slower to escape, and more than two-thirds have yet to make significant preparations for emergencies. The percentage of residents who are over age 75 is estimated by the 2017 American Community Survey.",
    formatString: demoString,
    formatLabel: scaleLabelFormatPercent
  },
  pc_disab: {
    label: "Percentage of residents with a disability",
    description:
      "Individuals with disabilities may be dependent on others for evacuation or need communication tailored to their disabilities. The percentage of residents self-reporting a disability is estimated by the 2017 American Community Survey. Disabilities include ambulatory, hearing, cognitive, vision and self-care difficulties.",
    formatString: demoString,
    formatLabel: scaleLabelFormatPercent
  },
  pc_lep: {
    label: "Percentage of residents with limited English proficiency",
    description:
      "Most emergency communication in the United States is in English only, which can deprive residents and visitors of critical (life-saving?) information. The proportion of individuals over age 5 who speak English “not well” or “not at all” is estimated in the 2017 American Community Survey.",
    formatString: demoString,
    formatLabel: scaleLabelFormatPercent
  },
  pc_mhh_park: {
    label: "Percentage of households living in mobile home parks",
    description:
      "The Department of Homeland Security identifies residents of mobile homes as among the most vulnerable in natural disasters. The proportion of households residing in mobile home parks is estimated using 2018 DHS data on mobile home park sizes and 2017 American Community Survey total households.",
    formatString: demoString,
    formatLabel: scaleLabelFormatPercent
  }
});

export const townTopperMeta = readable({
  population: {
    description: "Estimate from the 2017 American Community Survey."
  },
  total_hh: {
    description: "Estimate, including seasonal housing units, from the 2017 American Community Survey."
  },
  wea: {
    description: "FEMA authorizes government agencies to issue wireless emergency alerts to all cell phones in range. Authorized alerting authorities are current as of July 2019."
  }
})

export const intro = readable({
  headline: "Where are the greatest hazards? Look up every Western community",
  standAloneHeadline: "Wildfire risks: Look up every Western community",
  blurb:
    "<p class='sans-serif'>An Arizona Republic and USA TODAY analysis measured the wildfire hazard potential for about 5,000 communities in 11 Western states. Explore the vulnerabilities of each community here. You can search in the field below, or explore on the map.</p>",
  standAloneBlurb: "<p class='sans-serif'>This Arizona Republic and USA TODAY analysis shows the wildfire hazard potential and other risk factors for about 5,000 communities in 11 Western states. Explore the vulnerabilities of each community here.</p><p class='sans-serif'>You can search in the field below or explore on the map. </p><p class='sans-serif'><strong>Our 2019 special report:</strong> <a href='https://www.azcentral.com/in-depth/news/local/arizona-wildfires/2019/07/22/wildfire-risks-more-than-500-spots-have-greater-hazard-than-paradise/1434502001/'>More than 500 communities with a wildfire hazard greater than Paradise, Calif.</a></p>"
});

export const shareText = readable("Explore the risks wildfires pose for more than 5,000 communities across 11 states in this exclusive Arizona Republic/USA TODAY map and analysis.");

export const activeTown = writable(null);
export const data = writable(null);

// For links
const b = base();
export const BASE_URL = readable(b.BASE);
export const ASSET_PATH = readable(b.ASSET_PATH);

export const credits = readable(
  "— By Pamela Ren Larson, Dennis Wagner, Ryan Marx and Mitchell Thorson / USA TODAY NETWORK"
);

export const projectSlug = readable("wildfires-town-risk-factors-2019");

export const mapInstance = writable(null);

export const largeTownNote = readable(
  "This city has more than 15,000 households and was not included in our report’s analysis of small communities."
);

export const kicker = readable("Risk factor data");
export const standAloneKicker = readable("Exclusive USA TODAY analysis")

export const updates = writable(null)