import { Request, Response } from 'express';

import User from '../models/User';
import SensorDevice from '../models/SensorDevice';
import DataStream from '../models/DataStream';

import { IDataStream, ISensorDevice, IUser } from '../models/interfaces';

export async function getSensorsFromUser (req: Request, res: Response) {
    const { id } = req.params;

    await User.findById(id).populate({
        path: 'sensors',
        model: SensorDevice,
        populate: {
            path: 'streams',
            model: DataStream
        }
    }).exec(function (err: any, user: IUser) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!user) {
                return res.status(400).json(`Usuário de id ${id} não encontrado`);
            }

            let response = user.sensors.map((sensor: ISensorDevice) => {
                let streamsData = sensor.streams.map((stream: IDataStream) => {
                    return {
                        id: stream.streamId,
                        key: stream._id,
                        label: stream.label,
                        unitId: stream.unitId,
                        deviceId: stream.deviceId,
                        measurementCount: stream.measurementCount
                    }
                })

                return {
                    id: sensor.sensorId,
                    key: sensor._id,
                    label: sensor.label,
                    description: sensor.description,
                    streams: streamsData
                }
            })

            return res.status(200).json(response);
        }
    })
};
