import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

// Place Order
export const placeOrder = async (req, res) => {

    try {

        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        if (cart.length === 0)
            return res.status(400).json({
                message: "Cart Empty"
            });

        const products = [];

        let total = 0;

        cart.forEach(item => {

            products.push({
                product: item.product._id,
                quantity: item.quantity
            });

            total += item.product.price * item.quantity;

        });

        const order = await Order.create({

            user: req.user.id,

            products,

            totalPrice: total

        });

        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(201).json(order);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Get User Orders
export const getOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};