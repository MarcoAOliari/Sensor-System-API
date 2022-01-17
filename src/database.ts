import mongoose from 'mongoose';

// Conexão com o banco de dados
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