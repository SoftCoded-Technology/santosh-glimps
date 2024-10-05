import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/apiSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const validate = () => {
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const userData = await login({ email, password }).unwrap();
      localStorage.setItem("token", userData.token); // Store the token securely
      navigate("/dashboard"); // Navigate to a protected route or dashboard
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleRedirect = () => {
    navigate("/signup");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth="400px"
      mx="auto"
      mt={5}
      p={3}
      boxShadow={3}
    >
      <Typography variant="h4" mb={3}>
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      {isError && (
        <Typography color="error" mt={2}>
          {error?.data?.message || "Login failed. Please try again."}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? <CircularProgress size={24} /> : "Login"}
      </Button>
      <Typography variant="body2" mt={3}>
        Don't have an account?{" "}
        <Typography
          component={"span"}
          sx={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          onClick={handleRedirect}
        >
          Sign up
        </Typography>
      </Typography>
    </Box>
  );
};

export default LoginForm;
