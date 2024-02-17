const express = require('express');
const contratosController = require('../controllers/contratoController.js');

const router = express.Router();

// Rota para buscar todos os contratos
router.get('/contratos', contratosController.getAllContratos);

// Rota para buscar um contrato por ID
router.get('/contratos/:id', contratosController.getContratoById);

// Rota para criar um novo contrato
router.post('/contratos', contratosController.createContrato);

// Rota para atualizar um contrato existente
router.put('/contratos/:id', contratosController.updateContrato);

// Rota para excluir um contrato existente
router.delete('/contratos/:id', contratosController.deleteContrato);

// Rota para buscar os contratos de aluguel próximos ao vencimento
router.get('/contratosvenc', contratosController.getContratosAluguelProximosVencimento);


module.exports = router;