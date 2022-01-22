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
import { useRouteCoordinates, useRoutesData } from "./data/get_routes_data";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const colorOptions: Record<string, L.PathOptions> = {
  U1: { color: "#55af49", weight: 4 },
  U2: { color: "#f25528", weight: 4 },
  U3: { color: "#10ab99", weight: 4 },
  U4: { color: "#ffd404", weight: 4 },
  U5: { color: "#865942", weight: 4 },
  U6: { color: "#8370ad", weight: 4 },
  U7: { color: "#0798d9", weight: 4 },
  U8: { color: "#085da1", weight: 4 },
  U9: { color: "#eb861a", weight: 4 },
};

const SubwayMap: React.FC = () => {
  const route_coords = useRouteCoordinates();
  const routes = useRoutesData();

  return (
    <MapContainer
      style={{ height: "800px", width: "100vw" }}
      center={[52.5262526, 13.3461733]}
      zoom={12}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routes.map((station) => (
        <Marker
          key={station.stop_id}
          position={[station.stop_lat, station.stop_lon]}
        >
          <Popup>
            {station.stop_name} ({station.route_short_name})
          </Popup>
        </Marker>
      ))}
      {Object.entries(route_coords).map(([route_name, coords], idx) => (
        <Polyline
          key={`${route_name}-${idx}`}
          positions={coords}
          pathOptions={colorOptions[route_name]}
        />
      ))}
    </MapContainer>
  );
};

export { SubwayMap };
