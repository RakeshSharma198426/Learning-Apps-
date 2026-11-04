import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SortByModal from "../../components/Sorting/SortByModal";

// Mock the LocaleStrings import to isolate component behavior
vi.mock("../../core/constants/locale-strings", () => ({
  LocaleStrings: {
    sortByText: "Sort by",
  },
}));

describe("SortByModal", () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    label: "Sort by Date",
    selected: { field: "date", direction: "desc" },
    options: [
      { field: "date", direction: "desc", label: "Newest First" },
      { field: "date", direction: "asc", label: "Oldest First" },
    ],
    onChange: mockOnChange,
  };

  it("renders correctly with toggle button", () => {
    render(<SortByModal {...defaultProps} />);
    expect(screen.getByTestId("sort-by-modal")).toBeInTheDocument();
    expect(screen.getByTestId("sort-by-toggle")).toBeInTheDocument();
    expect(screen.queryByTestId("sort-by-dropdown")).not.toBeInTheDocument();
  });

  it("opens dropdown when toggle is clicked", () => {
    render(<SortByModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("sort-by-toggle"));
    expect(screen.getByTestId("sort-by-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("sort-by-label")).toHaveTextContent(
      "Sort by Date"
    );
  });

  it("calls onChange and closes dropdown when option is clicked", () => {
    render(<SortByModal {...defaultProps} />);
    fireEvent.click(screen.getByTestId("sort-by-toggle"));

    const option = screen.getByTestId("sort-by-option-asc");
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalledWith({
      field: "date",
      direction: "asc",
      label: "Oldest First",
    });

    expect(screen.queryByTestId("sort-by-dropdown")).not.toBeInTheDocument();
  });
});
