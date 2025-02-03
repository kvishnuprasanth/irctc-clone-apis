import jwt from "jsonwebtoken"
const onlyAdmin = (req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const user = getUser(token)
        if(!user) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        if(user.role !== "admin"){
            return res.json({ success: false, message: "Forbidden: Admin access required" })
        }
        req.user = user
        next()
    } catch (error) {
        return res.json({ success: false, message: "Invalid or expired token" });
    }
}
const getUser = (token)=>{
    if(!token) return null
    return jwt.verify(token, process.env.SECRET_JWT)
}

export default onlyAdmin;