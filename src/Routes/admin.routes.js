const adminRouter = require("express").Router();

const {
  getAdmin,
  updateOneAdmin,
  deleteOneAdmin,
  createOneAdmin,
} = require("../Controllers/admin.controllers");

adminRouter.get("/:id", getAdmin);
adminRouter.post("/", createOneAdmin, getAdmin);
adminRouter.put("/:id", updateOneAdmin);
adminRouter.delete("/:id", deleteOneAdmin);

module.exports = adminRouter;
