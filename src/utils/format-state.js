const states = [
  // { postal: "AL", ap: "Ala.", full: "Alabama" },
  // { postal: "AK", ap: "Alaska", full: "Alaska" },
  { postal: "AZ", ap: "Ariz.", full: "Arizona" },
  // { postal: "AR", ap: "Ark.", full: "Arkansas" },
  { postal: "CA", ap: "Calif.", full: "California" },
  { postal: "CO", ap: "Colo.", full: "Colorado" },
  // { postal: "CT", ap: "Conn.", full: "Connecticut" },
  // { postal: "DE", ap: "Del.", full: "Delaware" },
  // { postal: "DC", ap: "D.C.", full: "District of Columbia" },
  // { postal: "FL", ap: "Fla.", full: "Florida" },
  // { postal: "GA", ap: "Ga.", full: "Georgia" },
  // { postal: "HI", ap: "Hawaii", full: "Hawaii" },
  { postal: "ID", ap: "Idaho", full: "Idaho" },
  // { postal: "IL", ap: "Ill.", full: "Illinois" },
  // { postal: "IN", ap: "Ind.", full: "Indiana" },
  // { postal: "IA", ap: "Iowa", full: "Iowa" },
  // { postal: "KS", ap: "Kan.", full: "Kansas" },
  // { postal: "KY", ap: "Ky.", full: "Kentucky" },
  // { postal: "LA", ap: "La.", full: "Louisiana" },
  // { postal: "ME", ap: "Maine", full: "Maine" },
  // { postal: "MD", ap: "Md.", full: "Maryland" },
  // { postal: "MA", ap: "Mass.", full: "Massachusetts" },
  // { postal: "MI", ap: "Mich.", full: "Michigan" },
  // { postal: "MN", ap: "Minn.", full: "Minnesota" },
  // { postal: "MS", ap: "Miss.", full: "Mississippi" },
  // { postal: "MO", ap: "Mo.", full: "Missourri" },
  { postal: "MT", ap: "Mont.", full: "Montana" },
  // { postal: "NE", ap: "Neb.", full: "Nebraska" },
  { postal: "NV", ap: "Nev.", full: "Nevada" },
  // { postal: "NH", ap: "N.H.", full: "New Hampshire" },
  // { postal: "NJ", ap: "N.J.", full: "New Jersey" },
  { postal: "NM", ap: "N.M.", full: "New Mexico" },
  // { postal: "NY", ap: "N.Y.", full: "New York" },
  // { postal: "NC", ap: "N.C.", full: "North Carolina" },
  // { postal: "ND", ap: "N.D.", full: "North Dakota" },
  // { postal: "OH", ap: "Ohio", full: "Ohio" },
  // { postal: "OK", ap: "Okla.", full: "Oklahoma" },
  { postal: "OR", ap: "Ore.", full: "Oregon" },
  // { postal: "PA", ap: "Pa.", full: "Pennsylvania" },
  // { postal: "RI", ap: "R.I.", full: "Rhode Island" },
  // { postal: "SC", ap: "S.C.", full: "South Carolina" },
  // { postal: "SD", ap: "S.D.", full: "South Dakota" },
  // { postal: "TN", ap: "Tenn.", full: "Tennessee" },
  // { postal: "TX", ap: "Texas", full: "Texas" },
  { postal: "UT", ap: "Utah", full: "Utah" },
  // { postal: "VT", ap: "Vt.", full: "Vermont" },
  // { postal: "VA", ap: "Va.", full: "Virginia" },
  { postal: "WA", ap: "Wash.", full: "Washington" },
  // { postal: "WV", ap: "W.V.", full: "West Virginia" },
  // { postal: "WI", ap: "Wis.", full: "Wisconsin" },
  { postal: "WY", ap: "Wyo.", full: "Wyoming" }
];

const statesByPostal = states.reduce((a, v) => {
  a[v.postal.toLowerCase()] = v;
  return a;
}, {});

const statesByAp = states.reduce((a, v) => {
  a[v.ap.toLowerCase()] = v;
  return a;
}, {});

const statesByFull = states.reduce((a, v) => {
  a[v.full.toLowerCase()] = v;
  return a;
}, {});

const formatStateByFull = stateCode => statesByFull[stateCode.toLowerCase()];
const formatStateByAp = stateCode => statesByAp[stateCode.toLowerCase()];
const formatStateByPostal = stateCode => statesByPostal[stateCode.toLowerCase()];

// {{ formatStateByFull('CALIFORNIA').ap }} => "Calif." || ""

export const formatState = function(stateCode, format = "ap", compareKey = "full") {
  // @param stateCode (string): The value you want to format. This is what is in your data.
  // @param format (string): The format you want the state to be. Probably AP style.
  // @param compareKey (string): What form the data is in now. Are you getting postal codes from your data? Or full names?
  if (!stateCode) return "";
  switch (compareKey.toLowerCase()) {
    case "full":
      return formatStateByFull(stateCode.toLowerCase())[format.toLowerCase()];
    case "ap":
      return formatStateByAp(stateCode.toLowerCase())[format.toLowerCase()];
    case "postal":
      return formatStateByPostal(stateCode.toLowerCase())[format.toLowerCase()];
  }
};
