// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useState }  from "react"

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    setMessage(data.message);
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.data));  // Store user data in localStorage
      navigate("/");  // Redirect to Home after successful login
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
