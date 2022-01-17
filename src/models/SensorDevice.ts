import mongoose, { Schema, model } from 'mongoose';

import { ISensorDevice } from './interfaces';

const AutoIncrement = require('mongoose-sequence')(mongoose);

// Model SensorDevice do diagrama de classes

const SensorDeviceSchema = new Schema<ISensorDevice> ({
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