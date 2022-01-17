import mongoose from 'mongoose';
import MeasurementUnit from './models/MeasurementUnit';

let MeasurementUnits = [
    {
        symbol: "ºC",
        description: "Celsius"
    },
    {
        symbol: "mg/m³",
        description: "Megagram per cubic metre"
    },
    {
        symbol: "hPA",
        description: "hectopasca"
    },
    {
        symbol: "lux",
        description: "Lux"
    },
    {
        symbol: "%",
        description: "Percent"
    }
]

// Alimenta o banco de dados com as 5 principais unidades de medida
// apresentadas na especificação
export default function seedDB() {
    MeasurementUnit.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            MeasurementUnits.forEach(function(seed) {
                MeasurementUnit.create(seed, function (err, unit) {
                    if (err) {
                        console.log(err);
                    } else {
                        unit.save();
                    }
                });
            });
        }
    });
}