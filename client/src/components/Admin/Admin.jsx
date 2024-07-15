import React from 'react'
import "../../App.css"

import { FiAlignJustify } from "react-icons/fi";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import user from "../../assets/user.png"
import { GiFoodTruck } from "react-icons/gi";
import { IoIosExit } from "react-icons/io";
import prod from "../../assets/prod.png"
import conatct from "../../assets/contact.png"
import order from "../../assets/cargo_3045670.png"
export default function Admin() {
  return (
    <div className='admin'>
      <div className="stripe">


        <a class="btn btn-black" style={{ backgroundColor: "white" }} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <FiAlignJustify size={30} />
        </a>

        <h2>Admin Dashboard</h2>
        <Link class="btn btn-black" to="/admin"><FaHome size={30} /></Link>


      </div>
      <div>


        <div  class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div style={{ marginBottom: "-3rem" }} class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div class="offcanvas-body">
            <div>
              <MdProductionQuantityLimits size={40} />  <Link class="btn btn-black" to="/admin/getproducts">Products</Link>

            </div>
            <div>
              <FaUserFriends size={40} />  <Link class="btn btn-black" to="/admin/users">Users</Link>

            </div>
            <div>
              <IoMdContact size={40} />  <Link class="btn btn-black" to="/admin/contact">Contacts</Link>

            </div>
            <div>
              <GiFoodTruck size={40} /><Link class="btn btn-black" to="/admin/orders">Orders</Link>
            </div>
            <div>
              <IoIosExit size={40} /><Link class="btn btn-black" to="/">Exit</Link>
            </div>


          </div>
        </div>
      </div>
      <div className='boxes'>
        <section className='layout'>

          <div className='box'>
            <img src={prod} alt="" />
            <h4>Manage Products</h4>
          </div>
          <div className='box'>
            <img src={user} alt="" />
            <h4>Registered Users</h4>
          </div>
          <div className='box'>
            <img src={conatct} alt="" />
            <h4>Contact Details</h4>
          </div>
          <div className='box'>
            <img id='or' src={order} alt="" />
            <h4>User orders</h4>
          </div>
        </section>
      </div>

      <Outlet />


    </div>
  )
}
