import React from 'react'
import "../App.css"
import { useState, useEffect } from 'react';
import { useadmin } from '../context/admincontext';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import Counter from './Counter';

export default function Menustyle(props) {
    // const { items } = props


    let { allimage, getimg, product, setproduct, count, setcount, setdata, data, cartimg, setcartimg, userid, authuser,logout,userauth } = useadmin()

    const [images, setImages] = useState([])
    const [quant, setquant] = useState(1)
    // let [count, setcount] = useState(0)
    const [clicked, setClicked] = useState(false)

    const [cat, setCat] = useState("Fast Food")
    const [sortOrder, setSortOrder] = useState("lowest");
    const [uniquecart, setuniquecart] = useState([])


    const [pricerange, setpricerange] = useState()
    useEffect(() => {
        if (allimage) {
            const loadedImages = allimage.map(async data => {

                const module = await import(`../images/${data.image}`);


                return module.default;

            });
            Promise.all(loadedImages).then(images => setImages(images));


        }



    }, [allimage]);









    const sorting = () => {
        let sortdata = document.getElementById("sort");
        let datasort = sortdata.options[sortdata.selectedIndex].value;
        console.log("Sorting order:", datasort);
        setSortOrder(datasort);
        let sortedProducts = [...product];
        if (datasort === "lowest") {
            sortedProducts.sort((a, b) => {
                // Remove special characters and convert to number
                const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
                const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
                return priceA - priceB;
            });
        } else {
            sortedProducts.sort((a, b) => {
                // Remove special characters and convert to number
                const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
                const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
                return priceB - priceA;
            });
        }
        const filteredImages = sortedProducts.map((filteredItem) => {
            const index = product.findIndex((item) => item === filteredItem);
            return images[index];
        });

        setImages(filteredImages);

        console.log("Sorted products:", sortedProducts);
        setproduct(sortedProducts);
    };




    const getuniquedata = (data, property) => {
        let newvalue = data.map((elem) => {
            return elem[property]
        })
        return (newvalue = [...new Set(newvalue)])


    }

    const categorydata = getuniquedata(product, "category")
    console.log(categorydata);





    console.log(userid);

    const setclick = (elem) => {
        // Filter products based on the selected category
        const filteredProducts = elem === "All" ? product : product.filter(item => item.category === elem);


        setproduct(filteredProducts);


        const filteredImages = elem === "All" ? images : filteredProducts.map(filteredItem => {
            const index = product.findIndex(item => item === filteredItem);
            return images[index];
        });
        setImages(filteredImages);
        setCat(elem);
    };

    const setbut = () => {
        window.location.reload()

    }

    //price range filter

    const handleprice = (e) => {
        console.log(e.target.value);
        const range = parseFloat(e.target.value)
        setpricerange(range)


        const filterrange = product.filter((elem) => {
            const fg = parseFloat(elem.price.replace(/[^0-9.-]+/g, ""))
            console.log(fg);



            return fg <= range
        })
        setproduct(filterrange)



        const filteredImages = filterrange.map(filteredItem => {
            const index = product.findIndex(item => item === filteredItem);
            return images[index];
        });
        setImages(filteredImages);



    }
    const btnref = useRef()
    let getquant = JSON.parse(localStorage.getItem("val"))
    console.log(getquant);

    const handlecart = (index, id) => {
        // e.preventDefault()
        // setClicked(true)


        console.log(index);
        const proddata = product[index]
        const imgdata = images[index]
        let getdata = getquant[id]
        let userId = userid
        let username=userauth
        console.log(getdata);
        console.log(imgdata);

        setdata([...data, { ...proddata, image: imgdata, getdata: getdata, userId: userId,userauth:username }])
        const unique = [...new Set(data)]
        console.log(unique);
        console.log(data);
        count = count + 1
        setcount(count)
        console.log(count);
        const filteredImages = data.map(filteredItem => {
            const index = product.findIndex(item => item === filteredItem);
            return images[index];
        });
        setcartimg(filteredImages);



        console.log(cartimg);

    }

    const increment = (id) => {
        console.log(id);
        setquant(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
        console.log(quant[id]);
        localStorage.setItem("val", JSON.stringify(quant))
        console.log(getquant[id]);
    }




    const decrement = (id) => {
        if (quant[id] > 0) {
            setquant(prev => ({
                ...prev,
                [id]: prev[id] - 1
            }));
        }
        localStorage.setItem("val", JSON.stringify(quant))


    };



    useEffect(() => {
        // filterimg()
        authuser()

        getimg()
    }, [])





    console.log(images);
    console.log(cat);
    console.log(product);
    console.log(allimage);
    console.log(pricerange);
   

    return (
        <div className='container bvs'>
            <div className='filter'>
                <div style={{margin:"1rem"}} className="layout">
                    <form action="">
                        <h3 style={{ marginBottom: "-2rem", marginTop: "2rem" }}>Sorting</h3>
                        <select onClick={sorting} name="sort" id="sort">

                            <option className='bn' value="lowest">Price(Lowest)</option>
                            <option className='bn' value="highest">Price(Highest)</option>
                        </select>
                    </form>

                </div>
                <div className="cate">
                    <h3>Categories</h3>
                    <div id='butcontainer' style={{ width: "100%" }}>
                        <button onClick={setbut} style={{ width: "8rem", height: "3rem", backgroundColor: "white", border: "1px solid black", borderRadius: "8px", marginBottom: "1rem" }} type="button">All</button>
                        {
                            categorydata.map((elem, index) => {
                                return <>
                                    <button type="button" className={elem == "Fast Food" ? "btn btn-primary" : elem == "Deserts" ? "btn btn-danger" : elem == "Special meal" ? "btn btn-secondary" : elem == "Ice Cream" ? "btn btn-success" : elem == "Soft drink" ? "btn btn-warning" : "btn btn-info"} value={elem} name='category' key={index} onClick={() => setclick(elem)}>{elem}</button>
                                </>
                            })
                        }
                    </div>
                </div>
                <div className='prices'>
                    <h3>Price Range</h3>
                    <input type="range" min="0" step={10} max="300" onChange={handleprice} value={pricerange} />
                    <div>Price Range: ${pricerange}</div>
                </div>
            </div>
            <div className='row' >
                {product.length > 0 && product.map((item, index) => (
                    <div key={index} id={images.length == 2 ? `mysin` : images.length == 1 ? `myjk` : "myimg"} className='col-md-3'>
                        <div key={index} className="card">
                            <div>
                                {images && images.length > index && images[index] ? (
                                    <img className='myimg-1' src={images[index]} alt="" />
                                ) : (
                                    "Image Loading..."
                                )}

                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Category: {item.category}</p>
                                <p className="card-text">Price: {item.price}</p>
                                <p><Counter quant={getquant[item._id]} increment={() => increment(item._id)} decrement={() => decrement(item._id)} /></p>


                                <Link to="/cart"><button  onClick={() => handlecart(index, item._id)} disabled={!logout} className="cartbut btn btn-success">Add to cart</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </div >
    );
}

