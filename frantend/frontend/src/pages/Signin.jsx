// import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState }  from "react"

const Signin = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [localToken , setLocalToken] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    setMessage(data.message);
    setLocalToken(data.token);
    console.log(data.token);
    localStorage.setItem(localToken)
    if (data.success) {
      navigate("/login");
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setInput({ ...input, name: e.target.value })}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        Already have an account? <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
};

export default Signin;
