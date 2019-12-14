const basePath = "http://localhost:3000/api";

export interface RouteBody {
  destination: string;
  hafasProfile: string;
  maxChanges: string;
  start: string;
  /**
   * unit time stamp
   */
  time: number;
  transferTime: "0";
}

export interface Arrival {
  scheduledPlatform: string;
  platform: string;
  scheduledTime: number;
  time: number;
  delay: number;
  reihung: boolean;
  messages: [
    {
      type: string;
      code: string;
      icoX: number;
      txtN: string;
      txtS: string;
      prio: number;
      sIdx: number;
    }
  ];
  cancelled: true;
}

export interface Departure {
  scheduledPlatform: string;
  platform: string;
  scheduledTime: number;
  time: number;
  delay: number;
  reihung: boolean;
  messages: [
    {
      type: string;
      code: string;
      icoX: number;
      txtN: string;
      txtS: string;
      prio: number;
      sIdx: number;
    }
  ];
  cancelled: true;
}

export interface Segment {
  arrival: Arrival;
  departure: Departure;
  duration: number;
  segmentDestination: {
    title: string;
  };
}

export interface Route {
  arrival: Arrival;

  departure: Departure;

  segments: [Segment];
}

export interface Station {
  id: string;
  title: string;
}

export async function get(endpoint: string): Promise<any> {
  const response = await fetch(`${basePath}/${endpoint}`);
  return response.json();
}

export async function post(endpoint: string, body: RouteBody): Promise<any> {
  const response = await fetch(`${basePath}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return response.json();
}
