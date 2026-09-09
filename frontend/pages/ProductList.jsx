import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${BASEURL}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch Products!");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex items-center text-lg font-medium text-gray-600">
          Loading
          <span className="ml-1 flex gap-1">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:300ms]"></span>
          </span>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <div className="min-h-screen bg-grey-100">
      <h1 className="text-3xl font-bold text-center py-6 bg-white">
        Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gery-500">
            No Products Availabe
          </p>
        )}
      </div>
    </div>
  );
}
export default ProductList;
