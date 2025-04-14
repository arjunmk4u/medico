import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import login from "../assets/img/login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") navigate("/admin");
        else if (data.user.role === "doctor") navigate("/doctor");
        else navigate("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden w-full max-w-3xl">
        <div className="hidden md:flex items-center justify-center p-8 bg-gray-50">
          <img 
            src={login} 
            alt="Login Illustration" 
            className="w-full max-w-xs object-cover rounded-md" 
          />
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-10 w-full md:w-1/2">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 bottom-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center -mb-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-md font-medium hover:bg-primary-dark transition-colors text-sm mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Don't have an account?{" "}
            <a 
              href="/signup" 
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;