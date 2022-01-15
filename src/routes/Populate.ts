import { Router, Request, Response } from 'express';
import User from '../models/User';
import SensorDevice from '../models/SensorDevice';
import DataStream from '../models/DataStream';
import SensorData from '../models/SensorData';

const router = Router();

let Sensors = [
    {id: 1, sensor: {label: 'sensor 001', description: 'Quarto do Marco'}},
    {id: 2, sensor: {label: 'sensor 002', description: 'Cozinha do Joao'}},
    {id: 1, sensor: {label: 'sensor 003', description: 'Sala do Joao'}},
    {id: 3, sensor: {label: 'sensor 004', description: 'Galpão do Marco'}},
    {id: 2, sensor: {label: 'sensor 005', description: 'Hall do Luiz'}}
]

let Streams = [
    {id: 2, stream: {label: 'temperature', deviceId: 2, unitId: 1, measurementCount: 0}},
    {id: 1, stream: {label: 'temperature', deviceId: 1, unitId: 1, measurementCount: 0}},
    {id: 1, stream: {label: 'pression', deviceId: 1, unitId: 3, measurementCount: 0}},
    {id: 2, stream: {label: 'luminosity', deviceId: 2, unitId: 4, measurementCount: 0}},
    {id: 3, stream: {label: 'luminosity', deviceId: 3, unitId: 4, measurementCount: 0}},
    {id: 1, stream: {label: 'capacity', deviceId: 1, unitId: 5, measurementCount: 0}},
    {id: 5, stream: {label: 'pression', deviceId: 5, unitId: 3, measurementCount: 0}},
    {id: 1, stream: {label: 'luminosity', deviceId: 1, unitId: 4, measurementCount: 0}},
    {id: 4, stream: {label: 'capacity', deviceId: 4, unitId: 5, measurementCount: 0}},
    {id: 1, stream: {label: 'capacity', deviceId: 1, unitId: 5, measurementCount: 0}},
]

