import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Mock data for dashboard endpoints
const mockData = {
  metricas: [
    { id: 1, name: 'Métrica 1', value: 85, trend: 'up' },
    { id: 2, name: 'Métrica 2', value: 72, trend: 'down' },
    { id: 3, name: 'Métrica 3', value: 91, trend: 'up' },
    { id: 4, name: 'Métrica 4', value: 68, trend: 'down' }
  ],
  campana: [
    { id: 1, campaign: 'CAMPAÑA A', progress: 75, trend: 'up' },
    { id: 2, campaign: 'CAMPAÑA B', progress: 60, trend: 'down' },
    { id: 3, campaign: 'CAMPAÑA C', progress: 85, trend: 'up' },
    { id: 4, campaign: 'CAMPAÑA D', progress: 45, trend: 'down' },
    { id: 5, campaign: 'CAMPAÑA E', progress: 90, trend: 'up' }
  ],
  operacion: [
    { campaign: 'A', progress: 65, delay: 15 },
    { campaign: 'B', progress: 80, delay: 10 },
    { campaign: 'C', progress: 45, delay: 25 },
    { campaign: 'D', progress: 70, delay: 20 },
    { campaign: 'E', progress: 55, delay: 30 }
  ]
};

// Dashboard API endpoints
app.get('/api/dashboard/metricas', (req, res) => {
  res.json(mockData.metricas);
});

app.get('/api/dashboard/campana', (req, res) => {
  res.json(mockData.campana);
});

app.get('/api/dashboard/operacion', (req, res) => {
  res.json(mockData.operacion);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/dashboard/metricas');
  console.log('- GET /api/dashboard/campana');
  console.log('- GET /api/dashboard/operacion');
  console.log('- GET /api/health');
});