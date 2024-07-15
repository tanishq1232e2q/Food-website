import React from 'react'
import "../App.css"
import Navbar from '../components/Navbar'
import { useadmin } from '../context/admincontext'
import { useEffect } from 'react'
import { useState } from 'react'
import Footer from '../components/Footer'

export default function About() {
    const { img, getproducts, product, setproduct } = useadmin()
    useEffect(() => {
        getproducts()


    }, [])
    return (
        <div>
            <div>
                <div>
                    <Navbar name="About us" tag="" url1={img.url11} url2={img.url6} url3={img.url1} url4={img.url4} />

                </div>
                <h1 style={{textAlign:"center"}}>About us</h1>
                <div className=' zx'>
                    <p>Welcome to Grand Restaurant, where culinary excellence meets warm hospitality. Nestled in the heart of Agra, our restaurant is a celebration of fine dining, crafted with passion and inspired by diverse flavors from around the world.

                        At Grand Restaurant, we believe that dining is more than just a meal; it's an experience. Our chefs meticulously select the freshest ingredients to create dishes that are both innovative and comforting. Each plate is a work of art, reflecting our commitment to quality and creativity.

                        Our journey began with a simple vision: to create a place where friends and family can come together to enjoy exceptional food in a welcoming atmosphere. Whether you’re here for a casual lunch, a romantic dinner, or a special celebration, we strive to make every visit memorable.</p>
                    <p>We are proud to support local farmers and producers, incorporating sustainable and organic ingredients whenever possible. Our menu changes seasonally to highlight the best of what each season has to offer, ensuring a fresh and dynamic dining experience every time you visit.

                        </p>
                        <p>Thank you for choosing Grand Restaurant. We look forward to welcoming you and sharing our passion for great food and exceptional service.</p>

                </div>
            </div>
            <footer>
                <Footer/>
            </footer>

            

        </div>
    )
}
