import React, { useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { darkPurple, Purple } from "../../../constants/color";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const secretkey = useInputValidation("");

  const isAdmin = true;

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };
  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <div
      style={{
        backgroundColor: Purple,
        minHeight: "100vh",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={handleLogin}
          >
            <TextField
              required
              fullWidth
              label="secret key"
              type="password"
              variant="outlined"
              margin="normal"
              value={secretkey.value}
              onChange={secretkey.changeHandler}
            />
            <Button
              sx={{
                marginTop: "1rem",
              }}
              fullWidth
              variant="contained"
              color={darkPurple}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
