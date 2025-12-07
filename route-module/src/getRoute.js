import dotenv from "dotenv";
import neo4j from "neo4j-driver";

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO3J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

export async function getRoute(from, to) {
  const session = driver.session();

  // 🔥 QUERY ATUALIZADA: devolve coordenadas das paragens
  const query = `
    MATCH (src:Stop {stopID:$from}), (dst:Stop {stopID:$to})
    MATCH p = shortestPath((src)-[:NEXT_STOP*]->(dst))
    RETURN
      [s IN nodes(p) | {
        id: s.stopID,
        name: s.name,
        lat: s.latitude,
        lng: s.longitude
      }] AS stops,
      length(p) AS totalStops
  `;

  try {
    const result = await session.run(query, { from, to });

    if (!result.records.length) return null;

    const record = result.records[0];

    // 🔥 Já recebemos os stops completos do Neo4j
    const stops = record.get("stops");
    const totalStops = record.get("totalStops");

    return {
      from,
      to,
      stops,        // inclui id, name, latitude, longitude
      totalStops
    };

  } catch (err) {
    console.error("Erro no getRoute:", err);
    return null;
  } finally {
    await session.close();
  }
}
