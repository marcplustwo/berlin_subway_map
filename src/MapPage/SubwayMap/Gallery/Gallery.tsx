/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import {
  Fab,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import { css } from "@emotion/react";
import Close from "@mui/icons-material/Close";

import { Station } from "../../../interfaces/station";
import { Box } from "@mui/system";
import { StationImg } from "../../PictureOverlay/StationCard/StationImg";

const paperStyle = css({
  position: "absolute",
  top: "4rem",
  left: "1rem",
  right: "1rem",
  height: "54vh",
  zIndex: 100000,
  backgroundColor: "#2e3440",
  padding: "0.5rem",
  overflowY: "hidden",
});

const fabStyle = css({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
});

interface GalleryProps {
  closeGallery(): void;
  station: Station;
}

const Gallery: React.FC<GalleryProps> = (props) => {
  // This is really hacky
  // I'm not proud of it
  // Let me explain: we have a number of pics
  // labeled {id}-{1, 2, 3, 4, 5}
  // but ex-ante I don't know how many pics there are for each id
  // so let's count up and download and see what happens
  const [numOfPics, setNumOfPics] = useState(1);

  useEffect(() => setNumOfPics(1), [props.station.stop_id]);

  return (
    <Paper css={paperStyle} elevation={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography color="#d8dee9" variant="h4">
          {props.station.stop_name.replace("(Berlin)", "").trim()}
        </Typography>
      </Box>
      <ImageList cols={2} gap={4} sx={{ width: "100%", height: "100%" }}>
        {Array.from(Array(6))
          .map((_, i) => i + 1)
          .map((nr) => (
            <ImageListItem key={`${props.station.stop_id}-${nr}`}>
              <StationImg
                // onError={() => {}}
                // onLoad={() => {
                //   console.log(numOfPics);
                //   setNumOfPics((num) => num + 1);
                // }}
                stopId={props.station.stop_id}
                id={nr}
              />
            </ImageListItem>
          ))}
      </ImageList>
      <Fab
        onClick={props.closeGallery}
        size="small"
        css={fabStyle}
        aria-label="add"
      >
        <Close />
      </Fab>
    </Paper>
  );
};

export { Gallery };
