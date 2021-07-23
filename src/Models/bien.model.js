const connection = require("../db-connection");

const findOneByid = (id) => {
  const sql = "SELECT * FROM bien WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const getAll = () => {
  const sql = "SELECT * FROM bien";
  return connection.promise().query(sql);
};

const createOne = (bien) => {
  const sql = "INSERT INTO bien SET ?";
  return connection.promise().query(sql, bien);
};

const updateOne = (bien, id) => {
  const sql = "UPDATE bien SET ? WHERE id=?";
  return connection.promise().query(sql, [bien, id]);
};

const deleteOne = (id) => {
  const sql = "DELETE FROM bien WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const getAllByPriceAsc = (prix) => {
  const sql = "SELECT * FROM bien ORDER BY prix ASC";
  return connection.promise().query(sql, [prix]);
};

const getAllByPriceDesc = (prix) => {
  const sql = "SELECT * FROM bien ORDER BY prix DESC";
  return connection.promise().query(sql, [prix]);
};

const getAllByMaison = () => {
  const sql = "SELECT * FROM bien WHERE type='Maison'";
  return connection.promise().query(sql);
};

const getAllByTerrain = () => {
  const sql = "SELECT * FROM bien WHERE type='Terrain'";
  return connection.promise().query(sql);
};

const getAllByAppartement = () => {
  const sql = "SELECT * FROM bien WHERE type='Appartement'";
  return connection.promise().query(sql);
};

const getAllByAchat = () => {
  const sql =
    "SELECT images.id, images.src, images.bien_id, bien.id, bien.name, bien.description, bien.prix, bien.surface, bien.secteur, bien.type, bien.status FROM bien JOIN images ON images.bien_id=bien.id WHERE status='Achat'";
  return connection.promise().query(sql);
};
const getAllByLocation = () => {
  const sql =
    "SELECT images.id, images.src, images.bien_id, bien.id, bien.name, bien.description, bien.prix, bien.surface, bien.secteur, bien.type, bien.status FROM bien JOIN images ON images.bien_id=bien.id WHERE status='Location'";
  return connection.promise().query(sql);
};

module.exports = {
  getAllByAchat,
  getAllByLocation,
  getAllByAppartement,
  getAllByTerrain,
  getAllByMaison,
  getAll,
  findOneByid,
  createOne,
  updateOne,
  deleteOne,
  getAllByPriceAsc,
  getAllByPriceDesc,
};
