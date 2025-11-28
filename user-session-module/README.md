# 🌐 multi-api-gateway

A **Node.js + TypeScript** service that aggregates external APIs (Weather, News) into a single gateway.  
Responses are cached in **Redis** to improve speed and reduce API call limits.

## 🚀 Features
- Fetches and merges data from:
  - [OpenWeatherMap API](https://openweathermap.org/api)
  - [NewsAPI](https://newsapi.org/)
- Unified API gateway (`/api/...`) for clients
- Built-in caching with **Redis**
- Lightweight **Express.js** server

## 🏗 Architecture
![Architecture Diagram](./docs/LogicalView_L2.png)

## 💡 Usage
The service automatically merges and normalizes data from multiple APIs.

Cached responses are stored for a configurable time (default: 10 minutes) to minimize external API requests.

Easy to extend: add new API integrations in the services/ directory and update the gateway routes.

## 📦 Tech Stack
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [Redis](https://redis.io/)
- [Nodemon](https://nodemon.io/) for development
