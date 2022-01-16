import { Request, Response } from 'express';
import SensorData from '../models/SensorData';
import DataStream from '../models/DataStream';

export async function storeSensorData (req: Request, res: Response) {
    let streamId = req.params.id;

    DataStream.findOne({ streamId: streamId }, function (err: any, stream: any) {
        if (err) {
            console.log(err);
        } else {
            let newData = {
                timestamp: req.body.timestamp,
                value: req.body.value,
                unitId: stream.unitId
            }

            SensorData.create(newData, function (err: any, data: any) {
                if (err) {
                    console.log(err);
                } else {
                    data.save();
                    stream.measurements.push(data);
                    stream.measurementCount = stream.measurementCount + 1;
                    stream.save();

                    let response = {
                        id: data.dataId,
                        timestamp: Date.parse(data.timestamp),
                        value: data.value,
                        unitId: data.unitId
                    }

                    return res.status(200).json(response);
                }
            })
        }
    })
};
