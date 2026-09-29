import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import formatCurrency from "../utils/formatCurrency";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        const token = localStorage.getItem("token");

        try {

            const res = await api.get("/admin/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProducts(res.data.products);

        } catch (err) {

            console.log(err);

        } finally {
            setLoading(false);
        }

    };

    const deleteProduct = async (id) => {

        const token = localStorage.getItem("token");

        if (!window.confirm("Are you sure?")) return;

        try {

            await api.delete(`/admin/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProducts(products.filter(product => product._id !== id));
            alert("Product deleted");

        } catch (err) {

            alert("Failed to delete product");

        }

    };

    if (loading) return <div className="p-4"><p>Loading...</p></div>;

    return (

        <div className="p-4">

            <h1 className="mb-4">Products</h1>

            <Link to="/admin/add-product" className="btn btn-success mb-3">
                Add Product
            </Link>

            <div className="table-responsive">

                <table className="table table-striped">

                    <thead className="table-dark">

                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {products.map(product => (

                            <tr key={product._id}>

                                <td>{product.name}</td>

                                <td>{formatCurrency(product.price)}</td>

                                <td>{product.category}</td>

                                <td>{product.stock}</td>

                                <td>

                                    <Link to={`/admin/edit-product/${product._id}`} className="btn btn-sm btn-warning me-2">
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Products;