import { Router } from 'express';
import { enrollPatient } from '../controllers/patientController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protect the enroll-patient endpoint with authentication middleware
router.post('/v1/enroll-patient', authenticateToken, enrollPatient);

export default router;