import { GlobalStyles } from "../../styles/globalStyles";
import colors from "../../theme/colors";

describe("GlobalStyles", () => {
  test("should contain correct CSS variables for colors", () => {
    const cssString = GlobalStyles.styles || GlobalStyles;

    expect(cssString).toContain(`--color-primary: ${colors.primary}`);
    expect(cssString).toContain(`--color-secondary: ${colors.secondary}`);
    expect(cssString).toContain(`--color-grey: ${colors.tertiary.grey}`);
    expect(cssString).toContain(`--color-black: ${colors.tertiary.black}`);
  });
});
