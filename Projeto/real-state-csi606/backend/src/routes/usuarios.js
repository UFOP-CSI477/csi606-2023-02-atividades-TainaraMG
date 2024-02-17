const express = require('express');
const usuariosController = require('../controllers/usuariosController');

const router = express.Router();

router.get('/usuarios', usuariosController.getAllUsuarios);
router.get('/usuarios/:id', usuariosController.getUsuarioById);
router.post('/usuarios', usuariosController.createUsuario);
router.put('/usuarios/:id', usuariosController.updateUsuario);
router.delete('/usuarios/:id', usuariosController.deleteUsuario);
router.post('/usuarios/login', usuariosController.loginUsuario); 

module.exports = router;
 