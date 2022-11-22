const d3 = require("d3");
const sander = require("sander");
const bbox = require("@turf/bbox");
const centroid = require("@turf/centroid");

/*
This script, at the moment, just converts csv to json. Eventually it 
will be used to scrub and redduce the size of the resulting data
*/
const stats = ["whp", "egress_dem", "pc_75p", "pc_disab", "pc_lep", "pc_mhh_park"];
const statsPercentages = ["pc_75p", "pc_disab", "pc_lep", "pc_mhh_park"];
const extentLookup = {
  whp: [1, 5],
  egress_dem: [0, 1350],
  pc_75p: [0, 100],
  pc_lep: [0, 100],
  pc_disab: [0, 100],
  pc_mhh_park: [0, 100]
};

sander
  .readFile("./data/WHP_raw.csv", { encoding: "utf-8" })
  .then(data => d3.csvParse(data))
  .then(data => {
    // Grab the first row, b/c that has our dates in it.
    const dates = data[0];
    outputUpdates(dates);
    // Send the data, minus our dates, on their way
    return data.slice(1);
  })
  .then(data => {
    // Here, we will calcuate the min, max and median values for our desired stats
    const computed = {};

    stats.forEach(stat => {
      // set extent to manual override, or d3.extent if override does not exist
      const extent = extentLookup[stat] ? extentLookup[stat] : d3.extent(data, d => parseFloat(d[stat]));
      const median = d3.median(data, d => parseFloat(d[stat]));
      if (statsPercentages.indexOf(stat) > -1) {
        computed[stat] = {
          min: extent[0] / 100,
          max: extent[1] / 100,
          median: median / 100
        };
      } else {
        computed[stat] = {
          min: extent[0],
          max: extent[1],
          median: median
        };
      }
    });
    return {
      towns: data,
      computed: computed
    };
  })
  .then(data => {
    // A little cleanup here.

    // We know the whp is indexed 1-5, so we should chart all the way with this manual override
    data.computed.whp.max = 5;
    // We also know that the min WHP is 1, so let's set that manually
    data.computed.whp.min = 1;

    return data;
  })
  .then(data => {
    // Convert this from array to object
    const lookupObject = {};
    data.towns.forEach(d => {
      //first up format geoid correctly to join with map data
      d["geoid"] = formatGeoid(d["geoid"]);
      const geoid = d["geoid"];

      lookupObject[geoid] = {
        // Add a unique slug for routing purposes
        slug: slugify(`${d.name}-${d.state}-${d.geoid}`),
        name: d["name"],
        state: d["state"],
        // Lets check for incorrect whp values below 1 and fix them here
        whp: d["whp"] < 1 ? 1 : d["whp"],
        egress_dem: d["egress_dem"],
        tot_pop: d["tot_pop"],
        tot_hh: d["tot_hh"],
        majroads: d["majroads"],
        wea: d["wea_aa"].toLowerCase() == "true"
      };

      statsPercentages.forEach(s => {
        if (parseFloat(d[s]) !== NaN) {
          // If the value doesn't parse as a number, then skip it.
          // These are % figures, but we want them 0<n<1 for easier formatting
          lookupObject[geoid][s] = d[s] / 100;
        }
      });
    });
    data.towns = lookupObject;
    return data;
  })
  .then(data => {
    // here we load the geojson and calculate each feature's bounding box
    return new Promise((resolve, reject) => {
      sander
        .readFile("./data/places.json", { encoding: "UTF-8" })
        .then(geoData => {
          JSON.parse(geoData).features.forEach(feature => {
            const { GEOID } = feature.properties;
            const { geometry } = feature;
            const featureBbox = bbox(geometry);
            const featureCenter = centroid(geometry).geometry.coordinates;
            if (data.towns[GEOID]) {
              data.towns[GEOID]["bbox"] = featureBbox;
              data.towns[GEOID]["ctr"] = featureCenter;
            }
          });
          resolve(data);
        })
        .catch(e => reject(e));
    });
  })
  .then(data => {
    sander.writeFile("./public/towns.json", JSON.stringify(data)).catch(e => {
      // Write file error
      console.log(e);
    });
  })
  .catch(e => {
    // Read file error
    console.log(e);
  });

function slugify(str) {
  // Cribbed from https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
  const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;";
  const b = "aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function formatGeoid(geoid) {
  const format = d3.format("0>7");
  return format(geoid);
}

function outputUpdates(dates) {
  // This function takes a row from the data and outputs our tiny dates file.
  let updateDates = {};
  for (let stat of stats) {
    if (dates[stat]) {
      const date = d3.timeFormat("%b. %-d, %Y")(new Date(dates[stat]));
      updateDates[stat] = makeApStyle(date);
    }
  }

  sander.writeFile("./public/updates.json", JSON.stringify(updateDates)).catch(e => {
    // Write file error
    console.log(e);
  });
}

function makeApStyle(d) {
  return d
    .replace("Mar.", "March")
    .replace("Apr.", "April")
    .replace("May.", "May")
    .replace("Jun.", "June")
    .replace("Jul.", "July")
    .replace("Sep.", "Sept.");
}
