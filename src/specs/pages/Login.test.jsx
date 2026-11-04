import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useMsal } from "@azure/msal-react";
import { vi, describe, it, beforeEach, expect } from "vitest";

import Login from "../../pages/Login/login";

// Mock the useMsal hook
vi.mock("@azure/msal-react", () => ({
  useMsal: vi.fn(),
}));

describe("Login component", () => {
  const mockLoginRedirect = vi.fn();
  const mockInstance = { loginRedirect: mockLoginRedirect };

  beforeEach(() => {
    vi.clearAllMocks();
    useMsal.mockReturnValue({ instance: mockInstance });
    sessionStorage.clear();
  });

  it("renders all main elements correctly", () => {
    render(<Login />);

    expect(screen.getByAltText("Wipfli Logo")).toBeInTheDocument();
    expect(screen.getByText("FRD creation Login")).toBeInTheDocument();
    expect(screen.getByText("Glad to see you here !")).toBeInTheDocument();
    expect(
      screen.getByText("Welcome to WipFli FRD generation platform")
    ).toBeInTheDocument();
    expect(screen.getByText("Login with Azure SSO")).toBeInTheDocument();
    expect(screen.getByText("Need help?")).toBeInTheDocument();
    expect(screen.getByText("Contact IT Support")).toBeInTheDocument();
  });

  it("calls loginRedirect and sets sessionStorage on button click", () => {
    render(<Login />);

    const loginButton = screen.getByRole("button", {
      name: /Login with Azure SSO/i,
    });

    fireEvent.click(loginButton);

    expect(sessionStorage.getItem("postLoginRedirect")).toBe("/dashboard");
    expect(mockLoginRedirect).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: "select_account",
      })
    );
  });
});
