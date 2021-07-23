const mainRouter = require("express").Router();
const adminRoutes = require("./admin.routes");
const bienRoutes = require("./bien.routes");
const imagesRoutes = require("./images.routes");
const emailsRoutes = require("./emails.routes");

mainRouter.use("/admin", adminRoutes);
mainRouter.use("/bien", bienRoutes);
mainRouter.use("/images", imagesRoutes);
mainRouter.use("/send-email", emailsRoutes);

module.exports = mainRouter;
