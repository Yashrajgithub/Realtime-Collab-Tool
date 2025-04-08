import express from 'express';
import { Server } from 'socket.io';
import { socketCtrl } from './controllers/socket.controller.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import userRouter from './routes/user.routes.js';
import documentRouter from './routes/document.routes.js';
import dbConnect from './utils/dbConnect.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/documents', documentRouter);

// Catch-all route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const server = app.listen(PORT, '0.0.0.0', async () => {
  await dbConnect();
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});

// Setup socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
});

socketCtrl(io);
