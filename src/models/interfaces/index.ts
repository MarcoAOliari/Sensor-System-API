import mongoose from 'mongoose';

export interface User {
    _id: number;
    username: string;
    email: string;
    sensors: [mongoose.Schema.Types.ObjectId];
}

export interface DataStream {
    streamId: number;
    label: string;
    enabled: boolean;
    deviceId: Number;
    unitId: Number;
    measurementCount: Number;
    measurements: [mongoose.Schema.Types.ObjectId];
}

export interface MeasurementUnit {
    id: number;
    symbol: string;
    description: string;
}

export interface SensorData {
    dataId: number;
    timestamp: Date;
    value: DoubleRange;
    unitId: Number;
}

export interface SensorDevice {
    sensorId: number;
    label: string;
    description: string;
    streams: [mongoose.Schema.Types.ObjectId];
}

