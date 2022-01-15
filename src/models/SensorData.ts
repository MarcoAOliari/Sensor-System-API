import mongoose, { Schema, model, SchemaTypes } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface SensorData {
    dataId: number;
    timestamp: Date; // colocar em unix
    value: DoubleRange;
    unitId: Number;
}

const SensorDataSchema = new Schema<SensorData> ({
    timestamp: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    unitId: {
        type: Number,
        required: true
    }
});

SensorDataSchema.plugin(AutoIncrement, { inc_field: 'dataId' });

export default model("SensorData", SensorDataSchema);