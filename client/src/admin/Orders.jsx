import React, { useEffect, useState } from "react";
import api from "../services/api";
import formatCurrency from "../utils/formatCurrency";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        api
            .get("/admin/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setOrders(res.data.orders);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

    }, []);

    if (loading) return <div className="p-4"><p>Loading...</p></div>;

    return (

        <div className="p-4">

            <h1 className="mb-4">Orders</h1>

            <div className="table-responsive">

                <table className="table table-striped">

                    <thead className="table-dark">

                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>

                    </thead>

                    <tbody>

                        {orders.map(order => (

                            <tr key={order._id}>

                                <td>{order._id.substring(0, 8)}...</td>

                                <td>{order.user?.name}</td>

                                <td>{formatCurrency(order.totalPrice)}</td>

                                <td>

                                    <span className={`badge bg-${order.status === 'Delivered' ? 'success' : 'warning'}`}>

                                        {order.status}

                                    </span>

                                </td>

                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Orders;