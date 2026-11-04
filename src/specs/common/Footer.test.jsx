import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer/footer";
import { LocaleStrings } from "../../constants/locale-strings";

describe("Footer", () => {
  it("renders the localized copyright text", () => {
    render(<Footer />);

    const normalizedText = LocaleStrings.footer.copyRightText.replace(
      /\u00A0/g,
      " "
    );

    expect(
      screen.getByText(
        (content) => content.replace(/\u00A0/g, " ") === normalizedText
      )
    ).toBeInTheDocument();
  });
});
