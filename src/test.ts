import mongoose from 'mongoose';
import User from './models/User';
import SensorDevice from './models/SensorDevice';

let Users = [
    {username: 'marco', email: 'marcoaoliari@gmail.com'},
    {username: 'lucas', email: 'lucas@gmail.com'},
    {username: 'eduardo', email: 'eduardo@outlook.com'}
]

let Sensors = [
    {id: 1, sensor: {label: 'sensor 001', description: 'Quarto do Marco'}},
    {id: 2, sensor: {label: 'sensor 002', description: 'Cozinha do Joao'}},
    {id: 1, sensor: {label: 'sensor 003', description: 'Sala do Joao'}},
    {id: 3, sensor: {label: 'sensor 004', description: 'Galpão do Marco'}},
    {id: 2, sensor: {label: 'sensor 005', description: 'Hall do Luiz'}}
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