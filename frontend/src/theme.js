import { createMuiTheme } from "@material-ui/core";

/*
  Ice Cold: #a0d2eb

  Freeze Purple: #e5eaf5 // body background color

  Medium Purple: #d0bdf4 // secondary

  Purple Pain: #8458B3 // primary

  Heavy Purple: #a28089

  #494D5F
*/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8458B3",
    },
    secondary: {
      main: "#d0bdf4",
    },
    iceCold: {
      main: "#a0d2eb",
    },
    freezePurple: {
      main: "#e5eaf5",
    },
    heavyPurple: {
      main: "#a28089",
      light: "#e9e2e4",
    },
    greyBlueShade: {
      main: "#494D5F",
      light: "#c5c8d3",
    },
    darkSlateBlue: {
      main: "#483D8B",
    },
    silverGrey: {
      main: "rgba(215, 218, 218, 0.7)",
    },
    darkGrey: {
      main: "#9D9D9D",
    },
  },
  props: {
    MuiPaper: {
      elevation: 0,
    },
  },
});

export default theme;
