import Cart from "../models/Cart.js";

// Get User Cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user.id })
            .populate("product");

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add Product
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let item = await Cart.findOne({
            user: req.user.id,
            product: productId
        });

        if (item) {
            item.quantity += quantity;
            await item.save();
            return res.json(item);
        }

        item = await Cart.create({
            user: req.user.id,
            product: productId,
            quantity
        });

        res.status(201).json(item);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Quantity
export const updateCart = async (req, res) => {

    try {

        const { quantity } = req.body;

        const item = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true }
        );

        res.json(item);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }

};

// Remove Product
export const removeFromCart = async (req, res) => {

    try {

        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            message: "Removed Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};