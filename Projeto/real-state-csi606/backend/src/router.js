const express = require("express");
const router = express.Router();

const usuariosRouter = require('./routes/usuarios.js');
const contratosRouter = require('./routes/contrato.js');
const imoveisRouter = require('./routes/imovel.js');

// Definindo as rotas para os diferentes recursos e definindo prefixos para cada roteador
router.use('/usuarios', usuariosRouter);
router.use('/contratos', contratosRouter);
router.use('/imoveis', imoveisRouter);

module.exports = router;

