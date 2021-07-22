const argon2 = require("argon2");
const connection = require("../db-connection");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};
// Fonction to encrypt the user Password
const hashPassword = (password) => {
  return argon2.hash(password, hashingOptions);
};
const verifyPassword = (hashedPassword, password) => {
  return argon2.verify(hashedPassword, password, hashingOptions);
};

const findOneByid = (id) => {
  const sql = "SELECT * FROM admin WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const createOne = (admin) => {
  const sql = "INSERT INTO admin SET ?";
  return connection.promise().query(sql, admin);
};

const updateOne = (admin, id) => {
  const sql = "UPDATE admin SET ? WHERE id=?";
  return connection.promise().query(sql, [admin, id]);
};

const deleteOne = (id) => {
  const sql = "DELETE FROM admin WHERE id=?";
  return connection.promise().query(sql, [id]);
};

const verifyEmail = (email) => {
  const sql = "SELECT * FROM admin WHERE email= ?";
  return connection.promise().query(sql, [email]);
};

module.exports = {
  findOneByid,
  createOne,
  updateOne,
  deleteOne,
  hashPassword,
  verifyPassword,
  verifyEmail,
};
