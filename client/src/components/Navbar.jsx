import React from 'react'
import "../App.css"
import { useadmin } from '../context/admincontext'
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import logo from "../assets/label-2780146_1280.png"

import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoFastFoodSharp } from "react-icons/io5";
export default function Navbar(props) {
    // const { img } = useadmin()
    const { count, logout, userimg, ok, setok, setuserimg, userid, reload, useradmin } = useadmin()
    const [images, setImages] = useState([])
    // const [combo, setcombo] = useState([])



    

    return (
        <div>
            
            <nav class="navbar navbar-expand-lg  bg-li fixed-top">
                <div class="container-fluid">
                    <div>

                        <h3><Link style={{ color: "white", textDecoration: "none" }} to="/">Grand Restaurant</Link></h3>
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
                                    <i  ><Link style={{ color: "white", display: "flex", textDecoration: "none" }} to={logout && useradmin ? "/admin" : "/"}><RiAdminFill size={33} /></Link>Admin</i>

                                    <i ><Link style={{ color: "white", display: "flex" }} to="/order">
                                        {
                                            logout ? <IoFastFoodSharp size={33} /> : ""
                                        }
                                    </Link>{logout ? "orders" : ""}</i>
                                    


                                </div>

                            </li>








                        </ul>

                    </div>
               </div>
            </nav>

            <div data-bs-ride="carousel" id="carouselExampleFade" class="carousel slide carousel-fade">
                <div className='gan'>
                    <h2 >
                        <h2 className='hw' style={{ transform: "rotate(-45deg)" }}>
                            <img src={logo} alt="" srcset="" />
                            {props.name}

                            <br />
                            <h5 style={{ marginTop: "1rem" }}>{props.tag}</h5>
                        </h2>
                    </h2>

                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active ">
                        <img src={props.url1} class="d-block w-100" alt="..." />
                    </div>

                    <div class="carousel-item">
                        <img src={props.url2} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={props.url3} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={props.url4} class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>


    )
}
