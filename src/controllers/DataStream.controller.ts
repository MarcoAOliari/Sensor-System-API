import { Request, Response } from 'express';
import DataStream from '../models/DataStream';
import SensorData from '../models/SensorData';
import SensorDevice from '../models/SensorDevice';

export async function getDataStream (req: Request, res: Response) {
    const { id } = req.params;

    await DataStream.findOne({streamId: id}).populate({
        path: 'measurements',
        model: SensorData,
        options: {
            sort: { dataId: -1 }
        }
    }).exec(function (err: any, doc: any) {
        if (err) {
            console.log(err);
        } else {
            let values = doc.measurements.map((data: any) => {
                return {
                    timestamp: Date.parse(data.timestamp),
                    value: data.value
                }
            });

            let stream = {
                id: doc.streamId,
                key: doc._id,
                label: doc.label,
                unitId: doc.unitId,
                deviceId: doc.deviceId,
                measurementCount: doc.measurements.length,
                measurements: values
            }

            return res.status(200).json(stream)
        }
    })
};

export async function storeDataStream (req: Request, res: Response) {
    let sensorId = req.params.id;

    let newStream = {
        label: req.body.label,
        deviceId: sensorId,
        unitId: req.body.unitId
    }

    SensorDevice.findOne({ sensorId: sensorId }, function (err: any, sensor: any) {
        if (err) {
            console.log(err);
        } else {
            DataStream.create(newStream, function (err, stream) {
                if (err) {
                    console.log(err);
                } else {
                    stream.save();
                    sensor.streams.push(stream);
                    sensor.save();

                    let response = {
                        id: stream.streamId,
                        key: stream._id,
                        label: stream.label,
                        unitId: stream.unitId,
                        deviceId: stream.deviceId,
                        measurementCount: stream.measurementCount
                    }

                    return res.status(200).json(response);
                }
            })
        }
    })
}
