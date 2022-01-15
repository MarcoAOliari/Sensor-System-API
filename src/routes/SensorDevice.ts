import { Router, Request, Response } from 'express';
import { getSensorDevice, storeSensorDevice } from '../controllers/SensorDevice.controller';

const router = Router();

router.get('/sensordevice/:id', getSensorDevice);

router.post('/user/:id/sensordevice', storeSensorDevice);

export default router;