import React from "react";
import { Button } from "@mui/material";
import "./RoundedButton.css";
import { WipfliBox } from "../Common/wipfli-box";
import { WipfliTypography } from "../Common/wipfli-typography/wipfli-typography";

const RoundedButton = ({
  text,
  imageSrc,
  onClick,
  variant = "primary",
  height,
  width = 280,
  testId,
}) => {
  return (
    <Button
      data-testid={testId}
      onClick={onClick}
      className={`rounded-button ${variant}`}
      sx={{
        height: height,
        width: width,
      }}
    >
      <WipfliTypography variant="headline" className="button-text">
        {text}
      </WipfliTypography>

      {imageSrc && (
        <WipfliBox
          component="img"
          src={imageSrc}
          alt=""
          className="button-icon"
        />
      )}
    </Button>
  );
};

export default RoundedButton;
