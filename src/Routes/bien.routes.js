const bienRouter = require('express').Router();

const { getBien, updateOneBien, deleteOneBien, createOneBien } = require('../Controllers/bien.controllers');

bienRouter.get('/', getBien);
bienRouter.get('/:id', getBien);
bienRouter.post('/', createOneBien);
bienRouter.put('/:id', updateOneBien);
bienRouter.delete('/:id', deleteOneBien);

module.exports = bienRouter;
