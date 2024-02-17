const express = require('express');
const db = require("./database/client.js");
const usuarioRouter = require('./routes/usuarios.js');
const contratoRouter = require('./routes/contrato.js');
const imovelRouter = require('./routes/imovel.js');
const cors = require('cors');
  
const PORT = 4444;
const server = express();
  
server.use(express.json());
server.use(cors());

server.use(usuarioRouter);
server.use(contratoRouter);
server.use(imovelRouter);
   
db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));
  
server.listen(PORT, () => {
    console.log(`[SERVER] is running on port ${PORT}`);
});
