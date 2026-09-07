import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching message:", error));
  }, []);
  return (
    <div className="min-h-screen bg-grey-100 test-grey-100">
      <h1 className="text-3xl font-bold underline">Product List</h1>
      <div className="container mx-auto p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold ">{product.name}</h2>
            <img
              src={`http://127.0.0.1:8000/products/CFL_20watt.jpg`}
              alt={product.name}
              className="h-60 w-60 object-cover rounded-sm"
            />
            <p className="text-grey-600">{product.description}</p>
            <p className="text-grey-600 font-bold">Rs:{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
