import React, { useEffect, useState } from "react";
import api from "../services/api";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        api
            .get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setUsers(res.data.users);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

    }, []);

    if (loading) return <div className="p-4"><p>Loading...</p></div>;

    return (

        <div className="p-4">

            <h1 className="mb-4">Users</h1>

            <div className="table-responsive">

                <table className="table table-striped">

                    <thead className="table-dark">

                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users.map(user => (

                            <tr key={user._id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>

                                        {user.role}

                                    </span>

                                </td>

                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Users;