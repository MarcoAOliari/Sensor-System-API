import { Router } from 'express';
import { getSensorsFromUser } from '../controllers/User.controller';

const router = Router();

router.get('/user/:id/sensordevice', getSensorsFromUser);

export default router;