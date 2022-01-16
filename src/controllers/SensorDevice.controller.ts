import { Request, Response } from 'express';
import User from '../models/User';
import SensorDevice from '../models/SensorDevice';
import DataStream from '../models/DataStream';
import SensorData from '../models/SensorData';

export async function getSensorDevice (req: Request, res: Response) {
    const { id } = req.params;

    await SensorDevice.findOne({sensorId: id}).populate({
        path: 'streams',
        model: DataStream,
        populate: {
            path: 'measurements',
            model: SensorData,
            options: {
                limit: 5,
                sort: { dataId: -1 }
            }
        }
    }).exec(function (err: any, sensor: any) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!sensor) {
                return res.status(204).json();
            }

            let streams = sensor.streams.map((stream: any) => {
                let values = stream.measurements.map((data: any) => {
                    return {
                        timestamp: data.timestamp.getTime(),
                        value: data.value
                    };
                })

                return {
                    id: stream.streamId,
                    key: stream._id,
                    label: stream.label,
                    unitId: stream.unitId,
                    deviceId: stream.deviceId,
                    measurementCount: stream.measurementCount,
                    measurements: values
                }
            });

            let response = {
                id: sensor.sensorId,
                key: sensor._id,
                label: sensor.label,
                description: sensor.description,
                streams: streams
            }

            return res.status(200).json(response);
        }
    });
};

export async function storeSensorDevice(req: Request, res: Response) {
    let userId = req.params.id;

    let { label, description } = req.body;

    if (!label) {
        return res.status(400).json("Envie um label no próximo request");
    }

    if (!description) {
        return res.status(400).json("Envie uma description no próximo request");
    }

    let newSensor = {
        label: label,
        description: description
    }

    User.findById(userId, function (err: any, user: any) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!user) {
                return res.status(400).json(`Usuário de id ${userId} não encontrado`);
            }

            SensorDevice.create(newSensor, function (err, sensor) {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Falha interna do servidor");
                } else {
                    sensor.save();
                    user.sensors.push(sensor);
                    user.save();

                    let response = {
                        id: sensor.sensorId,
                        key: sensor._id,
                        label: sensor.label,
                        description: sensor.description
                    }

                    return res.status(200).json(response);
                }
            });
        }
    });
}
