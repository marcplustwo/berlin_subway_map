import React, { useState } from "react";

interface StationImgProps {
  stopId: string;
  id: number;
  onError?(): void;
  onLoad?(): void;
  isPreview?: boolean;
}
const imgBasePath = "http://localhost:8001/";

const getImgPath = (stopId: string, id: number): string => {
  return `${imgBasePath}${stopId}-${id}.jpg`;
};

const StationImg: React.FC<StationImgProps> = (props) => {
  const [isError, setIsError] = useState(false);

  return isError && !props.isPreview ? null : (
    <img
      style={{ height: "100%", width: "100%" }}
      src={getImgPath(props.stopId, props.id)}
      loading="lazy"
      onError={() => setIsError(true)}
      onLoad={props.onLoad}
    />
  );
};

export { StationImg };
