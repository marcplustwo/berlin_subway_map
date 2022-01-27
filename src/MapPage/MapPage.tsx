import React, { useState } from "react";

import { PictureOverlay } from "./PictureOverlay/PictureOverlay";
import { getStationById } from "./SubwayMap/data/getRoutesData";
import { SubwayMap } from "./SubwayMap/SubwayMap";

const MapPage: React.FC = () => {
  const [currentStationId, setCurrentStationId] = useState<string | undefined>(
    undefined
  );

  const station = getStationById(currentStationId ?? "");

  return (
    <>
      <SubwayMap station={station} setCurrentStationId={setCurrentStationId} />
      <PictureOverlay
        setCurrentStationId={setCurrentStationId}
        station={station}
      />
    </>
  );
};

export { MapPage };
