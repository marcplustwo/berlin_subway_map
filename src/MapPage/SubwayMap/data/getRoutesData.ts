import { LatLngExpression } from "leaflet";

import { Station } from "../../../interfaces/station";
import stations_raw from "./stations.json";

const useStationsData = () => {
  const stations = stations_raw as unknown as Station[];
  return stations;
};

const useRouteCoordinates = () => {
  const stations = useStationsData();

  const route_coords: Record<string, LatLngExpression[][]> = {};

  stations.forEach((station) => {
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

const getStationById = (stopId: string): Station => {
  const stations = useStationsData();
  return stations.find((station) => station.stop_id === stopId) as Station;
};

const getRouteForStation = (stopId: string): string | undefined => {
  return getStationById(stopId)?.route_short_name;
};

const getAdjacentStations = (stopId: string) => {
  const stations = useStationsData();
  const index = stations.findIndex((station) => station.stop_id === stopId);
  const prev = stations[index - 1];
  const next = stations[index + 1];

  const current = stations[index];

  return [
    prev?.route_id === current.route_id ? prev : undefined,
    next?.route_id === current.route_id ? next : undefined,
  ];
};

export {
  useStationsData,
  useRouteCoordinates,
  getStationById,
  getAdjacentStations,
  getRouteForStation,
};
