import React from 'react'
import "../../App.css"
import prod from "../../assets/prod.png"
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { useadmin } from '../../context/admincontext';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends } from "react-icons/fa";
export default function Addproduct() {


    // const cat = document.querySelector("#cat")
    // console.log(cat);
    const navigate = useNavigate()
    const [image, setimage] = useState(null)
    const [product, setproduct] = useState({
        name: "",
        category: "Deserts",
        price: ""
    })

    const handleinput = (e) => {
        let value = e.target.value
        let name = e.target.name
        console.log(name);
        setproduct({ ...product, [name]: value })
        console.log(product);
    }
    const fetchimg = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("image", image)
        const result = await fetch("https://food-website-backend-3ij1.onrender.com/upload-image", {
            method: "POST",
            body: formdata,

        })
        if (result.ok) {
            toast.success("Product uploaded", {
                position: "top-center"
            });
        }
        console.log(result);
    }

    const filechange = (e) => {

        console.log(e.target.files);
        setimage(e.target.files[0])
    }

    const submitadd = async (e) => {
        // e.preventDefault()
        try {
            console.log(product);
            e.preventDefault()

            const response = await fetch("https://food-website-backend-3ij1.onrender.com/admin/addproducts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            })
            // setproduct(data)

            if (response.ok) {
                const data = await response.json()
                console.log(data);
                
                toast.success("Product added", {
                    position: "top-center"
                });
                navigate("/admin/getproducts")

            }

        } catch (error) {
            console.log(error);
        }



    }

    return (
        <div>
            <div className="admin">

                <div className="stripe">


                    <img style={{ width: "4%" }} src={prod} alt="" srcset="" />

                    <h2>Admin Dashboard</h2>
                    <Link class="btn btn-black" to="/admin"><FaHome size={30} /></Link>


                </div>
            </div>

            <section className='formlist'>

                <form onSubmit={submitadd} className='forms' action="">


                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Name</label>
                        <input autoComplete='off' onChange={handleinput} id="name" value={product.name} type="text" class="form-control" name='name' placeholder="Noodles" />
                    </div>
                    <div class="mb-3">
                        <label style={{ marginRight: "1rem", width: "100%" }} for="exampleFormControlInput1" class="form-label">Category</label>
                        <select onChange={handleinput} value={product.category} style={{ width: "18rem",padding:"0.4rem",borderRadius:"12px" }} name='category' id="cat">
                            {/* <option value="Sweets">Select...</option> */}

                            <option value="Deserts">Deserts</option>
                            <option value="Ice Cream">Ice Cream</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Soft drink">Soft drinks</option>
                            <option value="Special meal">Special meal</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">price</label>
                        <input autoComplete='off' onChange={handleinput} id="price" type="text" value={product.price} name='price' class="form-control" placeholder="500$" />
                    </div>

                    <form action="">

                        <div>
                            <input  style={{border:"none"}} type="file" id="imageFile" name="imageFile" onChange={filechange} />
                            <button className='btn btn-success' onClick={fetchimg}   >upload</button>
                        </div>

                    </form>

                    <button type='submit' className='btn btn-warning'>Submit</button>
                </form>

            </section>


            <ToastContainer />
         
        </div>
    )
}
