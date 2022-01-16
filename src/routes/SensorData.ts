import { Router } from 'express';
import { storeSensorData } from '../controllers/SensorData.controller';

const router = Router();

router.post('/datastream/:id/sensordata', storeSensorData);

export default router;