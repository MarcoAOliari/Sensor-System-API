import mongoose, { Schema, model } from 'mongoose';

import { IDataStream } from './interfaces';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const DataStreamSchema = new Schema<IDataStream> ({
    label: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    deviceId: {
        type: Number,
        required: true
    },
    unitId: {
        type: Number,
        required: true
    },
    measurementCount: {
        type: Number,
        required: true,
        default: 0
    },
    measurements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SensorData'
    }]
});

DataStreamSchema.plugin(AutoIncrement, { inc_field: 'streamId' });

export default model("DataStream", DataStreamSchema);