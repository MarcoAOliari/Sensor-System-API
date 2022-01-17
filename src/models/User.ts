import mongoose, { Schema, model } from 'mongoose';

import { IUser } from './interfaces';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema<IUser> ({
    _id: Number,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sensors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SensorDevice'
    }]
}, { _id: false });

UserSchema.plugin(AutoIncrement);

export default model("User", UserSchema);