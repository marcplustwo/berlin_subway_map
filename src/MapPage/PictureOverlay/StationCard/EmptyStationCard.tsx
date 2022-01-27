/** @jsxImportSource @emotion/react */
import React from "react";
import { Paper } from "@mui/material";
import { css } from "@emotion/react";

const paperStyle = css({
  padding: "0.2rem",
});

const EmptyStationCard: React.FC = () => {
  return (
    <Paper
      css={paperStyle}
      style={{
        height: "70%",
        width: "250px",
      }}
      elevation={0}
    ></Paper>
  );
};

export { EmptyStationCard };
