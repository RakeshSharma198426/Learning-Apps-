import { describe, it, expect, beforeEach } from "vitest";
import api from "../../api/axios";

describe("Axios instance", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should set the baseURL from environment", () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_BASE_URL);
  });

  it("should add Authorization header when accessToken is in sessionStorage", async () => {
    const token = "mock-token";
    sessionStorage.setItem("accessToken", token);

    const mockConfig = { headers: {} };

    const updatedConfig = await api.interceptors.request.handlers[0].fulfilled(
      mockConfig
    );

    expect(updatedConfig.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it("should not add Authorization header when accessToken is not in sessionStorage", async () => {
    const mockConfig = { headers: {} };

    const updatedConfig = await api.interceptors.request.handlers[0].fulfilled(
      mockConfig
    );

    expect(updatedConfig.headers.Authorization).toBeUndefined();
  });
});
