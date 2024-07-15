import React, { useEffect } from 'react'
import "../App.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useadmin } from '../context/admincontext'
import { FaCartShopping } from "react-icons/fa6";
import { IoReloadCircle } from "react-icons/io5";

import { IoFastFoodSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'
import Reload from './Reload'
export default function Userorders() {

    const { order, getorders, logout, count, img,reload,useradmin } = useadmin()

    let getok=localStorage.getItem("ok")
    
    
    
    
    
    console.log(order);
    return (
        <>
        <Reload/>
            <div>
                <nav style={{ opacity: 0.8 }} class="navbar navbar-expand-lg  bg-li fixed-top">
                    <div class="container-fluid">
                        <div>

                        <h3><Link style={{color:"white",textDecoration:"none"}} to="/">Grand Restaurant</Link></h3>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav justify-content-center align-items-center mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link active" aria-current="page" to="/menu">Menus</Link>
                                </li>

                                <li class="nav-item">
                                    <Link class="nav-link" to="/about">About us</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/conatct">Contact us</Link>
                                </li>


                                {
                                    logout ? <li>
                                        <Link class="nav-link" to="/logout">Logout</Link>
                                    </li> : <li class="nav-item">
                                        <Link class="nav-link" to="/auth">Signup/Login</Link>
                                    </li>
                                }

                                <li>
                                <div className='icon'>
                            <i  ><Link style={{ color: "white", display: "flex", textDecoration: "none" }} to="/cart"><FaCartShopping size={33} /><i className='cont'>{count}</i></Link>cart</i>
                            <i  ><Link style={{ color: "white", display: "flex", textDecoration: "none" }} to={logout && useradmin?"/admin":"/"}><RiAdminFill size={33} /></Link>Admin</i>

                            <i ><Link style={{ color: "white", display: "flex" }} to="/order">
                                {
                                    logout ? <IoFastFoodSharp size={33} /> : ""
                                }
                            </Link>{logout?"orders":""}</i>


                        </div>
                                </li>

                               
                            </ul>

                        </div>
                        
                    </div>
                </nav>
            </div>

            <div className='ordersmy '>
                <img className='mn' src={img.url8} alt="" srcset="" />
                <h1 style={{marginBottom:"2rem"}}>Your Orders</h1><span><i >Reload orders</i><i onClick={reload}><IoReloadCircle size={33}/></i></span>
                
                <div className='op'>
                    {
                        order.length==0|| !logout?<div>Kindly place your order</div>: order.map((elem, index) => {
                            return <>
                                <div className='boxorder '>

                                    <div class="card  mb-3" >
                                        <div class="kl  row g-0">
                                            <div class="col-md-4">
                                                <img style={{height:"100%"}} src={elem.image} class="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div class="col-md-8">
                                                <div  class="card-body">
                                                    <h5 className="card-title">{elem.name}</h5>
                                                    <p class="card-title"><span>Category</span> :{elem.category}</p>
                                                    <p class="card-text"><span>Price</span> : {elem.price}</p>
                                                    <p className='card-text'><span>Quantity</span> : {elem.getdata}</p>
                                                    <p className='card-text'> <span>Ordered by</span> : {elem.username}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </>
                        })
                    }
                </div>
                <div className='menus'>
                   
                </div>
            </div>
        </>
    )
}
