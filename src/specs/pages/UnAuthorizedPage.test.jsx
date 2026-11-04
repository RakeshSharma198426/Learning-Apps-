import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { describe, it, beforeEach, vi, expect } from "vitest";
import UnAuthorizedPage from "../../pages/UnAuthorizedError/UnAuthorizedPage";

// Mock react-router navigate
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

// Mock MSAL hook
vi.mock("@azure/msal-react", () => ({
  useMsal: vi.fn(),
}));

// Mock LocaleStrings with your exact strings
vi.mock("../../core/constants/locale-strings", () => ({
  LocaleStrings: {
    roleBaseErrorScreen: {
      title:
        "Oops, You don't have sufficient Permission or Roles to View the Dashboard",
      helperText1: " If you believe this is an error, please",
      helperText2: " contact your administrator",
      helperText3: ", Or Please Login with Valid credentials",
      loginAgainButtonText: "Login again",
    },
  },
}));

describe("UnAuthorizedPage", () => {
  let mockNavigate;
  let mockLogoutRedirect;

  beforeEach(() => {
    mockNavigate = vi.fn();
    mockLogoutRedirect = vi.fn();

    useNavigate.mockReturnValue(mockNavigate);
    useMsal.mockReturnValue({
      instance: {
        logoutRedirect: mockLogoutRedirect,
      },
    });

    sessionStorage.clear();
  });

  it("redirects to root if authError not in sessionStorage", () => {
    render(<UnAuthorizedPage />);
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("renders error content when authError is in sessionStorage", () => {
    sessionStorage.setItem("authError", "true");

    render(<UnAuthorizedPage />);

    // Check for exact text from LocaleStrings.roleBaseErrorScreen
    expect(
      screen.getByText(
        "Oops, You don't have sufficient Permission or Roles to View the Dashboard"
      )
    ).toBeDefined();

    expect(
      screen.getByText(/If you believe this is an error, please/)
    ).toBeDefined();

    expect(screen.getByText(/contact your administrator/)).toBeDefined();

    expect(
      screen.getByText(/Or Please Login with Valid credentials/)
    ).toBeDefined();

    expect(screen.getByRole("button", { name: /Login again/i })).toBeDefined();

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("logout button calls logoutRedirect and clears sessionStorage", () => {
    sessionStorage.setItem("authError", "true");
    render(<UnAuthorizedPage />);

    const logoutBtn = screen.getByRole("button", { name: /Login again/i });
    fireEvent.click(logoutBtn);

    expect(mockLogoutRedirect).toHaveBeenCalledWith({
      postLogoutRedirectUri: "/",
    });
    expect(sessionStorage.getItem("authError")).toBeNull();
  });
});
