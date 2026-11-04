import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loader from "../../components/Loader/Loader";

describe("Loader component", () => {
  it("renders CircularProgress", () => {
    render(<Loader />);

    // Check that CircularProgress (by role or test-id) is in the document
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
  });

  it("renders with full screen centered styles", () => {
    const { container } = render(<Loader />);

    const div = container.firstChild;
    expect(div).toHaveStyle({
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    });
  });
});
