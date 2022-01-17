import { Request, Response } from 'express';

import MeasurementUnit from '../models/MeasurementUnit';

import { IMeasurementUnit } from '../models/interfaces';

// Retorna todas as unidades de medida cadastradas no banco de dados
export async function getMeasurementUnits (req: Request, res: Response) {
    MeasurementUnit.find({}, function(err: any, allUnits: [IMeasurementUnit]) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {
            // Formatação do objeto para envio da resposta em JSON
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
