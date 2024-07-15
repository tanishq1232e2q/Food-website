import React from 'react'
import { useadmin } from '../../context/admincontext'
import { FaEdit } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import prod from "../../assets/prod.png"
import "../../App.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends } from "react-icons/fa";

export default function Adminproduct() {

    const { getproducts, product, allimage, getimg,setproduct } = useadmin()
    const [images, setImages] = useState(null)
    const cat = document.querySelector("#cat")
    const navigate = useNavigate()
    const [upproduct, setupproduct] = useState({
        name: "",
        category: cat,
        price: ""
    })
    const [prod, setprod] = useState("")
    const [imgid, setimgid] = useState("")

    const handleinput = (e) => {
        let value = e.target.value
        let name = e.target.name
        console.log(name);
        setupproduct({ ...upproduct, [name]: value })
        console.log(upproduct);
    }



    console.log(allimage);

    useEffect(() => {
        if (allimage) {
            const loadedImages = allimage.map(async data => {

                const module = await import(`../../images/${data.image}`);


                return module.default;

            });
            Promise.all(loadedImages).then(images => setImages(images));


        }



    }, [allimage]);

    const onupdate = async (e) => {
        e.preventDefault()

        try {
            console.log(product);
            // e.preventDefault()

            const response = await fetch(`http://localhost:8000/admin/updateproducts/${prod}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(upproduct)
            })

            // setproduct(data)

            if (response.ok) {
                const data = await response.json()
                console.log(data);
                setTimeout(() => {
                    
                    toast.warn("Product Deleted", {
                        position: "top-center"
                    });
                }, 3000);
                
                
                
            }
            window.location.reload()
            // navigate("/admin/products")

        } catch (error) {
            console.log(error);
        }



    }

    const handlefun = (id, prod) => {
        console.log(id);
        console.log(prod);
        setprod(prod)
        setupproduct({
            name: product[id].name,
            category: product[id].category,
            price: product[id].price
        })

    }
    const deleteimg = async (index) => {
        try {
            console.log(imgid);
            console.log(product);

            // e.preventDefault()
            const response = await fetch(`http://localhost:8000/delete-image/${allimage[index]._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify(upproduct)
            })


            // setproduct(data)

            if (response.ok) {
                const data = await response.json()
                console.log(data);


            }
            // navigate("/admin/products")

        } catch (error) {
            console.log(error);
        }
    }


    const handledelete = async (index, id) => {
        console.log(index);


        try {


            const response = await fetch(`http://localhost:8000/admin/deleteproducts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify(upproduct)
            })
            // setproduct(data)

            deleteimg(index)
            if (response.ok) {
                const data = await response.json()
                console.log(data);

                
                setproduct(pro=>pro.filter((elem,id)=>elem._id!==id))
                window.location.reload()
                



            }


        } catch (error) {
            console.log(error);
        }

    }



    useEffect(() => {
        getproducts()
        getimg()



    }, [])

    console.log(images);
    console.log(product);
    return (
        <div>
            <div className="admin">


                <div className="stripe">


                    <img style={{ width: "4%" }} src={prod} alt="" srcset="" />

                    <h2>Admin Dashboard</h2>
                    <Link class="btn btn-black" to="/admin"><FaHome size={30} /></Link>


                </div>
            </div>
            <section className='prod'>
                <div className='cen'>
                    <h3>Available Products</h3>
                    <button className='btn btn-success' style={{ marginBottom: "-1rem", color: "white" }}><Link style={{ textDecoration: "none", color: "white" }} to="/admin/addproducts">Add Products</Link></button>

                </div>

                <div className='tab'>
                    <table>
                        <tr style={{ fontWeight: 500 }}>
                            <td>img</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>

                        </tr>


                        {
                            product.length == 0 ? <><h5 style={{}}> Add your products here</h5></> : product.map((data, index) => {
                                return <>

                                    <tr >

                                        <td key={index}>

                                            <td>
                                                {images && images.length > index && images[index] ? (
                                                    <img style={{ height:"5.5rem" }} src={images[index]} alt="" />
                                                ) : (
                                                    "Image Loading..."
                                                )}
                                            </td>
                                        </td>
                                        <td>{data.name}</td>
                                        <td>{data.category}</td>
                                        <td>{data.price}</td>
                                        <td style={{ marginRight: "-13rem" }}> <button type="button" onClick={() => handlefun(index, data._id)} class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><FaEdit /></button></td>
                                        <td><button type="button" className='btn btn-danger' onClick={() => handledelete(index, data._id)} ><MdDelete /></button></td>


                                    </tr>
                                </>
                            })
                        }


                    </table>

                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Update Products</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={onupdate}>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Name</label>
                                        <input style={{border:"2px solid black"}} value={upproduct.name} onChange={handleinput} type="text" name='name' id="name" class="form-control" />
                                    </div>
                                    <div class="mb-3">
                                        <label style={{ marginRight: "1rem", width: "100%" }} for="message-text" class="col-form-label">Category</label>
                                        <select value={upproduct.category} style={{ width: "18rem",padding:"0.4rem",borderRadius:"12px" }} onChange={handleinput}  name='category' id="cat">
                                            {/* <option value="Sweets">Select...</option> */}
                                            <option value="Deserts">Deserts</option>
                                            <option value="Ice Cream">Ice Cream</option>
                                            <option value="Fast Food">Fast Food</option>
                                            <option value="Soft drink">Soft drinks</option>
                                            <option value="Special meal">Special meal</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Price</label>
                                        <input style={{border:"2px solid black"}} value={upproduct.price} onChange={handleinput} type="text" name='price' id="price" class="form-control" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <ToastContainer />
           

        </div>
    )
}
