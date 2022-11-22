// Returns whichever color is the better overlay for the supplied background color (hex required). Defaults to BW, but can take any color values as output possibilities

export function getTextColor(bgColor, lightColor = "#fff", darkColor = "#000") {
  // If there is a hash, then assume it is hex. Otherwise assume it is RGB and convert
  let color = bgColor.replace("#", "");
  let r, g, b;
  if (color.length === 3) {
    //   If it is a 3-value hex color;
    r = parseInt(color.substring(0, 1), 16); // hexToR
    g = parseInt(color.substring(1, 2), 16); // hexToG
    b = parseInt(color.substring(2, 3), 16); // hexToB
  } else if (color.length === 6) {
    //   If it is a 6-value hex color;
    r = parseInt(color.substring(0, 2), 16); // hexToR
    g = parseInt(color.substring(2, 4), 16); // hexToG
    b = parseInt(color.substring(4, 6), 16); // hexToB
  } else {
    //   Short circuit if hex value is bad.
    return;
  }
  //   var r = parseInt(color.substring(0, 2), 16); // hexToR
  //   var g = parseInt(color.substring(2, 4), 16); // hexToG
  //   var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map(col => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
