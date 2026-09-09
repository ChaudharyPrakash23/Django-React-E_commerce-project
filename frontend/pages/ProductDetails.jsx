import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch Products!");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!product) {
    return <div>No Product Found</div>;
  }

  return (
    <div className="min-h-screen bg-grey-100 flex justify center items-center py-10">
      <div classname="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="ml-6 w-200  md:w-1/2 h-100 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-grey-800 mb-2">
              {product.name}
            </h1>
            <p className="text-grey-600 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600 mb-6">
              {product.price}
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              🛒Add to cart
            </button>
            {/* back to home button */}
            <div className="mt-4">
              <a href="/" className="text-blue-600 hover:underline">⬅️back to home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails