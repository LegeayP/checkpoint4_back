const Joi = require("joi");
const { join } = require("path/posix");
const {
  getAll,
  findOneByid,
  createOne,
  updateOne,
  deleteOne,
  getAllByPriceAsc,
  getAllByPriceDesc,
  getAllByAchat,
  getAllByLocation,
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
  return getAll()
    .then((results) => {
      const bien = results[0];
      res.json(bien);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

// const getAllBienLocation = (req, res) => {
//   const location = req.body.status ? req.body.status : req.params.status;
//   console.log(req.body.status, req.params.status);

//   if (location === "Location") {
//     return getAllByLocation(location)
//       .then((results) => {
//         const bien = results[0];
//         console.log(results, "location");

//         res.json(bien);
//       })
//       .catch((err) => {
//         res.status(500).send(err.message);
//       });
//   }
// };

const getAllBienAchat = (req, res) => {
  const achat = req.body.status ? req.body.status : req.params.status;
  if (achat === "Achat") {
    return getAllByAchat(achat).then((results) => {
      const bien = results[0];

      res.json(bien);
    });
  } else if (achat === "Location") {
    return getAllByLocation(achat)
      .then((results) => {
        const bien = results[0];
        console.log(results, "location");

        res.json(bien);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};
// const getClientsByLastname = (req, res) => {
//   const lastname = req.body.lastname ? req.body.lastname : req.params.lastname;
//   if (lastname) {
//     const status = req.lastname ? 201 : 200;
//     return findOneByLastname(lastname)
//       .then((results) => {
//         const clients = results[0];
//         return res.status(status).json(clients);
//       })
//       .catch((err) => {
//         res.status(500).send(err.message);
//       });
//   }
//   return res.status(404).send('Provide a Lastname');
// };

// const getAchatOrLocative = (req, res) => {
//   const status = req.body.status ? req.body.status : req.params.status;

//   if (status === "Achat") {
//     const status = req.status ? 201 : 200;
//     return getAllByAchat()
//       .then((results) => {
//         const bien = results[0];
//         res.status(status).json(bien[0]);
//       })
//       .catch((err) => {
//         res.status(500).send(err.message);
//       });
//   }
//   return getAllByLocation()
//     .then((results) => {
//       const bien = results[0];
//       res.json(bien);
//     })
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// };

const getAllBienByPriceAsc = (req, res) => {
  const prix = req.body.prix ? req.body.prix : req.params.prix;
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
  const prix = req.body.prix ? req.body.prix : req.params.prix;
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
  const { name, description, prix, surface, secteur, type, status } = req.body;
  let validationData = null;
  validationData = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    prix: Joi.number(),
    surface: Joi.number(),
    secteur: Joi.string(),
    type: Joi.string(),
    status: Joi.string(),
  }).validate(
    { name, description, prix, surface, secteur, type, status },
    { abortEarly: false }
  ).error;
  if (validationData) {
    console.log(validationData);
    res.status(500).send("Invalide donn??");
  } else {
    createOne({ name, description, prix, surface, secteur, type, status })
      .then(([results]) => {
        res.status(201).json({
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
  const { name, description, prix, surface, secteur, type, status } = req.body;
  let validationData = null;
  console.log(validationData);
  validationData = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    prix: Joi.number(),
    surface: Joi.number(),
    secteur: Joi.string(),
    type: Joi.string(),
    status: Joi.string(),
  }).validate(
    { name, description, prix, surface, secteur, type, status },
    { abortEarly: false }
  ).error;
  if (validationData) {
    res.status(500).send("Invalide donn??");
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
  // getAllBienLocation,
  getBien,
  getAllBienByPriceAsc,
  getAllBienByPriceDesc,
  createOneBien,
  updateOneBien,
  deleteOneBien,
  getAllBienAchat,
};
