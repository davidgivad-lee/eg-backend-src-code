import express from "express";
import Data from "../../data/data.js";
import Product from "../models/productModel.js";

import { isAuth, isAdmin } from "../utils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const products = await Product.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

// router.post('/:id/reviews', isAuth, async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     const review = {
//       name: req.body.name,
//       rating: Number(req.body.rating),
//       comment: req.body.comment,
//     };
//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce((a, c) => c.rating + a, 0) /
//       product.reviews.length;
//     const updatedProduct = await product.save();
//     res.status(201).send({
//       data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//       message: 'Review saved successfully.',
//     });
//   } else {
//     res.status(404).send({ message: 'Product Not Found' });
//   }
// });

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.nameDetail = req.body.nameDetail;
    product.description = req.body.description;
    product.price = req.body.price;
    product.wholePrice = req.body.wholePrice;
    product.rating = req.body.rating;
    product.colors = req.body.colors;
    product.category = req.body.category;
    product.length = req.body.length;
    product.width = req.body.width;
    product.height = req.body.height;
    product.photos = req.body.photos;
    product.countInStock = req.body.countInStock;
    product.numReviews = req.body.numReviews;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Producto Actualizado", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: " Error en actualizar producto." });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Producto Eliminado!" });
  } else {
    res.send("Error al eliminar el producto.");
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    nameDetail: req.body.nameDetail,
    description: req.body.description,
    price: req.body.price,
    wholePrice: req.body.wholePrice,
    rating: req.body.rating,
    colors: req.body.colors,
    category: req.body.category,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    photos: req.body.photos,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "Nuevo Producto creado", data: newProduct });
  }
  return res.status(500).send({ message: "Error en crear producto" });
});

export default router;
