import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, []);

  const addToCart = async (product) => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {

      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Added to Cart");

    } catch (err) {

      alert(err.response?.data?.message || "Unable to add to cart");

    }

  };

  if (loading) return <div className="container my-5"><p>Loading products...</p></div>;

  return (

    <div className="container my-5">

      <div className="text-center mb-5">

        <h1>💻 Laptops</h1>

        <p className="text-muted">Best Deals Available</p>

      </div>

      {products.length === 0 ? (

        <div className="alert alert-info">No products available</div>

      ) : (

        <div className="row">

          {products.map(product => (

            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default Home;