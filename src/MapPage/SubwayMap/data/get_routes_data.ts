import { LatLngExpression } from "leaflet";

import { Station } from "../../../interfaces/station";
import routes_raw from "./routes.json";

const useRoutesData = () => {
  const routes = routes_raw as unknown as Station[];
  return routes;
};

const useRouteCoordinates = () => {
  const routes = useRoutesData();

  const route_coords: Record<string, LatLngExpression[][]> = {};

  routes.forEach((station) => {
    if (!route_coords[station.route_short_name]) {
      route_coords[station.route_short_name] = [];
    }
    route_coords[station.route_short_name].push([
      station.stop_lat as any as LatLngExpression,
      station.stop_lon as any as LatLngExpression,
    ]);
  });

  return route_coords;
};

export { useRoutesData, useRouteCoordinates };
