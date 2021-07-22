const Joi = require("joi");
const {
  findOneByid,
  createOne,
  updateOne,
  deleteOne,
  hashPassword,
  verifyEmail,
} = require("../Models/admin.model");
async function awesomeDataHandler(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

const getAdmin = (req, res) => {
  const id = req.adminId ? req.adminId : req.params.id;
  if (id) {
    const status = req.adminId ? 201 : 200;
    return findOneByid(id)
      .then((results) => {
        const admin = results[0];
        res.status(status).json(admin[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const createOneAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
    const [data, error] = await awesomeDataHandler(verifyEmail(email));
    if (data[0][0]) {
      res.status(500).send("Cette admin existe déja");
    } else {
  let validationData = null;
  validationData = Joi.object({
    name: Joi.string(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { alow: ["com", "fr", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;!@#$%^&*])(?=.{8,})"
        )
      )
      .min(8)
      .max(32)
      .required(),
  }).validate({ name, email, password }, { abortEarly: false }).error;
  if (validationData) {
    res.status(500).send("Invalide donné");
  } else {
    const hashedPassword = await hashPassword(password);
    const admin = { name, email, hashedPassword };
    const [data1, error1] = await awesomeDataHandler(createOne(admin));
    if (!error) {
      req.adminId = [data1].insertId;
      next(req.adminId);
    }
  
    }}
};

const updateOneAdmin = (req, res, next) => {
  const { name, email, hashedPassword } = req.body;
  let validationData = null;
  validationData = Joi.object({
    name: Joi.string(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { alow: ["com", "fr", "net"] } })
      .required(),
      hashedPassword: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.;!@#$%^&*])(?=.{8,})"
        )
      )
      .min(8)
      .max(32)
      .required(),
  }).validate({ name, email, hashedPassword }, { abortEarly: false }).error;
  if (validationData) {
    res.status(500).send("Invalide donné");
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send("Cette admin n'existe pas.");
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};
const deleteOneAdmin = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send("Cette admin n'existe pas.");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAdmin,
  createOneAdmin,
  updateOneAdmin,
  deleteOneAdmin,
};
