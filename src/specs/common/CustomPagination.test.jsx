import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // or jest if you prefer
import CustomPagination from "../../components/Common/CustomPagination/CustomPagination"; // adjust path if needed

describe("CustomPagination", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      count: 5,
      page: 2,
      onChange: vi.fn(),
      ...props,
    };
    render(<CustomPagination {...defaultProps} />);
    return defaultProps;
  };

  it("renders page numbers", () => {
    setup({ count: 3, page: 1 });
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onChange when a page number is clicked", () => {
    const { onChange } = setup({ page: 1 });
    fireEvent.click(screen.getByText("3"));
    expect(onChange).toHaveBeenCalledWith(null, 3);
  });

  it("calls onChange with previous page when 'PREVIOUS' is clicked", () => {
    const { onChange } = setup({ page: 3 });
    fireEvent.click(screen.getByText("PREVIOUS"));
    expect(onChange).toHaveBeenCalledWith(null, 2);
  });

  it("calls onChange with next page when 'NEXT' is clicked", () => {
    const { onChange } = setup({ page: 2 });
    fireEvent.click(screen.getByText("NEXT"));
    expect(onChange).toHaveBeenCalledWith(null, 3);
  });

  it("does not call onChange when on first page and 'PREVIOUS' is clicked", () => {
    const { onChange } = setup({ page: 1 });
    fireEvent.click(screen.getByText("PREVIOUS"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not call onChange when on last page and 'NEXT' is clicked", () => {
    const { onChange } = setup({ page: 5, count: 5 });
    fireEvent.click(screen.getByText("NEXT"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("highlights active page correctly", () => {
    setup({ page: 4, count: 5 });
    const active = screen.getByText("4");
    expect(active.className).toContain("active-numbers");
  });
});
