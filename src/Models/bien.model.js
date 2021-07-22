const connection = require("../db-connection");

const findOneByid = (id) => {
  const sql = "SELECT * FROM bien WHERE id=?";
  return connection.promise().query(sql, [id]);
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

module.exports = {
  findOneByid,
  createOne,
  updateOne,
  deleteOne,
  getAllByPriceAsc,
  getAllByPriceDesc,
};
