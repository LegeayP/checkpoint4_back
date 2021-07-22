const imagesRouter = require('express').Router();
const multer = require('multer');

const { getImages, createOneImages, updateOneImages, deleteOneImages } = require('../Controllers/images.controllers');

imagesRouter.get('/:id', getImages);
imagesRouter.get('/', getImages);
imagesRouter.post(
  '/',
  (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/assets');
      },
      filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });
    const upload = multer({ storage }).single('file');

    upload(req, res, (err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(req, 'req file du multer');
        console.log(req.body.configuration, 'req body config de multer');
        const configuration = JSON.parse(req.body.configuration);
        req.image = { src: req.file.filename, alt: configuration.alt, dimension: configuration.dimension };
        next();
      }
    });
  },
  createOneImages,
  getImages,
);

imagesRouter.put('/:id', updateOneImages, getImages);
imagesRouter.delete('/:id', deleteOneImages);

module.exports = imagesRouter;
