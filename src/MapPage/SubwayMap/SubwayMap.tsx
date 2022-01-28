import React from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// weird hack incoming: https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-410450387
import L from "leaflet";
import {
  getRouteForStation,
  useRouteCoordinates,
  useStationsData,
} from "./data/getRoutesData";
import { routeColors } from "../../constants/routeColors";
import { Station } from "../../interfaces/station";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface SubwayMapProps {
  station: Station | undefined;
  setCurrentStationId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SubwayMap: React.FC<SubwayMapProps> = (props) => {
  const routeCoords = useRouteCoordinates();
  const stations = useStationsData();

  const currentRoute = getRouteForStation(props.station?.stop_id ?? "");

  return (
    <>
      <MapContainer
        style={{ height: "60vh", width: "100vw" }}
        center={[52.5262526, 13.3461733]}
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stations.map((station) => (
          <Marker
            key={`${station.stop_id}-${station.route_id}`}
            position={[station.stop_lat, station.stop_lon]}
            opacity={station.stop_id === props.station?.stop_id ? 1 : 0.5}
            eventHandlers={{
              click: () => props.setCurrentStationId(station.stop_id),
              // mouseover: () => {
              //   console.log("here");
              //   setShowPopup(true);
              // },
              // mouseout: () => setShowPopup(false),
            }}
          ></Marker>
        ))}
        {props.station && (
          <Popup
            offset={[0, -20]}
            position={[props.station.stop_lat, props.station.stop_lon]}
          >
            {props.station.stop_name} ({props.station.route_short_name})
          </Popup>
        )}
        {Object.entries(routeCoords).map(([routeName, position], idx) => (
          <Polyline
            key={`${routeName}-${idx}`}
            positions={position}
            pathOptions={{
              ...routeColors[routeName],
              weight: props.station && routeName === currentRoute ? 8 : 4,
              opacity: props.station && routeName === currentRoute ? 1 : 0.5,
            }}
          />
        ))}
      </MapContainer>
    </>
  );
};

export { SubwayMap };
