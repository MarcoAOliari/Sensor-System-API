import mongoose, { Schema, model } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

interface User {
    _id: number;
    username: string;
    email: string;
    sensors: [mongoose.Schema.Types.ObjectId];
}

const UserSchema = new Schema<User> ({
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