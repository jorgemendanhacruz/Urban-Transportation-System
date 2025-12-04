import express from "express";
import { 
  getRoute, 
  getRouteDetails, 
  getRouteWithTransfer 
} from "../services/routeService.js";

const router = express.Router();

// /route?from=S1&to=S7
router.get("/", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      error: "Parâmetros 'from' e 'to' são obrigatórios. Ex: /route?from=S1&to=S7"
    });
  }

  const result = await getRoute(from, to);
  res.json({ route: result });
});

// /route/details?from=S1&to=S7
router.get("/details", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      error: "Parâmetros 'from' e 'to' são obrigatórios. Ex: /route/details?from=S1&to=S7"
    });
  }

  const result = await getRouteDetails(from, to);
  res.json({ route: result });
});

// /route/with-transfer?from=S1&to=S7
router.get("/with-transfer", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      error: "Parâmetros 'from' e 'to' são obrigatórios. Ex: /route/with-transfer?from=S1&to=S7"
    });
  }

  const result = await getRouteWithTransfer(from, to);
  res.json({ route: result });
});

export default router;

