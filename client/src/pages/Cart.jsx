import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import formatCurrency from "../utils/formatCurrency";

function Cart() {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {

        const token = localStorage.getItem("token");

        try {

            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCart(res.data);

        } catch (err) {

            setError(err.response?.data?.message || "Failed to load cart");

        } finally {
            setLoading(false);
        }

    };

    const removeItem = async (id) => {

        const token = localStorage.getItem("token");

        try {

            await api.delete(`/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            loadCart();

        } catch (err) {

            alert("Failed to remove item");

        }

    };

    const updateQuantity = async (id, quantity) => {

        const token = localStorage.getItem("token");

        if (quantity <= 0) {
            removeItem(id);
            return;
        }

        try {

            await api.put(`/cart/${id}`, { quantity }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            loadCart();

        } catch (err) {

            alert("Failed to update quantity");

        }

    };

    const getTotalPrice = () => {

        return cart.reduce((total, item) => {

            return total + (item.product.price * item.quantity);

        }, 0);

    };

    if (loading) return <div className="container mt-5"><p>Loading...</p></div>;
    if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

    return (

        <div className="container my-5">

            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (

                <div className="alert alert-info">

                    Your cart is empty. <Link to="/">Continue Shopping</Link>

                </div>

            ) : (

                <>

                    <table className="table table-striped">

                        <thead>

                            <tr>

                                <th>Product</th>

                                <th>Price</th>

                                <th>Quantity</th>

                                <th>Total</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {cart.map(item => (

                                <tr key={item._id}>

                                    <td>{item.product.name}</td>

                                    <td>{formatCurrency(item.product.price)}</td>

                                    <td>

                                        <input

                                            type="number"

                                            min="1"

                                            value={item.quantity}

                                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}

                                            className="form-control"

                                            style={{ width: "60px" }}

                                        />

                                    </td>

                                    <td>{formatCurrency(item.product.price * item.quantity)}</td>

                                    <td>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() => removeItem(item._id)}

                                        >

                                            Remove

                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <div className="row mt-4">

                        <div className="col-md-8"></div>

                        <div className="col-md-4">

                            <h4>Total: {formatCurrency(getTotalPrice())}</h4>

                            <Link to="/checkout" className="btn btn-success w-100 mt-3">

                                Proceed to Checkout

                            </Link>

                        </div>

                    </div>

                </>

            )}

        </div>

    );

}

export default Cart;