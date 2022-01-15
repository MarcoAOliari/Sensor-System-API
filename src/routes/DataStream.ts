import { Router } from 'express';
import { getDataStream, storeDataStream } from '../controllers/DataStream.controller';
const router = Router();

router.get('/datastream/:id', getDataStream);

router.post('/sensordevice/:id/datastream', storeDataStream);

export default router;