import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../style/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ CHANGE IS HERE
      const { token, user } = res.data;
      const role = user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log("User role:", role);

      if (role === "admin") {

        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Please enter your details to sign in.</p>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="login-button"
          onClick={loginUser}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="signup-prompt">
          <span>Don't have an account?</span>
          <Link to="/register" className="signup-link"> Sign up</Link>
        </div>
      </div>
    </div>
  );
}
