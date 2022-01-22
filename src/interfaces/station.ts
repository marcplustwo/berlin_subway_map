interface Station {
  stop_id_generic: string;
  stop_id: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;
  route_id: string;
  route_short_name: string;
  stop_sequence: number;
}

export type { Station };
