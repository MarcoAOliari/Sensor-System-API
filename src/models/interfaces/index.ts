import mongoose, { Types } from 'mongoose';

// Todas as interfaces dos Models utilizados

export interface IUser extends mongoose.Document {
    _id: number;
    username: string;
    email: string;
    sensors: Types.DocumentArray<ISensorDevice>;
}

export interface IDataStream extends mongoose.Document {
    streamId: number;
    label: string;
    enabled: boolean;
    deviceId: number;
    unitId: number;
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
    unitId: number;
}

export interface ISensorDevice extends mongoose.Document {
    sensorId: number;
    label: string;
    description: string;
    //streams: [mongoose.Schema.Types.ObjectId];
    streams: Types.DocumentArray<IDataStream>;
}

