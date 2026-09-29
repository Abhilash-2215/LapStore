import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            await api.post("/auth/register", {
                name,
                email,
                password
            });

            alert("Registration Successful! Please login.");
            navigate("/login");

        } catch (err) {

            alert(err.response?.data?.message || "Registration failed");

        } finally {
            setLoading(false);
        }

    }

    return (

        <div className="container mt-5">

            <form className="col-md-5 mx-auto" onSubmit={register}>

                <h2>Create Account</h2>

                <input
                    className="form-control mb-3"
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="btn btn-success w-100" disabled={loading}>

                    {loading ? "Registering..." : "Register"}

                </button>

                <p className="text-center mt-3">

                    Already have an account? <Link to="/login">Login</Link>

                </p>

            </form>

        </div>

    )

}

export default Register;