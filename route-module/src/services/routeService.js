import driver from "../config/neo4j.js";

const MINUTES_PER_SEGMENT = 2;
const DISTANCE_PER_SEGMENT = 300; // metros



// 1️⃣ ROTA SIMPLES (HORAS + DURAÇÃO + DISTÂNCIA)
export async function getRoute(from, to) {
  const session = driver.session();

  const query = `
    MATCH (src:Stop {stopID:$from}), (dst:Stop {stopID:$to})
    MATCH p = shortestPath((src)-[:NEXT_STOP*]->(dst))
    RETURN p
  `;

  try {
    const result = await session.run(query, { from, to });
    if (!result.records.length) return null;

    const path = result.records[0].get("p");

    const segments = path.segments.length;
    const stops = [
      path.start.properties.stopID,
      ...path.segments.map(seg => seg.end.properties.stopID)
    ];

    // duração e horários
    const totalDuration = segments * MINUTES_PER_SEGMENT;
    const departure = new Date();
    const arrival = new Date(departure.getTime() + totalDuration * 60000);

    const formatTime = d =>
      d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

    // distância
    const totalDistance = segments * DISTANCE_PER_SEGMENT;

    return {
      from,
      to,
      stops,
      totalStops: stops.length,
      totalDuration,
      totalDistance,
      times: {
        departure: formatTime(departure),
        arrival: formatTime(arrival)
      }
    };

  } finally {
    await session.close();
  }
}





// 2️⃣ ROTA DETALHADA (ZONA + COORDS + HORAS + DISTÂNCIA)
export async function getRouteDetails(from, to) {
  const session = driver.session();

  const query = `
    MATCH (src:Stop {stopID:$from}), (dst:Stop {stopID:$to})
    MATCH p = shortestPath((src)-[r:NEXT_STOP*]->(dst))

    WITH p, nodes(p) AS stops, r
    UNWIND r AS rel

    WITH p, stops, collect({
      from: startNode(rel).stopID,
      to: endNode(rel).stopID,
      line: rel.line,
      direction: rel.direction,
      itinerary: rel.itinerary
    }) AS segments

    UNWIND stops AS s
    WITH p, segments, collect({
      stopID: s.stopID,
      zone: s.zone,
      latitude: s.latitude,
      longitude: s.longitude
    }) AS stopInfo

    RETURN p, segments, stopInfo
  `;

  try {
    const result = await session.run(query, { from, to });
    if (!result.records.length) return null;

    const record = result.records[0];
    const p = record.get("p");
    const segments = record.get("segments");
    const stopInfo = record.get("stopInfo");

    const stops = [
      p.start.properties.stopID,
      ...p.segments.map(seg => seg.end.properties.stopID)
    ];

    // TEMPOS PARA CADA STOP
    const departure = new Date();
    let currentTime = new Date(departure);

    const formatTime = d =>
      d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

    const perStop = [];
    for (let i = 0; i < stops.length; i++) {
      perStop.push({
        stopID: stops[i],
        time: formatTime(currentTime)
      });

      if (i < stops.length - 1) {
        currentTime = new Date(currentTime.getTime() + MINUTES_PER_SEGMENT * 60000);
      }
    }

    const arrival = currentTime;

    // distância total
    const totalDistance = segments.length * DISTANCE_PER_SEGMENT;

    return {
      from,
      to,
      stops,
      totalStops: stops.length,
      segments,
      stopInfo,
      totalDistance,
      times: {
        departure: formatTime(departure),
        arrival: formatTime(arrival),
        perStop
      }
    };

  } finally {
    await session.close();
  }
}





// 3️⃣ ROTA COM TRANSFERÊNCIAS (HORAS + DISTÂNCIA + DURAÇÃO)
export async function getRouteWithTransfer(from, to) {
  const session = driver.session();

  const query = `
    MATCH (src:Stop {stopID:$from}), (dst:Stop {stopID:$to})
    MATCH p = shortestPath((src)-[r:NEXT_STOP*]->(dst))
    UNWIND r AS rel
    WITH p, rel
    RETURN p, collect({
      from: startNode(rel).stopID,
      to: endNode(rel).stopID,
      line: rel.line,
      direction: rel.direction,
      itinerary: rel.itinerary
    }) AS segments
  `;

  try {
    const result = await session.run(query, { from, to });
    if (!result.records.length) return null;

    const record = result.records[0];
    const p = record.get("p");
    const segments = record.get("segments");

    // duração
    const totalDuration = segments.length * MINUTES_PER_SEGMENT;

    // HORÁRIOS
    const departure = new Date();
    const arrival = new Date(departure.getTime() + totalDuration * 60000);

    const formatTime = d =>
      d.toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit"
      });

    // DISTÂNCIA TOTAL
    const totalDistance = segments.length * DISTANCE_PER_SEGMENT;

    // AGRUPAR TRANSFERÊNCIAS
    const steps = [];
    let group = {
      line: segments[0].line,
      direction: segments[0].direction,
      itinerary: segments[0].itinerary,
      stops: [segments[0].from, segments[0].to]
    };

    for (let i = 1; i < segments.length; i++) {
      const seg = segments[i];

      const same =
        seg.line === group.line &&
        seg.direction === group.direction &&
        seg.itinerary === group.itinerary;

      if (same) {
        group.stops.push(seg.to);
      } else {
        steps.push(group);
        steps.push({ transfer_at: seg.from });

        group = {
          line: seg.line,
          direction: seg.direction,
          itinerary: seg.itinerary,
          stops: [seg.from, seg.to]
        };
      }
    }

    steps.push(group);

    return {
      from,
      to,
      steps,
      totalDuration,
      totalDistance,
      departure: formatTime(departure),
      arrival: formatTime(arrival)
    };

  } finally {
    await session.close();
  }
}
