import mongoose, { Schema, model } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface MeasurementUnit {
    id: number;
    symbol: string;
    description: string;
}

const MeasurementUnitSchema = new Schema<MeasurementUnit> ({
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