import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import SidebarLayout from "../../layouts/SidebarLayout";

// Partial mock of react-router-dom preserving all except Outlet
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet" />,
  };
});

// Mock Header and Sidebar components
vi.mock("../../components/Header/header", () => {
  return {
    __esModule: true,
    default: (props) => (
      <div data-testid="mock-header">
        Header {props.isSearchBar === "true" ? "(search enabled)" : ""}
      </div>
    ),
  };
});

vi.mock("../../components/Sidebar/Sidebar", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-sidebar">Sidebar</div>,
  };
});

describe("SidebarLayout", () => {
  it("renders Header, Sidebar, and Outlet", () => {
    render(<SidebarLayout />);

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });

  it("passes isSearchBar='true' prop to Header", () => {
    render(<SidebarLayout />);
    const header = screen.getByTestId("mock-header");
    expect(header.textContent).toContain("search enabled");
  });
});
