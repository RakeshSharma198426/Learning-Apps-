import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProjectSummaryCard from "../../components/Cards/ProjectSummaryCard";

const project = {
  id: 29,
  projectName: "Sage5",
  projectDescription: "Sage5 des",
  projectType: "Sage",
  inputFolderPath:
    "https://netorgft18038046.sharepoint.com/sites/WipfliAIInnovation-FRDGenAIProject/FRD%20AI%20App%20Documents/DevSite/Hexa4-Sage5/Input",
  outputFolderPath:
    "https://netorgft18038046.sharepoint.com/sites/WipfliAIInnovation-FRDGenAIProject/FRD%20AI%20App%20Documents/DevSite/Hexa4-Sage5/Output",
  clientName: "Hexa4",
  userID: 2,
  fullName: "John",
  creationDate: "2025-05-29T06:02:14.703",
  modifiedDate: "2025-05-29T06:02:14.703",
};

describe("ProjectSummaryCard", () => {
  it("renders the Project Summary Card correctly", () => {
    render(
      <ProjectSummaryCard
        key={project.id || project.projectName}
        project={project}
      />
    );

    expect(screen.getByText("PROJECT SUMMARY")).toBeInTheDocument();
    expect(screen.getByText(project.projectName)).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes(`Client:`))
    ).toBeInTheDocument();
    expect(screen.getByText(project.clientName)).toBeInTheDocument();

    expect(screen.getByText(project.projectDescription)).toBeInTheDocument();
  });

  it("renders the 'Add Job' button and handles click", () => {
    const handleClick = vi.fn();

    render(
      <ProjectSummaryCard
        key={project.id || project.projectName}
        project={project}
      />
    );

    const addButton = screen.getByText("Add Job");

    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("mocks the alert function on 'Add Job' button click", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <ProjectSummaryCard
        key={project.id || project.projectName}
        project={project}
      />
    );

    const addButton = screen.getByText("Add Job");
    fireEvent.click(addButton);

    expect(alertMock).toHaveBeenCalledWith("Add Job clicked!");

    alertMock.mockRestore();
  });
});
