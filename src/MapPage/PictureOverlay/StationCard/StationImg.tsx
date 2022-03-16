import React, { useEffect, useState } from "react";

interface StationImgProps {
  stopId: string;
  id: number;
  onError?(): void;
  // onLoad?(): void;
  isPreview?: boolean;
}
const imgBasePath =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001/"
    : "https://marcradau.de/";

const getImgPath = (stopId: string, id: number): string => {
  return `${imgBasePath}${stopId}-${id}.jpg`;
};

const StationImg: React.FC<StationImgProps> = (props) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => setIsError(false), [props.stopId]);

  if (isError && props.id === 1) {
    return (
      <img
        style={{ height: "100%", width: "100%" }}
        src={`${imgBasePath}placeholder.jpg`}
        loading="lazy"
      />
    );
  }

  return isError && !props.isPreview ? null : (
    <img
      style={{ height: "100%", width: "100%" }}
      src={getImgPath(props.stopId, props.id)}
      loading="lazy"
      onError={() => setIsError(true)}
      onLoad={() => setIsError(false)}
    />
  );
};

export { StationImg };
