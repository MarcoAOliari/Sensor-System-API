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
            limit: 5,
            sort: { dataId: -1 }
        }
    }).exec(function (err: any, stream: any) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!stream) {
                return res.status(204).json();
            }

            let values = stream.measurements.map((data: any) => {
                return {
                    timestamp: data.timestamp.getTime(),
                    value: data.value
                }
            });

            let response = {
                id: stream.streamId,
                key: stream._id,
                label: stream.label,
                unitId: stream.unitId,
                deviceId: stream.deviceId,
                measurementCount: stream.measurementCount,
                measurements: values
            }

            return res.status(200).json(response);
        }
    })
};

export async function storeDataStream (req: Request, res: Response) {
    let sensorId = req.params.id;
    let { label, unitId } = req.body;

    if (!label) {
        return res.status(400).json("Envie um label no próximo request");
    }

    if (!unitId) {
        return res.status(400).json("Envie um unitId no próximo request");
    }

    let newStream = {
        label: req.body.label,
        deviceId: sensorId,
        unitId: req.body.unitId
    }

    SensorDevice.findOne({ sensorId: sensorId }, function (err: any, sensor: any) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {
            if (!sensor) {
                return res.status(400).json(`Sensor de id ${sensorId} não encontrado`);
            }

            DataStream.create(newStream, function (err, stream) {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Falha interna do servidor");
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
