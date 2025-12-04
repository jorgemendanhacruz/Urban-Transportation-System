//import express from "express";
//import dotenv from "dotenv";
//import routeRouter from "./src/routes/routeRouter.js";

//import path from "path";
//import { fileURLToPath } from "url";

//dotenv.config();

//const app = express();
//app.use(express.json());

// =============================================
// 🔥 Configurar pasta PUBLIC para servir HTML/JS/CSS
// =============================================
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// Tudo o que estiver na pasta "public" é servido automaticamente
//app.use(express.static(path.join(__dirname, "public")));


// =============================================
// Teste da raiz
// =============================================
//app.get("/", (req, res) => {
  // Se quiseres enviar logo o index.html automaticamente:
  // res.sendFile(path.join(__dirname, "public", "index.html"));
  
  //res.send("Route Service is running!");
//});


// =============================================
// Rotas de consulta de rotas
// =============================================
//app.use("/route", routeRouter);


// =============================================
// INICIAR SERVIDOR
// =============================================
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //console.log(`Route Service running at http://localhost:${PORT}`);
//});
