import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getAllProducts,
  getOneProduct,
  addNewProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRoute = express.Router();

//Get all products
productRoute.get("/", getAllProducts);

//Get one product
productRoute.get("/:product_name", getOneProduct);

//Add new product
productRoute.post(
  "/add/:user_id",
  verifyToken,
  addNewProduct
);

//Edit product
productRoute.patch("/edit/:user_id/:product_id", verifyToken, editProduct);

//Delete product
productRoute.delete("/delete/:user_id/:product_id", verifyToken, deleteProduct);

export default productRoute;
