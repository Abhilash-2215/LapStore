import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const res = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Login Successful");
            navigate("/");

        } catch (err) {

            alert(err.response?.data?.message || "Invalid Credentials");

        } finally {
            setLoading(false);
        }

    }

    return (

        <div className="container mt-5">

            <form className="col-md-5 mx-auto" onSubmit={login}>

                <h2>Login</h2>

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

                    {loading ? "Logging in..." : "Login"}

                </button>

            </form>

        </div>

    )

}

export default Login;