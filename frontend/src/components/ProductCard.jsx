import { Link } from "react-router-dom";

function ProductDetails({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <Link
      to={`/Product/${product.id}`}
      className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4"
    >
      <img src={`${BASEURL}${product.image}`}
      alt={product.name}
      className="w-full h-56 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-grey truncate">{product.name}</h2>
      <p className="text-grey-600 font-medium ">{product.price}</p>
    </Link>
  );
}
export default ProductDetails;
