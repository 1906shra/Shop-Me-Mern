import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';
import ProductListing from './Pages/ProductListing';
import ProductDetail from './Pages/ProductDetails';
import Login from './Pages/Login'; // Corrected import

import Button from '@mui/material/Button';
import SignUp from './Pages/SignUp';

// Create the context
const MyContext = createContext();

function App() {
  const values = {}; // Define any values you want to share in context

  // Handle Button Click (If needed)
  
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductListing" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/Login" element={<Login />} /> 
          <Route path="/SignUp" element={<SignUp/>} /> 
        </Routes>
        <section className="bg-white">
          <Footer />
        </section>
      </MyContext.Provider>

      
    </BrowserRouter>
  );
}

export default App;
