import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  Divider,
} from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // For redirection

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;
      const response = await fetch("https://ecommerce-backend-olive-ten.vercel.app/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenId }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store token and role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect based on role
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "user") {
          navigate("/products");
        }
      } else {
        setMessage(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setMessage("Error during Google login");
    }
  };

  // Handle Google Login Failure
  const handleGoogleFailure = (error) => {
    console.error("Google login error:", error);
    setMessage("Google login failed");
  };

  // Handle Email/Password Login
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ecommerce-backend-olive-ten.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store token and role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect based on role
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "user") {
          navigate("/products");
        }
      } else {
        setMessage(data.message || "Email login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error during email login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card
        elevation={3}
        className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md"
        style={{ backgroundColor: "#fff" }}
      >
        <Typography
          variant="h5"
          className="text-center font-bold text-gray-800"
        >
          Login
        </Typography>

        {/* Email and Password Login Form */}
        <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="mt-2"
          >
            Login
          </Button>
        </form>

        <Divider className="my-4" />

        <Typography variant="body2" align="center" color="textSecondary">
          or login with
        </Typography>

        {/* Google OAuth Provider */}
        <Box display="flex" justifyContent="center" mt={2}>
          <GoogleOAuthProvider clientId="1099022575970-viu8bbth63rdfr93q3jc49jslqgvht2q.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              text="signin_with"
              className="w-full"
              useOneTap
            />
          </GoogleOAuthProvider>
        </Box>

        <Typography variant="body2" color="error" className="text-center mt-4">
          {message}
        </Typography>

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Dont have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default LoginForm;
