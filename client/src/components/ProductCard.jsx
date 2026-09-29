function ProductCard({ product, addToCart }) {
  return (
    <div className="col-md-4 mb-4">

      <div className="card h-100">

        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        />

        <div className="card-body">

          <h5>{product.name}</h5>

          <p>{product.description}</p>

          <h4>${product.price}</h4>

          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;