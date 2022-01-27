import React, { useEffect, useState } from "react";

interface StationImgProps {
  stopId: string;
  id: number;
}
const imgBasePath = "http://localhost:8001/";

const getImgPath = (stopId: string, id: number): string => {
  return `${imgBasePath}${stopId}-${id}.JPG`;
};

const fallbackImgUrl = `${imgBasePath}placeholder.JPG`;

const StationImg: React.FC<StationImgProps> = (props) => {
  const [img, setImg] = useState<string>();

  const setDownloadedImg = async (res: Response) => {
    const blob = await res.blob();
    const imageObjectURL = URL.createObjectURL(blob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetch(getImgPath(props.stopId, props.id))
      .then(setDownloadedImg)
      .catch(() =>
        fetch(getImgPath(props.stopId, props.id)).then(setDownloadedImg)
      );
  });
  console.log(img);

  return (
    <img style={{ height: "100%", width: "100%" }} src={img} loading="lazy" />
  );
};

export { StationImg };
