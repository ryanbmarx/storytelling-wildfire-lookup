const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

// Set ASSET_PATH here for webpack builds
const GIT_BRANCH = process.env.GIT_BRANCH ? process.env.GIT_BRANCH : "dev";
const ASSET_PATH = `https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps/${GIT_BRANCH}/wildfires-lookup/`;
process.env.ASSET_PATH = process.env.ASSET_PATH ? process.env.ASSET_PATH : ASSET_PATH;

module.exports = {
  entry: {
    bundle: ["@webcomponents/custom-elements", "whatwg-fetch", "./src/main.js"]
  },
  devServer: {
    // index: __dirname + "/public/index.html",
    contentBase: [
      // path.resolve('./static'),
      path.resolve("./public")
    ],
    historyApiFallback: {
      index: "index.html"
    }
  },
  resolve: {
    extensions: [".mjs", ".js", ".svelte"]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js"
  },
  module: {
    rules: [
      {
        test: /\.(m?js|svelte)$/,
        exclude: /\/node_modules\/(?!(svelte|d3-scale)\/)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {
              "useBuiltIns": "usage",
              "corejs": 3
            }]]
          }
        }
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  devtool: prod ? false : "source-map"
};
