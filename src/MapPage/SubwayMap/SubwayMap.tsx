import React, { useState } from "react";
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
  getStationById,
  useRouteCoordinates,
  useStationsData,
} from "./data/getRoutesData";
import { PictureOverlay } from "./PictureOverlay/PictureOverlay";
import { routeColors } from "../../constants/routeColors";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const SubwayMap: React.FC = () => {
  const routeCoords = useRouteCoordinates();
  const stations = useStationsData();

  const [currentStationId, setCurrentStationId] = useState<string | undefined>(
    undefined
  );

  const station = getStationById(currentStationId ?? "");

  const currentRoute = getRouteForStation(currentStationId ?? "");

  return (
    <>
      <PictureOverlay
        setCurrentStationId={setCurrentStationId}
        station={station}
      />
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
            opacity={station.stop_id === currentStationId ? 1 : 0.5}
            eventHandlers={{
              click: () => setCurrentStationId(station.stop_id),
            }}
          >
            <Popup>
              {station.stop_name} ({station.route_short_name})
            </Popup>
          </Marker>
        ))}
        {station && (
          <Popup
            offset={[0, -20]}
            position={[station.stop_lat, station.stop_lon]}
          >
            {station.stop_name} ({station.route_short_name})
          </Popup>
        )}
        {Object.entries(routeCoords).map(([routeName, position], idx) => (
          <Polyline
            key={`${routeName}-${idx}`}
            positions={position}
            pathOptions={{
              ...routeColors[routeName],
              weight: station && routeName === currentRoute ? 8 : 4,
              opacity: station && routeName === currentRoute ? 1 : 0.5,
            }}
          />
        ))}
      </MapContainer>
    </>
  );
};

export { SubwayMap };
