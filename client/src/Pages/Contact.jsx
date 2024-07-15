import React from 'react'
import Navbar from '../components/Navbar'
import { useadmin } from '../context/admincontext'
import { useEffect } from 'react'
import { useState } from 'react'
import "../App.css"
import Swal from 'sweetalert2'
import Footer from '../components/Footer'
export default function Contact() {
    const { img, getproducts, product, setproduct,img1 } = useadmin()

    const [contact, setcontact] = useState({
        name:"",
        email:"",
        area:""
    })

    const onchange=(e)=>{
        let name=e.target.name
        let value=e.target.value
        setcontact({...contact,[name]:value})
        console.log(contact);
    }


    const submitform=async(e)=>{
        e.preventDefault()
        const response=await fetch("https://food-website-backend-10zz.onrender.com/user/contact",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(contact)
        })

        if (response.ok) {
            Swal.fire({
                icon: "success",

                text: "Message send",

            });
            setcontact({
                name:"",
                email:"",
                area:""
            })
        }
        else{
            Swal.fire({
                icon: "error",

                text: "Please fill details properly",

            });
        }

    }
   
    return (
        <div>
            <div>
                <Navbar name="Contact us" tag="Ask you queries here" url1={img.url10} url2={img.url3} url3={img.url1} url4={img.url4} />

            </div>
                <h1 style={{textAlign:"center"}}>Contact us</h1>
            <div className='contacts'>
                <div>
                    {/* <img src={img1.img17} alt="" srcset="" /> */}
                </div>
                <form onSubmit={submitform} className='box'>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input required type="text" onChange={onchange} value={contact.name} name="name" id="name"class="form-control" placeholder="Rahul" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input required type="email"value={contact.email}  onChange={onchange}name='email' id="email" class="form-control" placeholder="name@example.com" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                        <textarea required class="form-control" id="area" onChange={onchange} value={contact.area} name='area'  rows="3"></textarea>
                    </div>
                    <button type='submit' className='btn btn-success'>Send Message</button>
                </form>


            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}
