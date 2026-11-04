import { css } from "@emotion/react";
import colors from "../theme/colors";

export const GlobalStyles = css`
  :root {
    --color-primary: ${colors.primary};
    --color-secondary: ${colors.secondary};
    --color-grey: ${colors.tertiary.grey};
    --color-black: ${colors.tertiary.black};
  }
  body {
  overscroll-behavior: none;
}
`;
