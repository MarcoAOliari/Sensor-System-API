import mongoose, { Schema, model } from 'mongoose';

import { IMeasurementUnit } from './interfaces';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const MeasurementUnitSchema = new Schema<IMeasurementUnit> ({
    symbol: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

MeasurementUnitSchema.plugin(AutoIncrement, { inc_field: 'id' });

export default model("MeasurementUnit", MeasurementUnitSchema);