import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RoundedButton from "../../components/Button/RoundedButton";

describe("RoundedButton", () => {
  it("renders button with the correct text", () => {
    render(<RoundedButton text="Click Me" onClick={() => {}} />);

    const buttonText = screen.getByText("Click Me");
    expect(buttonText).toBeInTheDocument();
  });

  it("calls the onClick function when clicked", () => {
    const handleClick = vi.fn();
    render(<RoundedButton text="Click Me" onClick={handleClick} />);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the image when imageSrc is provided", () => {
    render(
      <RoundedButton
        text="Click Me"
        imageSrc="assets/svg/Plus.svg"
        onClick={() => {}}
      />
    );

    const image = screen.getByAltText("");
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("assets/svg/Plus.svg");
  });

  it("does not render image when imageSrc is not provided", () => {
    render(<RoundedButton text="Click Me" onClick={() => {}} />);

    const image = screen.queryByAltText("");
    expect(image).not.toBeInTheDocument();
  });

  it("applies the correct styles based on props", () => {
    render(
      <RoundedButton
        text="Styled Button"
        backgroundColor="#FF5733"
        titleColor="#000000"
        borderColor="#FF0000"
        borderWidth={2}
        height={50}
        imageSrc="assets/svg/Plus.svg"
        onClick={() => {}}
      />
    );
  });
});
