import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {

    const [data, setData] = useState({ products: 0, users: 0, orders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        api
            .get("/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false));

    }, []);

    if (loading) return <div className="p-4"><p>Loading...</p></div>;

    return (

        <div className="p-4">

            <h1 className="mb-4">Admin Dashboard</h1>

            <div className="row">

                <div className="col-md-4">

                    <div className="card p-4 text-center bg-primary text-white">

                        <h3>{data.products}</h3>

                        <p>Total Products</p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card p-4 text-center bg-success text-white">

                        <h3>{data.users}</h3>

                        <p>Total Users</p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card p-4 text-center bg-warning text-white">

                        <h3>{data.orders}</h3>

                        <p>Total Orders</p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;