import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import reducer, { fetchProjects } from "../../api/projectsSlice";
import api from "../../api/axios";
import mockProjects from "../../__mocks__/mockProjects.json";

// Mock axios
vi.mock("../../api/axios");

describe("projectsSlice with mocked API data", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        projects: reducer,
      },
    });
    vi.clearAllMocks();
  });

  it("should populate dashboardProjects and allProjects on success", async () => {
    api.get.mockResolvedValueOnce({ data: mockProjects });

    await store.dispatch(fetchProjects());

    const state = store.getState().projects;

    expect(state.dashboardProjects).toEqual(mockProjects.projects.slice(0, 2));
    expect(state.allProjects).toEqual(mockProjects.projects);
    expect(state.totalCount).toBe(mockProjects.totalRecords);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle API error gracefully", async () => {
    api.get.mockRejectedValueOnce(new Error("Mocked API Error"));

    await store.dispatch(fetchProjects());

    const state = store.getState().projects;

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Mocked API Error");
  });
});
