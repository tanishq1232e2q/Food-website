

import { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { IoReload } from "react-icons/io5";
export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    
    let [product, setproduct] = useState([])
    const [allimage, setallimage] = useState(null)
    const [cartimg, setcartimg] = useState([])
    const [section, setsection] = useState(false)
    const [token, settoken] = useState(localStorage.getItem("token"))
    const [userauth, setuserauth] = useState()
    const [userid, setuserid] = useState()
    let [sum, setsum] = useState(0)
    const [img1, setimg1] = useState()
    let orders=JSON.parse(localStorage.getItem("finaluser"))
    const [order, setorder] = useState(orders)

    const [useradmin, setuseradmin] = useState()
   

    const [ok, setok] = useState(false)
    

    const [userimg, setuserimg] = useState(null)

    const authtoken=`Bearer ${token}`
    let initialcart=()=>{
        const cart=localStorage.getItem("cart")
        return cart ? JSON.parse(cart):"[]"
    }
    let [data, setdata] = useState(initialcart)


    let logout=!!token

    

    console.log(logout);
    console.log(data);
    
    let tr=JSON.parse(localStorage.getItem("finaluser"))
    console.log(tr.length);
    let [count, setcount] = useState(logout?tr.length:"0")
    const uniqueval=[...new Set(data)]
    const [images, setImages] = useState(localStorage.getItem("img"))


    const [img, setimg] = useState([])

    useEffect(() => {
        if (userimg) {
            const loadImages = async () => {
                const loadedImages = await Promise.all(
                    userimg.map(async data => {
                        const module = await import(`../images/${data.image}`);
                        return module.default;
                    })
                );
                setImages(loadedImages);
            };
            loadImages();
        }
    }, [userimg]);
    console.log(images);
    localStorage.setItem("img",images)
    const getproducts = async () => {
        const response = await fetch("https://food-website-backend-10zz.onrender.com/admin/getproducts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(product)
        })
        const data = await response.json()
        console.log(data);
        // console.log(data.category);
        setproduct(data)

    }

    const Logout=()=>{
        settoken("")
        localStorage.removeItem("token")
    }

    const storetoken=(token)=>{
        settoken(token)
        return localStorage.setItem("token",token)

    }

    const authuser=async()=>{
        try {
            const response=await fetch("https://food-website-backend-10zz.onrender.com/user/getuser",{
                method:"GET",
                headers:{
                    auth:authtoken
                }
            })
            const data=await response.json()
            
            console.log(data);f
            setuserauth(data.name)
            setuseradmin(data.Isadmin)
            setuserid(data._id)
            if (response.ok) {
                
            }
            

        } catch (error) {
            console.log(error);
        }
    }
    console.log(userid);


    const getimg = async () => {

        try {

            const result = await fetch("https://food-website-backend-10zz.onrender.com/get-image", {
                method: "GET"
            })
            const fi = await result.json()
            console.log(fi.data);
            setallimage(fi.data)
            console.log(fi);
        } catch (error) {
            console.log(error);
        }

    }
    const alluserimg = async () => {

        try {

            const result = await fetch("https://food-website-backend-10zz.onrender.com/get-userimg", {
                method: "GET"
            })
            const fall = await result.json()
            console.log(fall.data);
            setuserimg(fall.data)
            
        } catch (error) {
            console.log(error);
        }

    }
    const reload=()=>{
        window.location.reload()
    }

 


    
    const apifetch = async () => {
        const api = import("../api.json")
        const apidata = await api
        // console.log(apidata.default[0]["hero-section"]);
        const finaldata = apidata.default[0]["hero-section"]
        const commonimg = apidata.default[1]["common-images"]
        console.log(finaldata);
        setimg(finaldata)
        setimg1(commonimg)

    }
    apifetch()

    
    // console.log(img);

    useEffect(()=>{
        authuser()
        alluserimg()

        
       
    },[])

    

    


    
  


   
    





    return (
        <AdminContext.Provider value={{img1, useradmin,getproducts,reload, product, allimage,authuser,sum, getimg,storetoken,alluserimg,userimg,logout,Logout,userid,setuserid, setproduct,img,count,setcount,data,order,setdata,cartimg,setcartimg,section,setsection,userauth,ok,setok }}>
            {children}
        </AdminContext.Provider>

        
    )
}


export const useadmin = () => {
    return useContext(AdminContext)
}
