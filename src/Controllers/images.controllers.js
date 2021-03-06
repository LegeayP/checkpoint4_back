const Joi = require("joi");
const {
  findOneByid,
  createOne,
  updateOne,
  deleteOne,
  getAll,
} = require("../Models/images.model");

const getImages = (req, res) => {
  const id = req.imagesId ? req.imagesId : req.params.id;
  if (id) {
    const status = req.imagesId ? 201 : 200;
    return findOneByid(id)
      .then((results) => {
        const images = results[0];
        res.status(status).json(images[0]);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
  return getAll()
    .then((results) => {
      const images = results[0];
      res.json(images);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneImages = (req, res) => {
  let { src, alt, bien_id } = req.body;
  console.log(src, alt, bien_id);
  if (!src) {
    src = req.image.src;
    alt = req.image.alt;
    bien_id = req.image.bien_id;
  }
  console.log(src, alt, bien_id);

  let validationData = null;
  validationData = Joi.object({
    src: Joi.string().required(),
    alt: Joi.string().required(),
    bien_id: Joi.required(),
  }).validate({ src, alt, bien_id }, { abortEarly: false }).error;
  console.log(validationData, "validation data!!!");
  if (validationData) {
    res.status(500).send("Donnée invalide");
  } else {
    createOne({ src, alt, bien_id })
      .then(([results]) => {
        res.status(201).json({
          id: results.insertId,
          src,
          alt,
          bien_id,
        });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneImages = (req, res, next) => {
  const { src, alt } = req.body;
  let validationData = null;
  validationData = Joi.object({
    src: Joi.string().required(),
    alt: Joi.string().required(),
  }).validate({ src, alt }, { abortEarly: false }).error;
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
const deleteOneImages = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send("Cette image n'existe pas.");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getImages,
  createOneImages,
  updateOneImages,
  deleteOneImages,
};
