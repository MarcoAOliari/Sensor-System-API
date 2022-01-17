import { Request, Response } from 'express';

import DataStream from '../models/DataStream';
import SensorData from '../models/SensorData';
import SensorDevice from '../models/SensorDevice';

import { IDataStream, ISensorData, ISensorDevice } from '../models/interfaces';

// Retorna uma Stream com todas as suas medidas
export async function getDataStream (req: Request, res: Response) {
    const { id } = req.params;

    // Popula as medidas de uma Stream, recebendo apenas as 5 últimas registradas
    await DataStream.findOne({streamId: id}).populate({
        path: 'measurements',
        model: SensorData,
        options: {
            sort: { dataId: -1 }
        }
    }).exec(function (err: any, stream: IDataStream) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!stream) {
                return res.status(204).json();
            }

            // Formatação do objeto para envio da resposta em JSON
            let values = stream.measurements.map((data: ISensorData) => {
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

// Cadastra uma Stream em um Sensor
export async function storeDataStream (req: Request, res: Response) {
    let sensorId = req.params.id;
    let { label, unitId } = req.body;

    // Verifica se o request é válido
    if (!label) {
        return res.status(400).json("Envie um label no próximo request");
    }

    if (!Number.isInteger(unitId)) {
        return res.status(400).json("Envie um unitId válido no próximo request");
    }

    let newStream = {
        label: req.body.label,
        deviceId: sensorId,
        unitId: req.body.unitId
    }

    SensorDevice.findOne({ sensorId: sensorId }, function (err: any, sensor: ISensorDevice) {
        if (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        } else {

            if (!sensor) {
                return res.status(400).json(`Sensor de id ${sensorId} não encontrado`);
            }

            DataStream.create(newStream, function (err: any, stream: IDataStream) {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Falha interna do servidor");
                } else {
                    stream.save();
                    sensor.streams.push(stream);
                    sensor.save();

                    // Formatação do objeto para envio da resposta em JSON
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
