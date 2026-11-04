import React from "react";
import { Box } from "@mui/material";
import RoundedButton from "./Button/RoundedButton";

const NoListAvailableYet = ({
  imageSrc = null,
  title = "",
  description = "",
  buttons = [],
}) => {
  const isSingleButton = buttons.length === 1;
  const isButtonPresent = buttons.length > 0;
  const [primaryButton, secondaryButton] = buttons;

  return (
    <Box
      display="grid"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      p={4}
      width={460}
      mx="auto"
    >
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt="No Projects"
          sx={{
            display: "block",
            mx: "auto",
          }}
        />
      )}

      <div
        className="text-montserrat-32-bold"
        style={{ color: "#000000", margin: "32px 0 16px 0" }}
      >
        {title}
      </div>

      <div
        className="text-montserrat-16-medium"
        style={{
          color: "#6D6D6D",
          marginBottom: "32px",
          whiteSpace: "pre-line",
        }}
      >
        {description}
      </div>

      {isButtonPresent && (
        <>
          {isSingleButton ? (
            <Box display="flex" justifyContent="center">
              <RoundedButton
                text={primaryButton.title}
                imageSrc={primaryButton.imageSrc}
                variant="primary-large"
                onClick={primaryButton.onClick}
                height={48}
                width={220}
                testId="left-button"
              />
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              maxWidth={600}
              mx="auto"
              gap="24px"
            >
              <RoundedButton
                text={primaryButton.title}
                imageSrc={primaryButton.imageSrc}
                variant="primary-large"
                onClick={primaryButton.onClick}
                height={48}
                width={220}
                testId="left-button"
              />

              <RoundedButton
                text={secondaryButton.title}
                imageSrc={secondaryButton.imageSrc}
                variant="secondary-large"
                onClick={secondaryButton.onClick}
                height={48}
                width={220}
                testId="right-button"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default NoListAvailableYet;
