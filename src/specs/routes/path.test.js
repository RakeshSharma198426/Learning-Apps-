import ROUTES from "../../routes/path";

describe("ROUTES", () => {
  it("should have the correct route paths", () => {
    expect(ROUTES.ROOT).toBe("/");
    expect(ROUTES.FORGOT_PASSWORD).toBe("/forgot-password");
    expect(ROUTES.DASHBOARD).toBe("/dashboard");
    expect(ROUTES.PROJECTS).toBe("/projects");
    expect(ROUTES.JOBS).toBe("/jobs");
    expect(ROUTES.UNAUTHORIZED_PAGE).toBe("/unauthorized-error");
  });
});
