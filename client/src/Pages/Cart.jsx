import React from 'react'
import { useEffect } from 'react'
import { useadmin } from '../context/admincontext'
import Navbar from '../components/Navbar'
import { IoFastFoodSharp } from "react-icons/io5";
import "../App.css"
import { useState } from 'react'
import { RiAdminFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import lp from "../assets/pexels-elevate-1267315.jpg"
import Counter from '../components/Counter'
import fg from "../assets/empty-cart-5521508-4610092.webp"
export default function Cart() {

  let { data, setdata, ok, setok, count, getimg, useradmin, allimage, sum, cartimg, setcartimg, logout, userid, setcount } = useadmin()
  const [quant, setquant] = useState({})
  const [id, setid] = useState(userid)


  const [butclick, setbutclick] = useState(false)




  const [image, setimage] = useState([])


  console.log(data);






  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(data))
  }, [data])

  useEffect(() => {
    getimg()
  }, [])

  useEffect(() => {
    if (allimage) {
      const loadedImages = allimage.map(async data => {

        const module = await import(`../images/${data.image}`);


        return module.default;

      });
      Promise.all(loadedImages).then(image => setimage(image));


    }



  }, [allimage]);
  console.log(userid);


  const filterdata = data.filter((elem, index) => {
    return elem.userId == userid

  })
  const finaluser = localStorage.setItem("finaluser", JSON.stringify(filterdata))




  setcount(filterdata.length)

  if (!logout) {
    setcount(0)
  }






  const deletecart = (id) => {

    console.log(id);
    const newarr = data.filter((elem, i) => {
      return userid && elem._id !== id
    })
    console.log(newarr);


    const finaluser = localStorage.setItem("cart", JSON.stringify(newarr))
    window.location.reload()

  }





  console.log(quant);
  console.log(image);
  console.log(filterdata);

  return (
    <>



      <div>
        <nav style={{ opacity: 0.8 }} class="navbar navbar-expand-lg  bg-li fixed-top">
          <div class="container-fluid">
            <div>

              <h3><Link style={{ color: "white", textDecoration: "none" }} to="/">Grand Restaurant</Link></h3>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span style={{marginLeft:"21rem"}} className="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul  class="navbar-nav zxx justify-content-center align-items-center mb-2 mb-lg-0">
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
            <div>


            </div>
          </div>
        </nav>
        <div className="back">
          <h2>Order your favourite dishes here</h2>
          <img style={{ width: "100%", height: "25rem", opacity: "0.85", filter: "blur(4px)" }} src={lp} alt="" srcset="" />
        </div>

        <div className="container nm">
          <table className='table'>
            <thead>

            </thead>
            <tbody>
              <tr className='nb'>
                <td>Items</td>
                <td>Name</td>
                <td>Category</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Sub Total</td>
                <td>Remove</td>
              </tr>

              {logout && filterdata.map((elem, index) => (
                <>
                  <tr key={index}>
                    <td>  <img style={{  height: "4rem" }} src={elem.image} alt="" srcset="" /></td>
                    <td>{elem.name}</td>
                    <td>{elem.category}</td>
                    <td>{elem.price}</td>

                    <td><div>
                      {elem.getdata}
                    </div></td>
                    <td>{elem.getdata !== undefined && parseInt(elem.price) !== NaN && parseInt(elem.getdata) ? parseInt(elem.getdata) * parseInt(elem.price) : <span style={{ color: "red" }}>please add the qauntity</span>}</td>
                    <td>{<MdDeleteForever id='del' onClick={() => deletecart(elem._id)} size={40} color='red' />}</td>
                  </tr>

                  <div style={{ visibility: "hidden" }}>
                    {sum = sum + parseInt(elem.getdata) * parseInt(elem.price)}
                    {
                      localStorage.setItem("sum", sum)
                    }
                  </div>

                </>
              ))}

            </tbody>
          </table>
          <Link to={!logout ? "/cart" : "/menu"}><button style={{ float: "right", marginRight: "6rem", marginBottom: "1rem" }} className='btn btn-info'>{data.length == 0 ? "Add products" : "Add More"}</button></Link>
        </div>
        <div className='box'>
          <div>
            {
              filterdata.length == 0 || !logout ? <img src={fg} style={{ width: "60%", marginLeft: "15rem" }} alt="" srcset="" /> : ""
            }
          </div>
          <div>
            {
              !logout ? <h3 >Register first to add Products</h3> : ""
            }
          </div>

        </div>
      </div>

      <div className="foot">
        <div>
          <h3>Grand Total: {sum}$</h3>
          <Link to={logout?"/payment":""}><button className='btn btn-warning' >Proceed to order</button></Link>
        </div>
      </div>


    </>
  )
}
