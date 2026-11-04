import theme from "../../theme/theme";
import colors from "../../theme/colors";

describe("MUI Theme", () => {
  test("should have correct primary and secondary colors", () => {
    expect(theme.palette.primary.main).toBe(colors.primary);
    expect(theme.palette.secondary.main).toBe(colors.secondary);
  });

  test("should have correct background default color", () => {
    expect(theme.palette.background.default).toBe(colors.secondary);
  });

  test("should have correct text colors", () => {
    expect(theme.palette.text.primary).toBe(colors.tertiary.black);
    expect(theme.palette.text.secondary).toBe(colors.tertiary.grey);
  });

  test("should have Montserrat as the font family", () => {
    expect(theme.typography.fontFamily).toBe("'Montserrat', helvetica");
  });
});
