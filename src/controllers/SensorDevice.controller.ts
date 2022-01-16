import { Request, Response } from 'express';
import User from '../models/User';
import SensorDevice from '../models/SensorDevice';
import DataStream from '../models/DataStream';
import SensorData from '../models/SensorData';

// timestamp perdendo precisão!!!
export async function getSensorDevice (req: Request, res: Response) {
    const { id } = req.params;

    await SensorDevice.findOne({sensorId: id}).populate({
        path: 'streams',
        model: DataStream,
        populate: {
            path: 'measurements',
            model: SensorData,
            options: {
                sort: { dataId: -1 }
            }
        }
    }).exec(function (err: any, doc: any) {
        if (err) {
            console.log(err);
        } else {
            let response = doc.streams.map((stream: any) => {
                let values = stream.measurements.slice(0, 5).map((data: any) => {
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
                    measurementCount: stream.measurements.length,
                    measurements: values.slice(0, 5)
                }
            });

            let sensor = {
                id: doc.sensorId,
                key: doc._id,
                label: doc.label,
                description: doc.description,
                streams: response
            }

            return res.status(200).json(sensor);
        }
    });
};

export async function storeSensorDevice(req: Request, res: Response) {
    let newSensor = {
        label: req.body.label,
        description: req.body.description
    }

    let userId = req.params.id;

    User.findById(userId, function (err: any, user: any) {
        if (err) {
            console.log(err);
        } else {
            SensorDevice.create(newSensor, function (err, sensor) {
                if (err) {
                    console.log(err);
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
