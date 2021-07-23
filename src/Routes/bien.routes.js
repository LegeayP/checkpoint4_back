const bienRouter = require("express").Router();

const {
  getBien,
  updateOneBien,
  deleteOneBien,
  createOneBien,
  getAllBienByPriceAsc,
  getAllBienByPriceDesc,
  getAllBienAchat,
  // getAllBienLocation,
} = require("../Controllers/bien.controllers");

bienRouter.get("/status/:status", getAllBienAchat);
bienRouter.get("/status/:status", getAllBienAchat);
bienRouter.get("/", getBien);

bienRouter.get("/asc", getAllBienByPriceAsc);
bienRouter.get("/desc", getAllBienByPriceDesc);
bienRouter.get("/:id", getBien);
bienRouter.post("/", createOneBien);
bienRouter.put("/:id", updateOneBien);
bienRouter.delete("/:id", deleteOneBien);

module.exports = bienRouter;
