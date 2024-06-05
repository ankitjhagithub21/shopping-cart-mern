import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast"
import Products from './pages/Products'
import { useDispatch } from "react-redux"
import { setUser } from "./app/slices/authSlice"
import getUserFromServer from './helpers/getUserFromServer'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import "./App.css"
import { setCart } from './app/slices/cartSlice'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import Cancel from './pages/Cancel'
import Success from './pages/Success'

const App = () => {
  const dispatch = useDispatch()
  const [isDarkMode,setIsDarkMode] = useState(false)
  const getUser = () => {
    getUserFromServer().then((data) => {
      if (data.success) {
        dispatch(setUser(data.user))
        dispatch(setCart(data.user.cart))
      }
    })
  }
  useEffect(() => {
    getUser()
  }, [])

  return (
   <div className={isDarkMode ? 'dark':'light'}>
     <BrowserRouter>
      <Toaster />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login getUser={getUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success getUser={getUser}/>} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
   </div>
  )
}

export default App
