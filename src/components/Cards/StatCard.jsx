import React from "react";
import { Card, CardContent, IconButton, Stack } from "@mui/material";
import "./StatCard.css";
import colors from "../../theme/colors";

const StatCard = ({
  title,
  subtitle,
  description,
  "data-testid": dataTestId,
}) => {
  return (
    <Card
      className="statTile"
      data-testid={dataTestId}
      elevation={0}
      sx={{
        borderRadius: "12px",
        border: "1px solid #D0D3D4",
        backgroundColor: "#F3F9FF",
        height: 156,
      }}
    >
      <CardContent
        sx={{
          backgroundColor: "#F3F9FF",
          padding: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            height: 40,
          }}
        >
          <p
            className="text-montserrat-18-semi-bold"
            style={{
              color: "#494949",
              margin: 0,
            }}
          >
            {title}
          </p>
          <IconButton size="small" sx={{ width: 24, height: 24, padding: 0 }}>
            <img
              src="/assets/svg/Chevron_Right.svg"
              width={24}
              height={24}
              alt="Chevron"
            />
          </IconButton>
        </Stack>

        <p
          className="text-lora-36-medium-bold"
          style={{
            color: colors.primary,
            margin: 0,
            marginTop: 16,
          }}
        >
          {subtitle}
        </p>

        <p
          className="text-montserrat-12-regular"
          style={{
            color: "#808080",
            margin: 0,
            marginTop: 16,
          }}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
