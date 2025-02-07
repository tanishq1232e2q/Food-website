import React from 'react'
import Navbar from '../components/Navbar'
import { useadmin } from '../context/admincontext'
import { useEffect } from 'react'
import { useState } from 'react'
import Menustyle from '../components/Menustyle'
import Footer from '../components/Footer'
export default function Menu() {
    const { img,getproducts,product,setproduct } = useadmin()

    useEffect(() => {
      getproducts()
    
     
    }, [])
    
  return (
    <>
    <div>
      <Navbar name="Menus" tag="Our exciting meals" url1={img.url5} url2={img.url6} url3={img.url1} url4={img.url4} />
    </div>
    <div>
        <section className='menu'>

            <div className="cat-filter">

            </div>
            <div className="items">
                <div>
                <Menustyle  />
                </div>
            </div>
        </section>
    </div>
    <footer>
      <Footer/>
    </footer>
    
    </>
  )
}
