const connection = require('../db-connection');

const findOneByid = (id) => {
  const sql = 'SELECT * FROM images WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (images) => {
  const sql = 'INSERT INTO images SET ?';
  return connection.promise().query(sql, images);
};

const updateOne = (images, id) => {
  const sql = 'UPDATE images SET ? WHERE id=?';
  return connection.promise().query(sql, [images, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM images WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const getAll = () => {
  const sql = 'SELECT * FROM images';
  return connection.promise().query(sql);
};

module.exports = { findOneByid, createOne, updateOne, deleteOne, getAll };
