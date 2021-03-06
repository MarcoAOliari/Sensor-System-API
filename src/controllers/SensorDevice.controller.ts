import { Request, Response } from 'express';

import User from '../models/User';
import SensorDevice from '../models/SensorDevice';
import DataStream from '../models/DataStream';
import SensorData from '../models/SensorData';

import { IDataStream, ISensorData, ISensorDevice, IUser } from '../models/interfaces';

// Retorna um Sensor com suas Streams e as 5 últimas medições de cada
export async function getSensorDevice (req: Request, res: Response) {
    const { id } = req.params;

    // Popula as Streams do Sensor e as 5 últimas medições registradas de cada
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
    }).exec(function (err: any, sensor: ISensorDevice) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!sensor) {
                return res.status(204).json();
            }

            // Formatação do objeto para envio da resposta em JSON
            let streams = sensor.streams.map((stream: IDataStream) => {
                let values = stream.measurements.map((data: ISensorData) => {
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

// Cadastra um Sensor em um Usuário 
export async function storeSensorDevice(req: Request, res: Response) {
    let userId = req.params.id;

    let { label, description } = req.body;

    // Verifica se o request é válido
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

    User.findById(userId, function (err: any, user: IUser) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!user) {
                return res.status(400).json(`Usuário de id ${userId} não encontrado`);
            }

            SensorDevice.create(newSensor, function (err: any, sensor: ISensorDevice) {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Falha interna do servidor");
                } else {
                    sensor.save();
                    user.sensors.push(sensor);
                    user.save();

                    // Formatação do objeto para envio da resposta em JSON
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
