import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi, beforeEach } from "vitest";
import reducer from "../../api/projectsSlice";
import api from "../../api/axios";
import Projects from "../../pages/Projects/Projects";
import mockProjects from "../../__mocks__/mockProjects.json";

vi.mock("../../api/axios");

const setupStore = () => configureStore({ reducer: { projects: reducer } });

describe("Projects component with real mockProjects data", () => {
  let store;

  beforeEach(() => {
    store = setupStore();
    vi.clearAllMocks();
  });

  it("renders filtered 'My Projects' (userID=2) by default", async () => {
    api.get.mockResolvedValueOnce({ data: mockProjects });

    render(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    await waitFor(() => screen.getByTestId("projectsMainContainer"));

    // Filter projects for userID 2 (My Projects)
    const myProjects = mockProjects.projects.filter((p) => p.userID === 2);

    // Verify only these appear in the DOM
    myProjects.forEach((proj) => {
      expect(screen.getByTestId(`project-item-${proj.id}`)).toBeInTheDocument();
    });

    // Optionally, verify projects not belonging to userID 2 do NOT appear
    const others = mockProjects.projects.filter((p) => p.userID !== 2);
    others.forEach((proj) => {
      expect(
        screen.queryByTestId(`project-item-${proj.id}`)
      ).not.toBeInTheDocument();
    });
  });

  it("shows all projects when 'All Projects' tab is clicked", async () => {
    api.get.mockResolvedValueOnce({ data: mockProjects });

    render(
      <Provider store={store}>
        <Projects />
      </Provider>
    );

    await waitFor(() => screen.getByTestId("projectsMainContainer"));

    // Click the "All Projects" tab
    fireEvent.click(screen.getByText("All Projects"));

    // All projects (26) should appear
    mockProjects.projects.forEach((proj) => {
      expect(screen.getByTestId(`project-item-${proj.id}`)).toBeInTheDocument();
    });
  });
});
