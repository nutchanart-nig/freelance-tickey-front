import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Ticker from "./pages/Ticker";

function App() {
  return (
    <AuthProvider>
      <Box sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        <Header />
        <Container
          maxWidth={false}
          sx={{
            mt: 4,
            mb: 4,
            maxWidth: "1920px",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                // <PrivateRoute>
                //   <Home />
                // </PrivateRoute>
                  <Home />
              }
            />
            <Route
              path="/ticker"
              element={
                // <PrivateRoute>
                //   <Ticker />
                // </PrivateRoute>
                  <Ticker />
              }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </Container>
      </Box>
    </AuthProvider>
  );
}

export default App;
