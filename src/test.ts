import mongoose from 'mongoose';
import User from './models/User';
import SensorDevice from './models/SensorDevice';

let Users = [
    {username: 'marco', email: 'marcoaoliari@gmail.com'},
    {username: 'lucas', email: 'lucas@gmail.com'},
    {username: 'eduardo', email: 'eduardo@outlook.com'}
]

function loadUsers() {
    Users.forEach(async function(seed) {
        await User.create(seed, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                user.save();
            }
        });
    });
}

export default function testData() {
    loadUsers();
}