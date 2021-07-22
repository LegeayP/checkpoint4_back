const mainRouter = require('express').Router();
const adminRoutes = require('./admin.routes');
const bienRoutes = require('./bien.routes');
const imagesRoutes = require('./images.routes');


mainRouter.use('/admin', adminRoutes);
mainRouter.use('/bien', bienRoutes);
mainRouter.use('/images', imagesRoutes);

module.exports = mainRouter;
