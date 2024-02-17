const Imovel = require('../models/imovel');
const database = require('../database/client');

async () => {await database.sync()};
async function getAllImoveis(req, res) {
  try {
    const imoveis = await Imovel.findAll();
    res.json(imoveis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar imóveis.' });
  }
}

async function getImovelById(req, res) {
  const { id } = req.params;
  try {
    const imovel = await Imovel.findByPk(id);
    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado.' });
    }
    res.json(imovel);
  } catch (error) {
    console.error(error);
     res.status(500).json({ error: 'Erro ao buscar imóvel por ID.' });
  }
}

async function createImovel(req, res) {
  const { tipo, nome, localizacao, preco_venda, preco_aluguel, status, outros_detalhes } = req.body;
  try {
    const novoImovel = await Imovel.create({ tipo, nome, localizacao, preco_venda, preco_aluguel, status, outros_detalhes });
    res.status(201).json(novoImovel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar imóvel.' });
  }
}

async function updateImovel(req, res) {
  const { id } = req.params;
  const { tipo, nome, localizacao, preco_venda, preco_aluguel, status, outros_detalhes } = req.body;
  try {
    const imovel = await Imovel.findByPk(id);
    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado.' });
    }
    await imovel.update({ tipo, nome, localizacao, preco_venda, preco_aluguel, status, outros_detalhes });
    res.json(imovel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar imóvel.' });
  }
}

async function deleteImovel(req, res) {
  const { id } = req.params;
  try {
    const imovel = await Imovel.findByPk(id);
    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado.' });
    }
    await imovel.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir imóvel.' });
  }
}

async function getImoveisAlugados(req, res) {
  try {
    const count = await Imovel.count({ where: { status: 1 } });
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar imóveis alugados.' });
  }
}


async function getImoveisVendidos(req, res) {
  try {
    const count = await Imovel.count({ where: { status: 2 } });
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar imóveis vendidos.' });
  }
}

async function getImoveisDisponiveis(req, res) {
  try {
    const count = await Imovel.count({ where: { status: 3 } });
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar imóveis disponíveis.' });
  }
}

async function countTotalImoveis(req, res) {
  try {
    const totalImoveis = await Imovel.count();
    res.json({ totalImoveis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao calcular quantidade total de imóveis.' });
  }
}

module.exports = {
  getAllImoveis,
  getImovelById,
  createImovel,
  updateImovel,
  deleteImovel,
  getImoveisAlugados,
  getImoveisVendidos,
  getImoveisDisponiveis,
  countTotalImoveis
};