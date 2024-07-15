import React from 'react'
import Navbar from '../components/Navbar'
import chef from "../assets/pexels-cottonbro-4253312.jpg"
import gi from "../assets/pexels-zvolskiy-2253643.jpg"
import "../App.css"
import 'swiper/css';
import { MdEmail } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { useadmin } from '../context/admincontext'
import { Link } from 'react-router-dom'
import img1 from "../images/1720094616612loaf-2796393_1280.jpg"
import img2 from "../images/1715343523107burger.jpg"
import img3 from "../images/1715345490849lunch.jpg"
import img4 from "../images/1715344708423ice1.jpg"
import Footer from '../components/Footer'
import { FaPhone } from "react-icons/fa6";
import img5 from "../images/1720027646916pizza-3203451_1280.jpg"


export default function Home() {
  let { img, userauth } = useadmin()
  console.log(userauth);
  // console.log(userauth.name);
  return (
    <>
      <div>
        <Navbar name="Grand Restaurant" tag="Fresh and Delicious" url1={img.url1} url2={img.url2} url3={img.url3} url4={img.url4} />
      </div>
      <div>
        <section className='home'>

          <div>
            <img className='ui' src={chef} alt="" srcset="" />
            <img src={gi} alt="" srcset="" />
          </div>
          <div className='vv'>
            <h3>Welcome {userauth} at </h3>
            <h4>Grand Restaurant</h4>
            <p>Dear Esteemed Guests,

              On behalf of our entire team, it's our utmost pleasure to extend a warm welcome to you. As you step into our culinary sanctuary, we invite you to embark on a journey of flavors, creativity, and hospitality.
              <p>At Grand Restaurant, we believe in crafting more than just meals; we strive to create experiences that linger in your memory long after the last bite. From the freshest ingredients sourced locally to the meticulous attention to detail in every dish, our passion for gastronomy is evident in every aspect of our menu.</p>


            </p>
            <button style={{ width: "25%" }} className='btn btn-success'><Link to="/about" style={{ color: "white", textDecoration: "none" }}>About us</Link></button>
          </div>
        </section>

        <section className='screen mm'>
          <div>
            <h1>Order the delicous meals of heaven </h1>
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}><GiMeal />From Fast food to Special meals<GiMeal /></h2>


          </div>

        </section>

        <section className='menusadd mm'>
          <div>
            <h1 style={{ textAlign: "center" }}>Exciting Menus</h1>
            <hr />
            <div className='grids'>
              <div className="g1 wrapper">
                <Link to="/menu"><img src={img1} alt="" /></Link>
                

              </div>
              <div className="g2 wrapper">

                <Link to="/menu"><img src={img2} alt="" /></Link>

              </div>
              <div className="g3 wrapper">

                <Link to="/menu"><img src={img3} alt="" /></Link>
              </div>
              <div className="g4 wrapper">

                <Link to="/menu"><img src={img4} alt="" /></Link>
              </div>
              <div className="g5 wrapper">

                <Link to="/menu"><img src={img5} alt="" /></Link>
              </div>
            </div>
          </div>

        </section>

        <section className='testo mm'>


            <h1>Our Testimonials</h1>
            <hr />
          <div className="conb" id='test'>
            <div className="ss">
              <img src={img.b1} alt="" />
              <h1>Denia Paul</h1>
              <p style={{textAlign:"center"}}>"I had an absolutely delightful experience at Grand Restaurant. The ambiance was cozy and inviting, the staff was incredibly attentive, and the food was simply divine. I highly recommend the truffle pasta and the chocolate lava cake – they were both to die for! I'll definitely be coming back."</p>


            </div>
            <div className="ss">
              <img src={img.b2} alt="" />
              <h1>Jack Anderson</h1>

              <p style={{textAlign:"center"}}>"This place exceeded all my expectations. The service was top-notch, and every dish we tried was bursting with flavor. The seafood platter was fresh and expertly prepared. A must-visit for anyone who loves great food and a welcoming atmosphere."

              </p>


            </div>
            <div className="ss">
              <img src={img.b3} alt="" srcset="" />
              <h1>Hannah James</h1>
              <p style={{textAlign:"center"}}>"Our dining experience at Grand Restaurant was nothing short of spectacular. The chef's creativity shines through in every dish, and the flavors were incredible. The service was friendly and efficient, making the whole experience even better. If you're looking for a great place to eat, this is it!"</p>


            </div>
            <div className="ss">
              <img src={img.b4} alt="" srcset="" />
              <h1>Ayush jha</h1>
              <p style={{textAlign:"center"}}>The staff went above and beyond to ensure we had a memorable dining experience. The dishes were beautifully presented and tasted even better than they looked. The vegan options were outstanding, and the dessert was a perfect end to a wonderful meal. We'll be back soon."</p>


            </div>
            <div className="ss">
              <img src={img.b5} alt="" />
              <h1>Sweety</h1>
              <p style={{textAlign:"center"}}>"I can't say enough good things about Grand Restaurant . From the moment we walked in, we felt welcomed and cared for. The menu offers a fantastic variety, and everything we ordered was delicious. The steak was cooked to perfection, and the wine selection was impressive. Highly recommended!"</p>


            </div>
          </div>
        </section>

        <section className="call">
          <h2>Residence</h2>
          <p>King's parade ground, Nirmal road Agra Uttar Pradesh</p>
        <span><FaPhone/>+91 6789724531</span>  
          <p><MdEmail/>-gandresto900@gmail.com</p>
          <p>Having any query regarding our services contact us now</p>

          <Link to="/contact"><button className='btn btn-outline-warning'>Contact</button></Link>
        </section>

        <footer>
          <Footer/>
        </footer>





      </div>



    </>
  )
}
