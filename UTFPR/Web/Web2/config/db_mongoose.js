const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Web2_PF';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('🟢 MongoDB conectado!'))
.catch((err) => console.error('🔴 Erro ao conectar MongoDB:', err));

module.exports = mongoose;
