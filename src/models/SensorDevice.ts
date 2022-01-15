import mongoose, { Schema, model } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface SensorDevice {
    sensorId: number;
    label: string;
    description: string;
    streams: [mongoose.Schema.Types.ObjectId];
}

const SensorDeviceSchema = new Schema<SensorDevice> ({
    sensorId: Number,
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    streams: [{        
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DataStream'
    }]
});

SensorDeviceSchema.plugin(AutoIncrement, {inc_field: 'sensorId'});

export default model("SensorDevice", SensorDeviceSchema);