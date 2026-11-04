import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProjectSummaryCardList from "../../components/Cards/ProjectSummaryCardList";
import mockProjects from "../../__mocks__/mockProjects.json";

describe("ProjectSummaryCardList", () => {
  const projects = mockProjects.projects.slice(0, 2); // Use only a couple for brevity

  it("renders the correct number of project cards with correct content", () => {
    render(
      <ProjectSummaryCardList
        projects={projects}
        onViewAll={() => {}}
        onCreateNewProject={() => {}}
      />
    );

    projects.forEach((project) => {
      const card = screen.getByTestId(`project-item-${project.id}`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(project.projectName);
      expect(card).toHaveTextContent(project.clientName);
      expect(card).toHaveTextContent(project.projectDescription);
    });
  });

  it("calls onViewAll when 'View All Projects' is clicked", () => {
    const handleViewAll = vi.fn();
    render(
      <ProjectSummaryCardList
        projects={projects}
        onViewAll={handleViewAll}
        onCreateNewProject={() => {}}
      />
    );

    fireEvent.click(screen.getByTestId("view-all-projects-button"));
    expect(handleViewAll).toHaveBeenCalledOnce();
  });

  it("calls onCreateNewProject when 'Create New Project' is clicked", () => {
    const handleCreateNewProject = vi.fn();
    render(
      <ProjectSummaryCardList
        projects={projects}
        onViewAll={() => {}}
        onCreateNewProject={handleCreateNewProject}
      />
    );

    fireEvent.click(screen.getByTestId("create-new-project-button"));
    expect(handleCreateNewProject).toHaveBeenCalledOnce();
  });

  it("renders 'Add Job' button for each card and triggers alert on click", () => {
    window.alert = vi.fn(); // Mock alert

    render(
      <ProjectSummaryCardList
        projects={projects}
        onViewAll={() => {}}
        onCreateNewProject={() => {}}
      />
    );

    const addJobButtons = screen.getAllByTestId("add-job-button");
    expect(addJobButtons.length).toBe(projects.length);

    fireEvent.click(addJobButtons[0]);
    expect(window.alert).toHaveBeenCalledWith("Add Job clicked!");
  });
});
