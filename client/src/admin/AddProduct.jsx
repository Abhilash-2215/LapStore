import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddProduct = () => {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "Laptop",
        stock: 1,
        image: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct({
            ...product,
            [name]: name === "price" || name === "stock" ? parseFloat(value) : value
        });

    };

    const submitHandler = async (e) => {

        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        try {

            await api.post("/products", product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Product Added Successfully");
            navigate("/admin/products");

        } catch (err) {

            alert(err.response?.data?.message || "Failed to add product");

        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="p-4">

            <h1 className="mb-4">Add Product</h1>

            <form onSubmit={submitHandler} className="col-md-6">

                <div className="mb-3">

                    <label className="form-label">Product Name</label>

                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">Description</label>

                    <textarea
                        className="form-control"
                        name="description"
                        placeholder="Product Description"
                        rows="3"
                        value={product.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                </div>

                <div className="mb-3">

                    <label className="form-label">Price</label>

                    <input
                        className="form-control"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">Category</label>

                    <select
                        className="form-control"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    >

                        <option>Laptop</option>
                        <option>Desktop</option>
                        <option>Tablet</option>

                    </select>

                </div>

                <div className="mb-3">

                    <label className="form-label">Stock</label>

                    <input
                        className="form-control"
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="mb-3">

                    <label className="form-label">Image URL</label>

                    <input
                        className="form-control"
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button className="btn btn-success" disabled={loading}>

                    {loading ? "Adding..." : "Add Product"}

                </button>

            </form>

        </div>

    );

};

export default AddProduct;