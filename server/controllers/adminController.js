import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";


// Get Dashboard Data

export const getDashboard = async (req,res)=>{

    try{

        const products = await Product.countDocuments();
        const users = await User.countDocuments();
        const orders = await Order.countDocuments();


        res.json({
            products,
            users,
            orders
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


// Get All Products

export const getProducts = async(req,res)=>{

    try{

        const products = await Product.find();

        res.json({
            products
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Delete Product

export const deleteProduct = async(req,res)=>{

    try{

        await Product.findByIdAndDelete(req.params.id);


        res.json({
            message:"Product deleted"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get Users

export const getUsers = async(req,res)=>{

    try{

        const users = await User.find();

        res.json({
            users
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get Orders

export const getOrders = async(req,res)=>{

    try{

        const orders = await Order.find()
        .populate("user","name email");


        res.json({
            orders
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};