let Data = [
    {id: 8, data: {timestamp: 1507263664, value: 5.49}},
    {id: 5, data: {timestamp: 1506774525, value: 13.60}},
    {id: 4, data: {timestamp: 1506936820, value: 37.12}},
    {id: 2, data: {timestamp: 1507056660, value: 19.34}},
    {id: 6, data: {timestamp: 1507220246, value: 0.30}},
    {id: 5, data: {timestamp: 1507248938, value: 15.78}},
    {id: 1, data: {timestamp: 1507340452, value: 38.04}},
    {id: 5, data: {timestamp: 1506529982, value: 7.40}},
    {id: 8, data: {timestamp: 1506929360, value: 27.99}},
    {id: 5, data: {timestamp: 1507192807, value: 5.98}},
    {id: 2, data: {timestamp: 1507450323, value: 36.02}},
    {id: 1, data: {timestamp: 1507174150, value: 20.09}},
    {id: 7, data: {timestamp: 1506869237, value: 45.12}},
    {id: 3, data: {timestamp: 1506945464, value: 5.94}},
    {id: 4, data: {timestamp: 1507320970, value: 28.75}},
    {id: 2, data: {timestamp: 1507012605, value: 18.27}},
    {id: 3, data: {timestamp: 1507264674, value: 40.13}},
    {id: 1, data: {timestamp: 1507437433, value: 13.17}},
    {id: 2, data: {timestamp: 1507214079, value: 47.72}},
    {id: 4, data: {timestamp: 1507245150, value: 27.34}},
    {id: 9, data: {timestamp: 1507168658, value: 32.14}},
    {id: 3, data: {timestamp: 1506592319, value: 32.29}},
    {id: 2, data: {timestamp: 1506543080, value: 7.13}},
    {id: 5, data: {timestamp: 1506769900, value: 15.12}},
    {id: 9, data: {timestamp: 1507164945, value: 5.80}},
    {id: 6, data: {timestamp: 1507290480, value: 6.45}},
    {id: 6, data: {timestamp: 1506548430, value: 49.05}},
    {id: 6, data: {timestamp: 1507495298, value: 12.28}},
    {id: 2, data: {timestamp: 1507415372, value: 37.11}},
    {id: 9, data: {timestamp: 1507349581, value: 15.15}},
    {id: 2, data: {timestamp: 1507024252, value: 2.59}},
    {id: 6, data: {timestamp: 1507322712, value: 41.76}},
    {id: 7, data: {timestamp: 1506605354, value: 30.69}},
    {id: 3, data: {timestamp: 1507148176, value: 17.67}},
    {id: 3, data: {timestamp: 1507148758, value: 11.81}},
    {id: 7, data: {timestamp: 1507042553, value: 0.73}},
    {id: 9, data: {timestamp: 1507048669, value: 20.76}},
    {id: 1, data: {timestamp: 1507178651, value: 18.71}},
    {id: 5, data: {timestamp: 1506960595, value: 44.13}},
    {id: 3, data: {timestamp: 1507332353, value: 26.17}},
    {id: 1, data: {timestamp: 1506993947, value: 5.81}},
    {id: 7, data: {timestamp: 1507506442, value: 6.10}},
    {id: 7, data: {timestamp: 1507333435, value: 17.21}},
    {id: 2, data: {timestamp: 1507058418, value: 16.56}},
    {id: 8, data: {timestamp: 1507119641, value: 11.58}},
    {id: 6, data: {timestamp: 1507392290, value: 41.93}},
    {id: 5, data: {timestamp: 1506709439, value: 34.56}},
    {id: 1, data: {timestamp: 1506945081, value: 21.70}},
    {id: 1, data: {timestamp: 1507384383, value: 24.01}},
    {id: 5, data: {timestamp: 1507433848, value: 13.49}},
    {id: 5, data: {timestamp: 1507513946, value: 29.88}},
    {id: 6, data: {timestamp: 1507087396, value: 47.02}},
    {id: 5, data: {timestamp: 1507359071, value: 32.77}},
    {id: 2, data: {timestamp: 1507308785, value: 27.99}},
    {id: 6, data: {timestamp: 1506676521, value: 35.37}},
    {id: 7, data: {timestamp: 1507144012, value: 29.18}},
    {id: 6, data: {timestamp: 1506827101, value: 5.35}},
    {id: 1, data: {timestamp: 1506712614, value: 28.70}},
    {id: 7, data: {timestamp: 1506976242, value: 18.94}},
    {id: 9, data: {timestamp: 1507353725, value: 35.41}},
    {id: 5, data: {timestamp: 1507329669, value: 0.47}},
    {id: 8, data: {timestamp: 1507056575, value: 36.70}},
    {id: 4, data: {timestamp: 1507047646, value: 11.75}},
    {id: 8, data: {timestamp: 1507159004, value: 23.25}},
    {id: 7, data: {timestamp: 1507448307, value: 3.65}},
    {id: 9, data: {timestamp: 1507019753, value: 33.83}},
    {id: 2, data: {timestamp: 1507222277, value: 8.39}},
    {id: 4, data: {timestamp: 1507380161, value: 15.74}},
    {id: 4, data: {timestamp: 1507119770, value: 37.52}},
    {id: 3, data: {timestamp: 1506810700, value: 25.51}},
    {id: 3, data: {timestamp: 1507060792, value: 4.15}},
    {id: 3, data: {timestamp: 1507121390, value: 30.32}},
    {id: 9, data: {timestamp: 1506978054, value: 18.41}},
    {id: 4, data: {timestamp: 1507437039, value: 33.58}},
    {id: 3, data: {timestamp: 1507016502, value: 45.90}},
    {id: 7, data: {timestamp: 1506602241, value: 12.37}},
    {id: 5, data: {timestamp: 1506726408, value: 9.28}},
    {id: 1, data: {timestamp: 1507493820, value: 25.69}},
    {id: 9, data: {timestamp: 1507335290, value: 28.31}},
    {id: 1, data: {timestamp: 1506893883, value: 38.64}},
    {id: 4, data: {timestamp: 1506583434, value: 33.18}},
    {id: 1, data: {timestamp: 1506689106, value: 14.50}},
    {id: 4, data: {timestamp: 1507040465, value: 29.97}},
    {id: 2, data: {timestamp: 1506809372, value: 30.17}},
    {id: 3, data: {timestamp: 1507033131, value: 45.70}},
    {id: 4, data: {timestamp: 1507316226, value: 35.79}},
    {id: 5, data: {timestamp: 1507459715, value: 6.04}},
    {id: 1, data: {timestamp: 1507143046, value: 34.11}},
    {id: 7, data: {timestamp: 1507336820, value: 42.90}},
    {id: 4, data: {timestamp: 1507326960, value: 21.54}},
    {id: 1, data: {timestamp: 1506827882, value: 40.88}},
    {id: 5, data: {timestamp: 1507396949, value: 43.14}},
    {id: 4, data: {timestamp: 1506992408, value: 33.28}},
    {id: 9, data: {timestamp: 1506669358, value: 31.92}},
    {id: 7, data: {timestamp: 1506968079, value: 27.06}},
    {id: 3, data: {timestamp: 1507188868, value: 46.93}},
    {id: 5, data: {timestamp: 1507499409, value: 27.59}},
    {id: 7, data: {timestamp: 1507101695, value: 2.03}},
    {id: 5, data: {timestamp: 1507502403, value: 32.22}},
    {id: 5, data: {timestamp: 1506628728, value: 40.91}}
]

router.get('/configuresensors', (req: Request, res: Response) => {
    Sensors.forEach(async function(seed) {
        await User.findById(seed.id, function (err: any, user: any) {
            if (err) {
                console.log(err);
            } else {
                SensorDevice.create(seed.sensor, function (err, sensor) {
                    if (err) {
                        console.log(err);
                    } else {
                        sensor.save();
                        user.sensors.push(sensor);
                        user.save();
                    }
                })
            }
        })
    })
});

router.get('/configurestreams', (req: Request, res: Response) => {
    Streams.forEach(async function (seed) {
        await SensorDevice.findOne({sensorId: seed.id}, function (err: any, sensor: any) {
            if (err) {
                console.log(err);
            } else {
                DataStream.create(seed.stream, function (err, stream) {
                    if (err) {
                        console.log(err);
                    } else {
                        stream.save();
                        sensor.streams.push(stream);
                        sensor.save();
                    }
                })
            }
        })
    })
});

router.get('/configuredata', (req: Request, res: Response) => {
    Data.forEach(async function (seed) {
        await DataStream.findOne({streamId: seed.id}, function (err: any, stream: any) {
            if (err) {
                console.log(err);
            } else {
                let createdData = {
                    timestamp: seed.data.timestamp,
                    value: seed.data.value,
                    unitId: stream.unitId
                };
                
                SensorData.create(createdData, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        data.save();
                        stream.measurements.push(data);
                        stream.measurementCount = stream.measurementCount + 1;
                        stream.save();
                    }
                })
            }
        })
    })
})

export default router;