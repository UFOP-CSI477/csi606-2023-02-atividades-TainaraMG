const Contrato = require('../models/contrato');
const database = require('../database/client');
const { Op } = require('sequelize');

async () => {await database.sync()};
async function getAllContratos(req, res) {
  try {
    const contratos = await Contrato.findAll();
    res.json(contratos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
}

async function getContratoById(req, res) {
  const { id } = req.params;
  try {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }
    res.json(contrato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar contrato por ID.' });
  }
}

async function createContrato(req, res) {
  const { imovel_id, status, data_assinatura, validade, dia_vencimento_parcelas } = req.body;
  try {
    const novoContrato = await Contrato.create({ imovel_id, status, data_assinatura, validade, dia_vencimento_parcelas });
    res.status(201).json(novoContrato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar contrato.' });
  }
}

async function updateContrato(req, res) {
  const { id } = req.params;
  const { imovel_id, status, data_assinatura, validade, dia_vencimento_parcelas } = req.body;
  try {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }
    await contrato.update({ imovel_id, status, data_assinatura, validade, dia_vencimento_parcelas });
    res.json(contrato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar contrato.' });
  }
}

async function deleteContrato(req, res) {
  const { id } = req.params;
  try {
    const contrato = await Contrato.findByPk(id);
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }
    await contrato.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir contrato.' });
  }
}

async function getContratosAluguelProximosVencimento(req, res) {
  try {
    const doisDiasAntes = new Date();
    doisDiasAntes.setDate(doisDiasAntes.getDate() - 2); // 2 dias antes da data atual
    const contratos = await Contrato.findAll({
      where: {
        status: 1, // Contratos de aluguel
        dia_vencimento_parcelas: doisDiasAntes.getDate(), // Dia de vencimento das parcelas

      }
    });
    res.json(contratos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar contratos de aluguel próximos ao vencimento.' });
  }
}



module.exports = {
  getAllContratos,
  getContratoById,
  createContrato,
  updateContrato,
  deleteContrato,
  getContratosAluguelProximosVencimento
};