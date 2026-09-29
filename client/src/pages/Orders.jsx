import { useEffect, useState } from "react";
import api from "../services/api";
import formatCurrency from "../utils/formatCurrency";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        const token = localStorage.getItem("token");

        try {

            const res = await api.get("/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setOrders(res.data);

        } catch (err) {

            setError(err.response?.data?.message || "Failed to load orders");

        } finally {
            setLoading(false);
        }

    };

    if (loading) return <div className="container mt-5"><p>Loading...</p></div>;
    if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

    return (

        <div className="container my-5">

            <h2 className="my-4">My Orders</h2>

            {orders.length === 0 ? (

                <div className="alert alert-info">You have no orders yet</div>

            ) : (

                <>

                    {orders.map(order => (

                        <div key={order._id} className="card mb-4 p-4">

                            <div className="row">

                                <div className="col-md-8">

                                    <h5>Order ID: {order._id}</h5>

                                    <p><strong>Date: </strong> {new Date(order.createdAt).toLocaleDateString()}</p>

                                    <p><strong>Status: </strong> <span className="badge bg-info">{order.status}</span></p>

                                    <p><strong>Total: </strong> {formatCurrency(order.totalPrice)}</p>

                                    <h6>Products:</h6>

                                    <ul>

                                        {order.products?.map((item, idx) => (

                                            <li key={idx}>

                                                {item.product?.name} x {item.quantity}

                                            </li>

                                        ))}

                                    </ul>

                                </div>

                            </div>

                        </div>

                    ))}

                </>

            )}

        </div>

    );

}

export default Orders;