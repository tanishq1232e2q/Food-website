import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"
export default function Footer() {
  return (
    <div>
      <div className='footers'>
        <h2>Grand Restaurant</h2>
        <ul>
           <Link className='n' to="/"><li>Home</li></Link> 
           <Link className='n' to="/about"><li>Aboutus</li></Link> 
           <Link className='n' to="/menu"><li>Menus</li></Link> 
           <Link className='n' to="/contact"><li>Contact</li></Link> 
           <Link className='n' to="/"><li>Admin</li></Link> 
        </ul>
        <p>www.grandrestaurant.com all rights reserved</p>
      </div>
    </div>
  )
}
