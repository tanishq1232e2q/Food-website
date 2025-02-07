import React from 'react'
import "../../App.css"
import { useadmin } from '../../context/admincontext';
import { FaHome } from "react-icons/fa";
import { FiAlignJustify } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import wo from "../../assets/woman-6289052_1280.png"
import prod from "../../assets/prod.png"
export default function Adminorders() {

    const { img1 } = useadmin()

    const data1 = JSON.parse(localStorage.getItem("cart"))
    console.log(data1);
    return (
        <div>
            <div className="admin">

            <div className="stripe">


            <img style={{ width: "4%" }} src={prod} alt="" srcset="" />

                <h2>Admin Dashboard</h2>
                <Link class="btn btn-black" to="/admin"><FaHome size={30} /></Link>


            </div>
            </div>

            <section className='head'>
                <h2>List of Orders</h2>
                <img src={wo} alt="" srcset="" />
            </section>
            <section className='admino'>
                {
                    data1.map((elem, index) => {
                        return <>

                            <div className='imo'>
                                <img src={elem.image} alt="" srcset="" />
                                <section className='hide'>
                                    <p>{elem.name}</p>
                                    <p><span>Category:  </span>{elem.category}</p>
                                    <p><span>Price:  </span>{elem.price}</p>
                                    <p><span>Quantity:  </span>{elem.getdata}</p>
                                    <p><span>Ordered by:  </span>{elem.userauth}</p>
                                </section>
                            </div>

                        </>
                    })
                }
            </section>

        </div>
    )
}
