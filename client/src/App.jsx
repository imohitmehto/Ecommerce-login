import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import ProductScreen from "./components/ProductScreen";
import PropTypes from "prop-types";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./App.css";

const userRole = localStorage.getItem("role");

// Private Route Component
const PrivateRoute = ({ role, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Add PropTypes validation
PrivateRoute.propTypes = {
  role: PropTypes.string, // Optional string prop
  children: PropTypes.node.isRequired, // React node is required
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" className="flex-grow">
              E-commerce
            </Typography>
            {userRole === "admin" && (
              <Button color="inherit" component={Link} to="/admin-dashboard">
                Dashboard
              </Button>
            )}
            {userRole === "user" && (
              <Button color="inherit" component={Link} to="/products">
                Products
              </Button>
            )}
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />

            {/* Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute role="user">
                  <ProductScreen />
                </PrivateRoute>
              }
            />

            {/* Default Route */}
            <Route
              path="*"
              element={
                localStorage.getItem("token") ? (
                  localStorage.getItem("role") === "admin" ? (
                    <Navigate to="/admin-dashboard" />
                  ) : (
                    <Navigate to="/products" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
