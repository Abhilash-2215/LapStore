import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (

    <div className="admin-navbar bg-dark text-white p-3 d-flex justify-content-between align-items-center">

      <h3 className="m-0">
        🛠 LapStore Admin
      </h3>

      <button className="btn btn-danger btn-sm" onClick={logout}>
        Logout
      </button>

    </div>

  );

};

export default AdminNavbar;