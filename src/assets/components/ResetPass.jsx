import { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/apiSlice";

export default function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ password }).unwrap();
      navigate("/login", {
        replace: true,
        state: { success: "Password Reset Successfully" },
      });
    } catch (error) {
      console.error(error);
      setError("Failed to reset password");
    } finally {
      setPassword("");
      setConfirmPassword("");
      setError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        Reset Password
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type={showPassword ? "text" : "password"} // Toggle between text and password
        value={password}
        error={!!error}
        helperText={error}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
        value={confirmPassword}
        error={!!error}
        helperText={error}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 1 }}
        onClick={handleResetPassword}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Reset Password"}
      </Button>

      <Button fullWidth variant="outlined" onClick={() => navigate("/login")}>
        Cancel
      </Button>

      {isError && (
        <Typography color="error" mt={2}>
          Error resetting password. Please try again.
        </Typography>
      )}
    </Box>
  );
}
