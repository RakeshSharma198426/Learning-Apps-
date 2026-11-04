import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

vi.mock("../../../core/constants/locale-strings", () => ({
  LocaleStrings: {
    sideMenuBarListItems: {
      dashboard: "Dashboard overview",
      projects: "Projects",
      jobs: "Jobs",
      logout: "Log Out",
    },
    sideMenuBar: {
      hiText: "Hi",
      subTitle: "Let's start creating your next FRD",
      createNewProjectButtonTitle: "Create New Project",
    },
  },
}));

// 2. Setup MSAL mock reference to override per test
const logoutRedirectMock = vi.fn();

vi.mock("@azure/msal-react", () => ({
  useMsal: () => ({
    instance: {
      logoutRedirect: logoutRedirectMock,
    },
  }),
}));

beforeEach(() => {
  sessionStorage.setItem("userProfile", JSON.stringify({ name: "John Doe" }));
  logoutRedirectMock.mockClear();
});

describe("Sidebar", () => {
  const renderSidebar = () =>
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

  it("renders sidebar content correctly", () => {
    renderSidebar();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("Hi John Doe!")).toBeInTheDocument();
    expect(screen.getByTestId("create-project-button")).toBeInTheDocument();
  });

  it("renders all menu items", () => {
    renderSidebar();
    expect(
      screen.getByTestId("sidebar-menu-item-dashboardoverview")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("sidebar-menu-item-projects")
    ).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-menu-item-jobs")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-menu-item-logout")).toBeInTheDocument();
  });

  it("shows logout modal and calls logoutRedirect on confirm", () => {
    renderSidebar();

    const logoutItem = screen.getByTestId("sidebar-menu-item-logout");
    fireEvent.click(logoutItem);

    const modalTitle = screen.getByText("Are you sure, you want to logout?");
    expect(modalTitle).toBeInTheDocument();

    const confirmButton = screen.getByTestId("left-button");
    fireEvent.click(confirmButton);

    expect(logoutRedirectMock).toHaveBeenCalledTimes(1);
  });
});
