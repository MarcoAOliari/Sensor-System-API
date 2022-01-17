import mongoose, { Schema, model, SchemaTypes } from 'mongoose';

import { ISensorData } from './interfaces';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const SensorDataSchema = new Schema<ISensorData> ({
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