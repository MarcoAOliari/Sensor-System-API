import { Router, Request, Response } from 'express';
import { getMeasurementUnits } from '../controllers/MeasurementUnit.controller';

const router = Router();

router.get('/measurementunit', getMeasurementUnits);

export default router;