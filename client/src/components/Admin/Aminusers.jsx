import React, { useEffect } from 'react'
import { FaHome, FaUserFriends } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../../App.css'
import user from "../../assets/user.png"

export default function Aminusers() {

    const [uadmin, setuadmin] = useState([])


    const [yesadmin, setyesadmin] = useState([])
    const [noadmin, setnoadmin] = useState([])
    const [yesid, setyesid] = useState("")

    const [isadmin, setisadmin] = useState()
    

    const getuseradmin = async (index) => {
        try {


            // e.preventDefault()
            const response = await fetch(`http://localhost:8000/admin/users`, {
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
                setuadmin(data)


            }
            // navigate("/admin/products")

        } catch (error) {
            console.log(error);
        }
    }

    const deluser = async (id) => {
        try {


            // e.preventDefault()
            const response = await fetch(`http://localhost:8000/admin/delusers/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify(upproduct)
            })


            if (response.ok) {
                toast.success("User deleted successfully!");
                setuadmin(prev => prev.filter(user => user._id !== id));
            } else {
                toast.error("Failed to delete user!");
            }
            // navigate("/admin/products")

        } catch (error) {
            console.log(error);
        }
    }

    const getuser = async (id,admin,email,name) => {
        setisadmin(admin)
        let okadmin = {

            Isadmin: true,
            email: email,
            name: name,

        }
        let noadmins = {

            Isadmin: false,
            email: email,
            name: name,

        }
        // setisadmin(okadmin.Isadmin)

        
        console.log(okadmin);
        setyesadmin(okadmin)
        setnoadmin(noadmins)
        setyesid(id)
        console.log(id);
        console.log(isadmin);

      
        
    }
    console.log(yesid);
    const updateuser=async(yesid)=>{
        try {

            console.log(yesid);
            console.log(isadmin);


            // e.preventDefault()
            const response = await fetch(`http://localhost:8000/admin/upusers/${yesid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(isadmin?noadmin:yesadmin)
            })


            // setproduct(data)

            if (response.ok) {
                const data = await response.json()
                console.log(data);
                window.location.reload()
                


            }
            // navigate("/admin/products")

        } catch (error) {
            console.log(error);
        }
    }

    console.log(yesadmin);

    useEffect(() => {
        getuseradmin()
    }, [])
    return (
        <div>
            <div className="admin">


                <div className="stripe">


                    
                    <img style={{width:"4%"}} src={user} alt="" />

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
                            <td style={{ width: "18rem" }}>Admin Status</td>
                            <td>Remove</td>

                        </tr>
                        



                        {
                            uadmin.map((data, index) => {
                                return <>

                                    <tr >


                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        

                                        <td>{String(data.Isadmin)}<span ><button type="button" class="btn btn-primary" onClick={() => getuser(data._id,data.Isadmin, data.email, data.name)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            <FaEdit />
                                        </button>
                                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            {
                                                                isadmin?"Want to remove this user from admin?":"Want to make this user as Admin?"
                                                            }
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" onClick={()=>updateuser(yesid)}  class="btn btn-primary">Yes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </span></td>
                                        <td  onClick={() => deluser(data._id)}><MdDelete size={33} /></td>




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
