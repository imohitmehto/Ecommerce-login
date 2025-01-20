import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import { TextField, Button, Typography, Card, Box } from "@mui/material";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      const { message, token, role } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
  
      setMessage(message || "Signup successful");
  
      navigate("/products");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error occurred during signup";
      console.error(errorMessage);
      setMessage(errorMessage);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card
        elevation={3}
        className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md"
      >
        <Typography
          variant="h5"
          align="center"
          className="font-bold text-gray-800"
        >
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Name"
            type="text"
            name="name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
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
            Signup
          </Button>
        </form>

        {message && (
          <Typography
            variant="body2"
            color={
              message.toLowerCase().includes("success") ? "primary" : "error"
            }
            className="text-center mt-4"
          >
            {message}
          </Typography>
        )}

        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default SignupForm;
