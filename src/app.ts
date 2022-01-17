import express from 'express';
import morgan from 'morgan';
import seedDB from './seeds';
import testData from './test';

import MeasurementUnitRoutes from './routes/MeasurementUnit';
import UserRoutes from './routes/User';
import SensorDeviceRoutes from './routes/SensorDevice';
import DataStreamRoutes from './routes/DataStream';
import SensorDataRoutes from './routes/SensorData';
import PopulateRoutes from './routes/Populate';

class Application {

    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 3000);
        //seedDB();
        //testData();
    }

    middlewares() {
        // this.app.use(morgan('dev'));
        // Configurações dos middlewares
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
    }

    routes() {
        // Rotas utilizadas pela API
        this.app.use(MeasurementUnitRoutes);
        this.app.use(UserRoutes);
        this.app.use(SensorDeviceRoutes);
        this.app.use(DataStreamRoutes);
        this.app.use(SensorDataRoutes);
        //this.app.use(PopulateRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor online na porta', this.app.get('port'));
        });
    }

}

export default Application;