import dotenv from "dotenv";
import neo4j from "neo4j-driver";

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

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

    return {
      from,
      to,
      stops: path.segments.length
        ? [
            path.start.properties.stopID,
            ...path.segments.map(seg => seg.end.properties.stopID)
          ]
        : [from],
      totalStops: path.segments.length + 1
    };

  } catch (err) {
    console.error("Erro no getRoute:", err);
    return null;
  } finally {
    await session.close();
  }
}
