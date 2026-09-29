import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {

        loadProduct();

    }, [id]);

    const loadProduct = async () => {

        try {

            const res = await api.get(`/products/${id}`);
            setProduct(res.data);

        } catch (err) {

            alert("Product not found");
            navigate("/admin/products");

        } finally {
            setLoading(false);
        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct({
            ...product,
            [name]: name === "price" || name === "stock" ? parseFloat(value) : value
        });

    };

    const submitHandler = async (e) => {

        e.preventDefault();
        setUpdating(true);

        const token = localStorage.getItem("token");

        try {

            await api.put(`/products/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Product Updated Successfully");
            navigate("/admin/products");

        } catch (err) {

            alert(err.response?.data?.message || "Failed to update product");

        } finally {
            setUpdating(false);
        }

    };

    if (loading) return <div className="p-4"><p>Loading...</p></div>;
    if (!product) return <div className="p-4 alert alert-danger">Product not found</div>;

    return (

        <div className="p-4">

            <h1 className="mb-4">Edit Product</h1>

            <form onSubmit={submitHandler} className="col-md-6">

                <div className="mb-3">

                    <label className="form-label">Product Name</label>

                    <input
                        className="form-control"
                        type="text"
                        name="name"
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
                        value={product.image}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button className="btn btn-primary" disabled={updating}>

                    {updating ? "Updating..." : "Update Product"}

                </button>

            </form>

        </div>

    );

};

export default EditProduct;