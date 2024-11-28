const express = require('express');
const cors = require('cors');

const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Configuração do CORS para permitir múltiplas origens
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Permite solicitações sem origem (como Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política de CORS não permite acesso desta origem.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Servir arquivos estáticos
app.use(express.static('public'));

// Rotas
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);

// Iniciar o servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});