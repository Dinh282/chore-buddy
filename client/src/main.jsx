import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ThemeProvider } from "./context/ThemeContext";
import { CurrentUserProvider } from "./context";

import App from "./App";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {ProtectedRoute, ProtectedRoute2 } from "./components/ProtectedRoute/";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Landing />} />
      <Route 
        path="/login" 
        element={
          <ProtectedRoute2> 
            <Login />
          </ProtectedRoute2>
      } 
      />
      <Route 
        path="/register" 
        element={
          <ProtectedRoute2>
            <Register />
          </ProtectedRoute2>
      } 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <CurrentUserProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CurrentUserProvider>
    </CookiesProvider>
  </React.StrictMode>
);
