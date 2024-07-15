const adminmiddle=(req,res,next)=>{


    try {
        
        const userbody=req.user.Isadmin
    
        if (!userbody) {
            return res.json("user is not admin ")
            
        }
        else{

            next()
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports=adminmiddle