import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.password2) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (response.ok) {
        setMessage("Account created successfully! Redirecting...");

        setTimeout(() => {
          navigate("/login");
        }, 800);
      } else {
        setMessage(
          data.detail || data.message || "Signup failed. Please try again.",
        );
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            type="text"
            onChange={handleChange}
            value={form.username}
            placeholder="username"
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={form.email}
            placeholder="email"
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="password"
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="password2"
            type="password"
            onChange={handleChange}
            value={form.password2}
            placeholder="confirm password"
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Signup
          </button>
        </form>

        {message && <p className="mt-3 text-sm">{message}</p>}

        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
