import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "../../routes/appRoutes.jsx";
import ROUTES from "../../routes/path.js";
import { isAuthenticated } from "../../utils/auth.js";

// Mocking the authentication function
vi.mock("../../utils/auth");

describe("AppRoutes", () => {
  it("should render login page if not authenticated", () => {
    isAuthenticated.mockReturnValue(false); // Simulating a non-authenticated user

    render(
      <MemoryRouter initialEntries={[ROUTES.ROOT]}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Assert that Login page is displayed
    expect(screen.getByText("Login with Azure SSO")).toBeInTheDocument();
  });
});
