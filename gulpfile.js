const assert = require("assert");
const fs = require("fs");
const path = require("path");

const gulp = require("gulp");

const sander = require("sander");

const ssr = require("./src/ssr.js");

const check = (exports.default = cb => {
  console.log("Checking configuration.");

  REQUIRED_ENVS.forEach(key => {
    assert(key in process.env, `${key} not found. Please check your .env and try again.`);
  });

  console.log("Good to gulp.");

  cb();
});

exports.clean = cb => sander.unlink(OUTPUT);

exports.uw = async function uw(cb) {
  const filename = path.resolve("./public/uw/wildfires-2019-lookup.json");

  return sander.writeFile(filename, JSON.stringify(ssr.render(), null, 2));
};
