import { Request, Response } from 'express';
import MeasurementUnit from '../models/MeasurementUnit';

export async function getMeasurementUnits (req: Request, res: Response) {
    MeasurementUnit.find({}, function(err, allUnits) {
        if (err) {
            console.log(err);
            return res.status(400).json("Falha interna do servidor");
        } else {
            let data = allUnits.map(function (unit) {
                return {
                    id: unit.id,
                    symbol: unit.symbol,
                    description: unit.description
                }
            })
            return res.status(200).json(data);
        }
    })
};
