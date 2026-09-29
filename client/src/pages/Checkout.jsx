import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const checkout = async () => {

        const token = localStorage.getItem("token");
        setLoading(true);

        try {

            await api.post(
                "/orders",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order Placed Successfully");

            navigate("/orders");

        } catch (err) {

            alert(err.response?.data?.message || "Checkout Failed");

        } finally {
            setLoading(false);
        }

    };

    return (

        <div className="container mt-5">

            <h2>Checkout</h2>

            <p>Review your cart details and click below to place your order.</p>

            <button
                className="btn btn-success me-2"
                onClick={checkout}
                disabled={loading}
            >
                {loading ? "Processing..." : "Place Order"}
            </button>

            <button
                className="btn btn-secondary"
                onClick={() => navigate("/cart")}
            >
                Back to Cart
            </button>

        </div>

    );

}

export default Checkout;