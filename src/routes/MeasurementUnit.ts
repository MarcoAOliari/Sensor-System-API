import { Router } from 'express';
import { getMeasurementUnits } from '../controllers/MeasurementUnit.controller';

const router = Router();

router.get('/measurementunits', getMeasurementUnits);

export default router;