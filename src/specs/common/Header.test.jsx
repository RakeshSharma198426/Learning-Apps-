import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "../../components/Header/header";

vi.mock("../../core/constants/locale-strings", () => ({
  LocaleStrings: {
    search: "Search for Projects...",
    sortByText: "Sort by",
  },
}));

describe("Header component", () => {
  it("renders the header root and bar", () => {
    render(<Header onSearch={() => {}} />);
    expect(screen.getByTestId("header-root")).toBeInTheDocument();
    expect(screen.getByTestId("header-bar")).toBeInTheDocument();
  });

  it("renders logo correctly", () => {
    render(<Header onSearch={() => {}} />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/assets/svg/Logo.svg");
  });

  it("renders divider", () => {
    render(<Header onSearch={() => {}} />);
    expect(screen.getByTestId("header-divider")).toBeInTheDocument();
  });

  it("does not render search bar if isSearchBar is false", () => {
    render(<Header onSearch={() => {}} isSearchBar={false} />);
    expect(screen.queryByTestId("search-wrapper")).not.toBeInTheDocument();
  });

  it("renders search bar if isSearchBar is true", () => {
    render(<Header onSearch={() => {}} isSearchBar={true} />);
    const wrapper = screen.getByTestId("search-wrapper");
    const input = screen.getByTestId("search-input");
    const icon = screen.getByTestId("search-icon");

    expect(wrapper).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search for Projects...");
  });

  it("calls onSearch with correct input value", () => {
    const mockOnSearch = vi.fn();
    render(<Header onSearch={mockOnSearch} isSearchBar={true} />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "dashboard" } });

    expect(mockOnSearch).toHaveBeenCalledWith("dashboard");
  });
});
