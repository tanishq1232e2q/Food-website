import React from 'react'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'

import { FaCartShopping } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react'
import { useadmin } from '../context/admincontext'
import { RiAdminFill } from "react-icons/ri";
import op from "../assets/pexels-cottonbro-4253312.jpg"
import "../App.css"
import Footer from '../components/Footer';
export default function Auth() {
    let { count, section, setsection, logout,ok,setok,useradmin } = useadmin()



    return (
        <div>
            <nav style={{ opacity: 0.8 }} class="navbar navbar-expand-lg  bg-li fixed-top">
                <div class="container-fluid">
                    <div>

                        <h3><Link style={{color:"white",textDecoration:"none"}} to="/">Grand Restaurant</Link></h3>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span style={{marginLeft:"25rem"}} className="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav zxx justify-content-center align-items-center mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/menu">Menus</Link>
                            </li>

                            <li class="nav-item">
                                <Link class="nav-link" to="/about">About us</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/contact">Contact us</Link>
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
                    <div>
                       
                        
                    </div>
                </div>
            </nav>
            <div className="back">
                <h2>Register here</h2>
                <img style={{ width: "100%", height: "25rem", opacity: "0.85", filter: "blur(4px)",backgroundColor:"cover" }} src={op} alt="" srcset="" />
            </div>

            <div className={section == false ? "showsignup" : "showlogin"}>
                <Signup section={section} />


            </div>
            <div className={section == true ? "showsignup" : "showlogin"}>
                <Login section={section} />
            </div>

            <footer>
                <Footer/>
            </footer>
        </div>
    )
}
