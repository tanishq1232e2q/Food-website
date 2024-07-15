import React from 'react'
import { useadmin } from '../context/admincontext'
import "../App.css"
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

// or via CommonJS

export default function Signup(props) {
    const { img, section, setsection, storetoken } = useadmin()
    const navi = useNavigate()
    const [ima, setima] = useState(null)
    const [image, setimage] = useState(null)

    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const handlechange = (e) => {
        console.log(e.target.value);
        let value = e.target.value
        let name = e.target.name
        setuser({ ...user, [name]: value })
        console.log(user);

    }



    const signupform = async (e) => {
        e.preventDefault()


        const response = await fetch("http://localhost:8000/user/adduser", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"

            },
            body: JSON.stringify(user)
        }

        );
        if (response.ok) {
            const data = await response.json()
            console.log(data);
            storetoken(data.token)
            toast.success("User created", {
                position: "top-center"
            });

            setTimeout(() => {
                // navi("/")
                window.location.reload()

            }, 2000);

        }
        else if (user.password !== user.cpassword) {
            Swal.fire({
                icon: "error",

                text: "Password does not match",

            });
        }

        else {
            Swal.fire({
                icon: "error",

                text: "User already exist",

            });

        }

    }
    const setsec = (s) => {
        setsection(true)

    }

  

    return (
        <>
            <div className="main">


                <div className='imgs'>
                    <img src={img.url7} alt="" srcset="" />
                </div>
                <div className='vb'>
                    <h2 style={{ marginBottom: "-1.4rem" }}>Registeration/Signup</h2>
                    <form onSubmit={signupform} action='' className='signup'>
                        <div>
                            <label htmlFor="">Name</label>
                            <input onChange={handlechange} type="text" name='name' value={user.name} required={true} placeholder='enter your name' />

                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                            <input onChange={handlechange} type="email" name='email' value={user.email} required={true} placeholder='enter your email' />

                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <input onChange={handlechange} type="text" name='password' value={user.password} placeholder='enter your password' required={true} />

                        </div>
                        <div>
                            <label htmlFor="">Confirm Password</label>
                            <input onChange={handlechange} type="text" name='cpassword' required={true} value={user.cpassword} placeholder='enter your confirm password' />

                        </div>
                       



                        <button className='btn btn-info' type='submit'>Submit</button>
                        <div className='jk' >
                            <span>&#129300;</span><span>Already registered...</span>
                            <button className='btn btn-dark' onClick={() => setsec(props.section)}>Login </button>
                        </div>
                    </form>


                </div>
                <ToastContainer />
            </div>


        </>
    )
}
