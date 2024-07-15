import React, { useEffect } from 'react'
import { FaHome, FaUserFriends } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../../App.css'
import conatct from "../../assets/contact.png"

export default function Admincontacts() {

    const [ucontact, setucontact] = useState([])


    
    

    const getuserconatct = async (index) => {
        try {


            // e.preventDefault()
            const response = await fetch(`http://localhost:8000/admin/getcontacts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify(upproduct)
            })


            // setproduct(data)

            if (response.ok) {
                const data = await response.json()
                console.log(data);
                setucontact(data)
                


            }
            

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        getuserconatct()
    },[])

   
           
        
    
  

    
    return (
        <div>
            <div className="admin">


                <div className="stripe">


                    <img style={{ width: "4%" }} src={conatct} alt="" srcset="" />

                    <h2>Admin Dashboard</h2>
                    <Link class="btn btn-black" to="/admin"><FaHome size={30} /></Link>


                </div>
            </div>
            <section style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"2rem",padding:"2rem"}} className='prod'>


                <div  className='tab'>
                    <table>
                        <tr style={{ fontWeight: 500 }}>
                        

                            <td style={{ width: "15rem" }}>Name</td>

                            <td style={{ width: "19rem" }}>Email</td>
                            <td style={{ width: "18rem" }}>Message</td>
                            

                        </tr>
                       
                        



                        {
                            ucontact.map((data, index) => {
                                return <>

                                    <tr  >
                                       

                                        <td >{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.area}</td>
  

                                    </tr>

                                </>
                            })
                        }




                    </table>

                </div>

            </section>


        </div>
    )
}
