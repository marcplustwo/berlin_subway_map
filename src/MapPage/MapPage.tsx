import React, { useState } from "react";

import { PictureOverlay } from "./PictureOverlay/PictureOverlay";
import { getStationById } from "./SubwayMap/data/getRoutesData";
import { Gallery } from "./SubwayMap/Gallery/Gallery";
import { SubwayMap } from "./SubwayMap/SubwayMap";

const MapPage: React.FC = () => {
  const [currentStationId, setCurrentStationId] = useState<string | undefined>(
    undefined
  );
  const [showGallery, setShowGallery] = useState(false);

  const station = getStationById(currentStationId ?? "");

  return (
    <>
      <SubwayMap station={station} setCurrentStationId={setCurrentStationId} />
      <PictureOverlay
        toggleGallery={() => setShowGallery(!showGallery)}
        setCurrentStationId={setCurrentStationId}
        station={station}
      />
      {showGallery && (
        <Gallery station={station} closeGallery={() => setShowGallery(false)} />
      )}
    </>
  );
};

export { MapPage };
