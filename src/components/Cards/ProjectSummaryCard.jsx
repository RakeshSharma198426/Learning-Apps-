import React from "react";
import { Card, Box, Chip, IconButton } from "@mui/material";
import "./ProjectSummaryCard.css";
import RoundedButton from "../Button/RoundedButton";
import { LocaleStrings } from "../../constants/locale-strings";
import colors from "../../theme/colors";
import { formatReadableDate } from "../../utils/dateUtils";

const ProjectSummaryCard = ({
  project,
  "data-testid": dataTestId,
  ...props
}) => {
  const { dashboardScreen } = LocaleStrings;

  const {
    projectName = "Untitled Project",
    modifiedDate = "",
    clientName = "Unknown Client",
    projectDescription = "No description available",
  } = project || {};

  const formattedDate = formatReadableDate(modifiedDate);

  return (
    <Card
      {...props}
      data-testid={dataTestId} // <-- Pass the test id here
      className="tile"
      elevation={0}
      sx={{
        borderRadius: "11px",
        border: "1px solid #D0D3D4",
        padding: 2,
        height: 248,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <p
          className="text-montserrat-10-medium"
          style={{ color: colors.primary }}
        >
          {dashboardScreen.recentProjectsSection.projectSummaryText}
        </p>
        <IconButton size="small" sx={{ width: 18, height: 18, padding: 0 }}>
          <img
            src="/assets/svg/Chevron_Right.svg"
            width={24}
            height={24}
            alt="Chevron Right"
          />
        </IconButton>
      </Box>

      <p
        className="text-montserrat-20-semi-bold"
        style={{ color: "#020202", margin: 0, marginTop: 0 }}
      >
        {projectName}
      </p>

      <Chip
        label={`${dashboardScreen.recentProjectsSection.updatedOnText.toUpperCase()} ${formattedDate.toUpperCase()}`}
        size="large"
        variant="outlined"
        icon={
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#07AB50",
            }}
          />
        }
        sx={{
          borderColor: "#d4d4d4",
          borderRadius: "18px",
          fontFamily: "Montserrat",
          fontSize: 9,
          color: "black",
          fontWeight: "regular",
          height: 20,
          marginTop: "8px",
          marginBottom: "8px",
          alignItems: "center",
        }}
      />

      <p
        className="text-montserrat-14-regular"
        style={{ color: "#666", margin: 0, marginTop: 4 }}
      >
        <span
          className="text-montserrat-14-semi-bold"
          style={{ color: "#000" }}
        >
          Client:
        </span>{" "}
        {clientName}
      </p>
      <Box sx={{ height: 40 }}>
        <p
          className="text-montserrat-12-regular-line"
          style={{
            color: "#323131",
            margin: 0,
            marginTop: 8,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "2.8em",
          }}
        >
          {projectDescription}
        </p>
      </Box>

      <Box sx={{ marginTop: 1.6 }}>
        {" "}
        <RoundedButton
          text={dashboardScreen.recentProjectsSection.addJobButtonTitle}
          imageSrc="assets/svg/Plus.svg"
          variant="secondary-small"
          onClick={() => {}}
          height={32}
          width={126}
          testId="add-job-button"
        />
      </Box>
    </Card>
  );
};

export default ProjectSummaryCard;
