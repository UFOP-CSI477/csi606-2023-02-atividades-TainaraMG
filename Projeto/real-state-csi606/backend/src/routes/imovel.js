const express = require('express');
const imoveisController = require('../controllers/imovelController.js');

const router = express.Router();

router.get('/imoveis', imoveisController.getAllImoveis);
router.get('/imoveis/:id', imoveisController.getImovelById);
router.post('/imoveis', imoveisController.createImovel);
router.put('/imoveis/:id', imoveisController.updateImovel);
router.delete('/imoveis/:id', imoveisController.deleteImovel);

// Rota para retornar a quantidade de imóveis alugados (status 1)
router.get('/imoveis-alugados', imoveisController.getImoveisAlugados);

// Rota para retornar a quantidade de imóveis vendidos (status 2)
router.get('/imoveis-vendidos', imoveisController.getImoveisVendidos);

// Rota para retornar a quantidade de imóveis disponíveis (status 3)
router.get('/imoveis-disponiveis', imoveisController.getImoveisDisponiveis);

// Rota para retornar a quantidade total de imóveis no catálogo da imobiliária
router.get('/imoveis-total', imoveisController.countTotalImoveis);

module.exports = router;