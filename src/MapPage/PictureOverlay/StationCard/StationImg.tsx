import React from "react";

interface StationImgProps {
  stopId: string;
  id: number;
}
const imgBasePath = "http://localhost:8001/";

const getImgPath = (stopId: string, id: number): string => {
  return `${imgBasePath}${stopId}-${id}.JPG`;
};

const StationImg: React.FC<StationImgProps> = (props) => {
  return (
    <img
      style={{ height: "100%", width: "100%" }}
      src={getImgPath(props.stopId, props.id)}
      loading="lazy"
    />
  );
};

export { StationImg };
