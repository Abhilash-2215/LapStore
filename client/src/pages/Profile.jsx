import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const userData = localStorage.getItem("user");

        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate("/login");
        }

    }, [navigate]);

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");

    };

    if (!user) return <div className="container mt-5"><p>Loading...</p></div>;

    return (

        <div className="container mt-5">

            <h2>My Profile</h2>

            <div className="card p-4 mt-4" style={{ maxWidth: "500px" }}>

                <p><strong>Name: </strong> {user.name}</p>

                <p><strong>Email: </strong> {user.email}</p>

                <p><strong>Role: </strong> {user.role}</p>

                <button className="btn btn-danger" onClick={logout}>

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Profile;