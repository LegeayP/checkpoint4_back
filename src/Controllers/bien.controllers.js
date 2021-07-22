const Joi = require("joi");
const {
  findOneByid,
  createOne,
  updateOne,
  deleteOne,
  getAllByPriceAsc,
  getAllByPriceDesc,
} = require("../Models/bien.model");

const getBien = (req, res) => {
  const id = req.bienId ? req.bienId : req.params.id;
  if (id) {
    const status = req.bienId ? 201 : 200;
    return findOneByid(id)
      .then((results) => {
        const bien = results[0];
        res.status(status).json(bien[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getAllBienByPriceAsc = (req, res) => {
  const lastname = req.body.prix ? req.body.prix : req.params.lastname;
  if (prix) {
    const status = req.prix ? 201 : 200;
    return getAllByPriceAsc(prix)
      .then((results) => {
        const bien = results[0];
        return res.status(status).json(bien);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const getAllBienByPriceDesc = (req, res) => {
  const lastname = req.body.prix ? req.body.prix : req.params.lastname;
  if (prix) {
    const status = req.prix ? 201 : 200;
    return getAllByPriceDesc(prix)
      .then((results) => {
        const bien = results[0];
        return res.status(status).json(bien);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const createOneBien = (req, res) => {
  const { name, description, prix, surface, secteur, type } = req.body;
  let validationData = null;
  validationData = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    prix: Joi.number(),
    surface: Joi.number(),
    secteur: join.string(),
    type: Joi.string(),
  }).validate(
    { name, description, prix, surface, secteur, type },
    { abortEarly: false }
  ).error;
  if (validationData) {
    console.log(validationData);
    res.status(500).send("Invalide donné");
  } else {
    createOne({ name, description, prix, surface, secteur, type })
      .then(([results]) => {
        res
          .status(201)
          .json({
            id: results.insertId,
            name,
            description,
            prix,
            surface,
            secteur,
            type,
          });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneBien = (req, res, next) => {
  const { name, description, prix, surface, secteur, type } = req.body;
  let validationData = null;
  validationData = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    prix: Joi.number(),
    surface: Joi.number(),
    secteur: join.string(),
    type: Joi.string(),
  }).validate(
    { name, description, prix, surface, secteur, type },
    { abortEarly: false }
  ).error;
  if (validationData) {
    res.status(500).send("Invalide donné");
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send("Cette image n'existe pas.");
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};
const deleteOneBien = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send("Ce bien n'existe pas.");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getBien,
  getAllBienByPriceAsc,
  getAllBienByPriceDesc,
  createOneBien,
  updateOneBien,
  deleteOneBien,
};
