import { Request, Response } from 'express';
import SensorData from '../models/SensorData';
import DataStream from '../models/DataStream';

export async function storeSensorData (req: Request, res: Response) {
    let streamId = req.params.id;

    let { timestamp, value } = req.body;

    if (!Number.isInteger(timestamp)) {
        return res.status(400).json("Envie um timestamp no próximo request");
    }

    if (isNaN(value) || value === '') {
        return res.status(400).json("Envie uma medição no próximo request");
    }

    DataStream.findOne({ streamId: streamId }, function (err: any, stream: any) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!stream) {
                return res.status(400).json(`Stream de id ${streamId} não encontrado`);
            }

            let newData = {
                timestamp: req.body.timestamp,
                value: req.body.value,
                unitId: stream.unitId
            }

            SensorData.create(newData, function (err: any, data: any) {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Falha interna do servidor");
                } else {
                    data.save();
                    stream.measurements.push(data);
                    stream.measurementCount = stream.measurementCount + 1;
                    stream.save();

                    let response = {
                        id: data.dataId,
                        timestamp: data.timestamp.getTime(),
                        value: data.value,
                        unitId: data.unitId
                    }

                    return res.status(200).json(response);
                }
            })
        }
    })
};
