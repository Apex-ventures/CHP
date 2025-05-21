import express from 'express';
import dotenv from 'dotenv';
import patientRoutes from './routes/patientRoutes';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend is running!' });
});

app.use('/api/v1/patients', authenticateToken, patientRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});