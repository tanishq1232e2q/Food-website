import React from 'react'
import { useadmin } from '../context/admincontext'
import "../App.css"
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
export default function Login(props) {

    const { img, section, setsection,storetoken } = useadmin()
    const [user, setuser] = useState({

        email: "",
        password: "",

    })

    const handlechange = (e) => {

        console.log(e.target.value);
        let value = e.target.value
        let name = e.target.name
        setuser({ ...user, [name]: value })
        console.log(user);

    }

    const loginsubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:8000/user/loginuser", {
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


            toast.success("User logged in", {
                position: "top-center"
            });
            setTimeout(() => {

                window.location.reload()
            }, 3000);
        


        }
        else {
            toast.error("Invalid Credentials", {
                position: "top-center"
            });
        }

    }
    const setz = () => {
        setsection(false)
    }

    

    return (
        <div className="main">
            <div className='imgs'>
                <img src={img.url7} alt="" srcset="" />
            </div>
            <div className='vb'>
                <h2 style={{ marginBottom: "-1.4rem" }}>Log In</h2>
                <form onSubmit={loginsubmit} action='' className='login'>

                    <div>
                        <label htmlFor="">Email</label>
                        <input onChange={handlechange} type="email" value={user.email} name='email' required={true} placeholder='enter your email' />

                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input onChange={handlechange} type="text" value={user.password} name='password' placeholder='enter your password' required={true} />

                    </div>


                    <button className='btn btn-info' type='submit'>Submit</button>
                    <div className='jk' >
                        <span>&#128526;</span> <span>New User...</span>
                        <button className='btn btn-dark' onClick={() => setz(props.section)}>Signup </button>
                    </div>
                </form>


            </div>
            <ToastContainer />

        </div>
    )
}
