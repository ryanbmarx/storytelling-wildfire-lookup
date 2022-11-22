# Wildfire risk database | Gannett Storytelling Studio

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template-webpack.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template-webpack svelte-app
cd svelte-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start webpack:

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and the page should reload with your changes.

# The Data

The data for this project is provided by [Ren Larson](mailto:pamela.larson@azcentral.com). To update data, convert it to a CSV named WHP_raw.csv and put it in the `/data/` folder. Run the command `npm run data` to process the CSV and create `towns.json`. This command runs the node script `./data/process-data.js`.

# Embedding this database

This database can exist as a standalone page (via it's UW response built in the `/public/` folder), but it also can be used as a storytellingEmbed in in-depth. To do so, using asset swap, set the `storytellingEmbed` property to `wildfire-lookup/embed.html`. The app has a util function called `isStandalone()` which returns a boolean which can be used to alter design, content or styles based on it's value (i.e. different intro for the standalone version vs. the embedded).

# Remaining TODO

## Map geocoding

This is the main outstanding item. The app simply needs a `GEOID` value to display all the charts, so if the map can call that `setActiveTown()` function, then we should be all set.

The ultimate goal is to have the map geocoder input in the `<Search>` component, so it can be placed independently of the `<Map>` component.

## Charts

Mitchell is working on generating PNGs of actual data to use instead of the rainbow placeholders

## Color ramp for WHP

The various designs for this project use a color ramp keyed to WHP. There needs to be a single ramp defined and implemented. At present, the database app uses a d3 linear scale, found in `/utils/whp-scale.js/`. It should be easy enough to replace it with, say, a 5-bucket quantize scale. The charts and associated text should adapt automatically.

## Get text

There are lots of filler texts throughout the app. Much of that is collected in `stores.js`. It would be appropriate to remove text from component templates and place them in the store so that everything is editable in one place. Still needed are:

- Main headline
- Intro text
- Intro text and headline specifically written for standalone?
- Short, pithy definitions of each risk factor.
- Desired chart title for each risk factor

# Embedding this lookup

The wildfire lookup can be placed via asset swap. So, it's probably best to create a Presto embed with a spike link or CTA to the standalone lookup (production URL forthcoming).

```
{assets.XXXXX}
storytellingEmbed: wildfires-lookup/embed.html
{}
```

As updates are made to the lookup, you might need to add a cache bust parameter to the url:

```
{assets.XXXXX}
storytellingEmbed: wildfires-lookup/embed.html?randomLettersAndNumbersToBustCache
{}
```

To embed a town profile, add a `dataTown` attribute.

```
{assets.XXXXX}
storytellingEmbed: wildfires-lookup/embed.html
dataTown: <geoid>
{}
```

Each town has a geoid in the data, and an associated url. The url can be used in the CTA/spike link

- Pine, AZ

  - Geoid: 0455700
  - url: <produrl>/towns/pine-az-0455700

- Ruidoso, NM

  - Geoid: 3565210
  - url: <produrl>/towns/ruidoso-nm-3565210

- Cascade-Chipita Park, CO

  - Geoid: 0812325
  - url: <produrl>/towns/cascade-chipita-park-co-0812325

- Rogue River, Oregon

  - Geoid: 4163450
  - url: <produrl>/towns/rogue-river-or-4163450

- Riggins, ID

  - Geoid: 1667870
  - url: <produrl>/towns/riggins-id-1667870

- Leavenworth, WA

  - Geoid: 5338845
  - url: <produrl>/towns/leavenworth-wa-5338845

- East Glacier, Mont.

  - Geoid: 3022985
  - url: <produrl>/towns/east-glacier-park-village-mt-3022985

- Idylwild, CA

  - Geoid: 0636203
  - url: <produrl>/towns/idyllwild-pine-cove-ca-0636203

- Merlin, Ore.
  - Geoid: 4147650
  - url: <produrl>/towns/merlin-or-4147650
