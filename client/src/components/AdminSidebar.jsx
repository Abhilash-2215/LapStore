import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">

      <h2>Admin Panel</h2>

      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/products">
            Products
          </Link>
        </li>

        <li>
          <Link to="/admin/orders">
            Orders
          </Link>
        </li>

        <li>
          <Link to="/admin/users">
            Users
          </Link>
        </li>

        <li>
          <Link to="/admin/add-product">
            Add Product
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default AdminSidebar;