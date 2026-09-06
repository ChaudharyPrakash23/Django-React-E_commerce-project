import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      })
      .catch((error) => console.error("Error fetching message:", error));
  }, []);
  return (
    <div>
      <h1>Message from Backend</h1>
      <p>{message || "Loading...."}</p>
    </div>
  );
}
export default App;
