import mongoose from 'mongoose';

export async function connect () {
    try {
        await mongoose.connect('mongodb://localhost/senseup', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('>>> Banco de dados conectado');

    } catch {
        console.log('Erro de conexão com banco de dados')
    }
}