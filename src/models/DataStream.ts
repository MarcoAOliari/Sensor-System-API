import mongoose, { Schema, model } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface DataStream {
    streamId: number;
    label: string;
    enabled: boolean;
    deviceId: Number;
    unitId: Number;
    measurementCount: Number;
    measurements: [mongoose.Schema.Types.ObjectId];
}

const DataStreamSchema = new Schema<DataStream> ({
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