import express from "express";

import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", auth, createProduct);

router.put("/:id", auth, updateProduct);

router.delete("/:id", auth, deleteProduct);

export default router;