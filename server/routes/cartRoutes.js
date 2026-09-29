import express from "express";

import auth from "../middleware/authMiddleware.js";

import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", auth, getCart);

router.post("/add", auth, addToCart);

router.put("/:id", auth, updateCart);

router.delete("/:id", auth, removeFromCart);

export default router;