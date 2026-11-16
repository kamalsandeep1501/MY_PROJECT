# AtmoGraph – Supply Chain Ripple Effect Predictor

AtmoGraph is an intelligent AI/ML platform designed to analyze, detect, and predict cascading supply chain disruptions and delay propagation across multi-tier supplier networks using Graph Neural Networks (GNN), Natural Language Processing (NLP), and Knowledge Graphs (Neo4j).

## Monorepo Architecture Overview

- **`backend/`**: FastAPI REST API, WebSocket server, Neo4j Graph queries, NLP disruption ingestion, and PyG (Graph Neural Network) predictive pipeline.
- **`frontend/`**: React (Vite) Single Page Application with interactive graph rendering (React Flow / D3.js), timeline risk sliders (30/60/90 days), and real-time risk analytics.
- **`data/`**: Mock network datasets, raw ingestion dumps, and preprocessed graph tensors.
- **`docs/`**: Architecture diagrams, database schemas, and API specifications.

