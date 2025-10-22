import React, { useEffect } from "react";
import Navbar from "./component/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import { useThemeStore } from "./store/useThemeStore.js";
import { Toaster } from "react-hot-toast";


function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  console.log("Current theme:", theme);
  return (

    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/product/:id" element={<ProductPage />} />

      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App
