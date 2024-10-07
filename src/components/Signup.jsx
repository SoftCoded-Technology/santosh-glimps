import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../redux/apiSlice';

const Signup = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});
  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation();
  const navigate = useNavigate();

  const validate = () => {
    let validationErrors = {};
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!userData.fullName) validationErrors.fullName = 'Full name is required';
    if (!/\S+@\S+\.\S+/.test(userData.email)) validationErrors.email = 'Invalid email format';
    if (!passwordRegex.test(userData.password)) validationErrors.password = 'Password must be at least 8 characters long and include at least one number and one special character';
    if (userData.password !== userData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
    if (!userData.dob) validationErrors.dob = 'Date of birth is required';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signup(userData).unwrap();
      
      navigate('/login'); 
    } catch (err) {
      console.error('Signup failed:', err);
    }
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
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={userData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={userData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.dob}
          helperText={errors.dob}
        />
        {isError && <Typography color="error">{error.data?.message || 'Signup failed'}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
        {isSuccess && <Typography color="success.main">Signup successful!</Typography>}
      </form>
      <Typography variant="body2" mt={3}>
        Already have an account?{' '}
        <Typography
          component="span"
          sx={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/login')}
        >
          Login
        </Typography>
      </Typography>
    </Box>
  );
};

export default Signup;
