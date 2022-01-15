import { Request, Response } from 'express';
import User from '../models/User';
import SensorDevice from '../models/SensorDevice';
import DataStream from '../models/DataStream';


export async function getSensorsFromUser (req: Request, res: Response) {
    const { id } = req.params;

    await User.findById(id).populate({
        path: 'sensors',
        model: SensorDevice,
        populate: {
            path: 'streams',
            model: DataStream
        }
    }).exec(function (err: any, doc: any) {
        if (err) {
            console.log(err);
        } else {
            let response = doc.sensors.map((sensor: any) => {
                let streamsData = sensor.streams.map((stream: any) => {
                    return {
                        id: stream.streamId,
                        key: stream._id,
                        label: stream.label,
                        unitId: stream.unitId,
                        deviceId: stream.deviceId,
                        measurementCount: stream.measurements.length
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
