import React from "react";
import { Stack } from "@mui/material";
import "./ProjectSummaryCardList.css";
import RoundedButton from "../Button/RoundedButton";
import ProjectSummaryCard from "./ProjectSummaryCard";

const ProjectSummaryCardList = ({
  projects = [],
  onViewAll,
  onCreateNewProject,
}) => {
  return (
    <Stack
      direction="column"
      spacing={3}
      data-testid="project-summary-list-wrapper"
    >
      <div className="card-list" data-testid="project-summary-card-list">
        {projects.map((project) => (
          <ProjectSummaryCard
            key={project.id}
            project={project}
            data-testid={`project-item-${project.id}`}
          />
        ))}
      </div>
      <Stack direction="row" spacing={2} data-testid="project-summary-buttons">
        <RoundedButton
          text="View All Projects"
          imageSrc="assets/svg/Arrow.svg"
          variant="primary-large"
          onClick={onViewAll}
          height={48}
          width={220}
          testId="view-all-projects-button"
        />

        <RoundedButton
          text="Create New Project"
          imageSrc="assets/svg/Plus.svg"
          variant="secondary-large"
          onClick={onCreateNewProject}
          height={48}
          width={220}
          testId="create-new-project-button"
        />
      </Stack>
    </Stack>
  );
};

export default ProjectSummaryCardList;
