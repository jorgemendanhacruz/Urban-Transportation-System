import express from "express";
import { 
  getRoute, 
  getRouteDetails, 
  getRouteWithTransfer,
  getCoordinatesForStops
} from "../services/routeService.js";

const router = express.Router();


// ---------------------------------------------------------
// ROTA SIMPLES
// ---------------------------------------------------------
router.get("/", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      error: "Parâmetros 'from' e 'to' são obrigatórios. Ex: /route?from=S1&to=S7"
    });
  }

  const route = await getRoute(from, to);
  const coords = await getCoordinatesForStops(route.stops);

  res.json({ 
    route,
    coordinates: coords
  });
});


// ---------------------------------------------------------
// ROTA DETALHADA
// ---------------------------------------------------------
router.get("/details", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      error: "Parâmetros 'from' e 'to' são obrigatórios. Ex: /route/details?from=S1&to=S7"
    });
  }

  const route = await getRouteDetails(from, to);
  const coords = await getCoordinatesForStops(route.stops);

  res.json({ 
    route,
    coordinates: coords
  });
});


// ---------------------------------------------------------
// ROTA COM TRANSFERÊNCIA
// ---------------------------------------------------------
router.get("/with-transfer", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      error: "Parâmetros 'from' e 'to' são obrigatórios. Ex: /route/with-transfer?from=S1&to=S7"
    });
  }

  const route = await getRouteWithTransfer(from, to);

  // juntar stops de todos os steps
  let stops = [];
  route.steps.forEach(step => {
    if (step.stops) {
      stops.push(...step.stops);
    }
  });

  stops = [...new Set(stops)]; // remover duplicados

  const coords = await getCoordinatesForStops(stops);

  res.json({
    route,
    coordinates: coords
  });
});


export default router;
