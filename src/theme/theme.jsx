import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.secondary, // White background
    },
    text: {
      primary: colors.tertiary.black,
      secondary: colors.tertiary.grey,
    },
  },
  typography: {
    fontFamily: "'Montserrat', helvetica",
  },
});

export default theme;
