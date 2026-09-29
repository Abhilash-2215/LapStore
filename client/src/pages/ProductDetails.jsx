import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import formatCurrency from "../utils/formatCurrency";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {

        try {

            const res = await api.get(`/products/${id}`);
            setProduct(res.data);

        } catch (err) {

            alert("Product not found");
            navigate("/");

        } finally {
            setLoading(false);
        }

    };

    const addToCart = async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {

            await api.post("/cart/add", { productId: id, quantity }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Added to Cart");

        } catch (err) {

            alert("Failed to add to cart");

        }

    };

    if (loading) return <div className="container mt-5"><p>Loading...</p></div>;
    if (!product) return <div className="container mt-5 alert alert-danger">Product not found</div>;

    return (

        <div className="container my-5">

            <div className="row">

                <div className="col-md-6">

                    <img src={product.image} alt={product.name} className="img-fluid" />

                </div>

                <div className="col-md-6">

                    <h1>{product.name}</h1>

                    <p className="text-muted">{product.category}</p>

                    <h3>{formatCurrency(product.price)}</h3>

                    <p>{product.description}</p>

                    <p>

                        <strong>Stock: </strong>

                        {product.stock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>}

                    </p>

                    <div className="mb-3">

                        <label>Quantity:</label>

                        <input

                            type="number"

                            min="1"

                            max={product.stock}

                            value={quantity}

                            onChange={(e) => setQuantity(parseInt(e.target.value))}

                            className="form-control"

                            style={{ width: "100px" }}

                        />

                    </div>

                    <button className="btn btn-primary btn-lg" onClick={addToCart} disabled={product.stock === 0}>

                        Add to Cart

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductDetails;
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {

        api.get(`/products/${id}`)
            .then(res => setProduct(res.data));

    }, [id]);

    if (!product)
        return <h3 className="text-center mt-5">Loading...</h3>;

    return (

        <div className="container mt-5">

            <div className="row">

                <div className="col-md-6">

                    <img
                        src={product.image}
                        className="img-fluid rounded"
                        alt={product.name}
                    />

                </div>

                <div className="col-md-6">

                    <h2>{product.name}</h2>

                    <p>{product.description}</p>

                    <h3>${product.price}</h3>

                    <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product._id)}
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductDetails;