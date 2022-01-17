import mongoose, { Types } from 'mongoose';

export interface IUser {
    _id: Number;
    username: string;
    email: string;
    sensors: [mongoose.Schema.Types.ObjectId];
}

export interface IDataStream extends mongoose.Document {
    streamId: number;
    label: string;
    enabled: boolean;
    deviceId: Number;
    unitId: Number;
    measurementCount: number;
    measurements: Types.DocumentArray<ISensorData>;
}

export interface IMeasurementUnit extends mongoose.Document {
    id: number;
    symbol: string;
    description: string;
}

export interface ISensorData extends mongoose.Document {
    dataId: number;
    timestamp: Date;
    value: DoubleRange;
    unitId: Number;
}

export interface ISensorDevice extends mongoose.Document {
    sensorId: number;
    label: string;
    description: string;
    //streams: [mongoose.Schema.Types.ObjectId];
    streams: Types.DocumentArray<IDataStream>;
}

