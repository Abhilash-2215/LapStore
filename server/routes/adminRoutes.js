import express from "express";

import {
    getDashboard,
    getProducts,
    deleteProduct,
    getUsers,
    getOrders

} from "../controllers/adminController.js";


import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
"/dashboard",
authMiddleware,
adminMiddleware,
getDashboard
);



router.get(
"/products",
authMiddleware,
adminMiddleware,
getProducts
);



router.delete(
"/products/:id",
authMiddleware,
adminMiddleware,
deleteProduct
);



router.get(
"/users",
authMiddleware,
adminMiddleware,
getUsers
);



router.get(
"/orders",
authMiddleware,
adminMiddleware,
getOrders
);



export default router;