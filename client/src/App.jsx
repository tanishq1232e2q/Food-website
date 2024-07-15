import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Admin from './components/Admin/Admin'
import Adminproduct from "./components/Admin/Adminproduct"
import Addproduct from './components/Admin/Addproduct'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import Cart from './Pages/Cart'
import Auth from './Pages/Auth'
import Logout from './Pages/Logout'
import Orders from './Pages/Orders'
import Userorders from './Pages/Userorders'
import Aminusers from './components/Admin/Aminusers'
import Adminorders from './components/Admin/Adminorders'
import Contact from './Pages/Contact'
// import Adminaddproduct from './components/Admin/Adminaddproduct'
import About from './Pages/About'
import Admincontacts from './components/Admin/Admincontacts'
function App() {


  return (
    <>

      <BrowserRouter>


        <Routes>
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/users' element={<Aminusers />} />
          <Route path='/admin/orders' element={<Adminorders />} />
          <Route path='/admin/contact' element={<Admincontacts />} />
      


          <Route path="/admin/getproducts" element={<Adminproduct />} />
          <Route path="/admin/addproducts" element={<Addproduct />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/payment" element={<Orders />} />
          <Route path="/order" element={<Userorders />} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>



        </Routes>



      </BrowserRouter>

    </>
  )
}

export default App
