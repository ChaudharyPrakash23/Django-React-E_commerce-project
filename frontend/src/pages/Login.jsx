import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

function Login() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(`${BASEURL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        saveToken(data);
        setMessage("Login successful! Redirecting....");
        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        setMessage(data.detail || "Login failed.please try again.");
      }
    } catch (error) {
      setMessage("An error occured.Please try again");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="username"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="password"
            required
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
        {message && <p className="mt-3 text-sm">{message}</p>}
        <div className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login