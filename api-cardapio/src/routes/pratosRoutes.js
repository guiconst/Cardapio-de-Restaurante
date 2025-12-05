const express = require('express');
const router = express.Router();
const pratosController = require('../controllers/pratosController');

router.get('/', pratosController.listar);
router.get('/:id', pratosController.buscarPorId);
router.post('/', pratosController.criar);
router.put('/:id', pratosController.atualizar);
router.delete('/:id', pratosController.deletar);

module.exports = router;
