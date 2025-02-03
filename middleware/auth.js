
import jwt from 'jsonwebtoken';

const checkAuth = (req,res,next)=>{
    const authorizationHeader = req.cookies.token
    if(!authorizationHeader) {
        return res.json({success:false,messsage: 'Not Authorized Login Again'})
    }
    try {
        const user = getUser(authorizationHeader)
        if(!user) {
            return res.json({success:false,messsage: 'Not Authorized Login Again'})
        }
        req.user = user
        next()
    } catch (error) {
        res.json({success:false, error: error})
    }
}

const getUser = (token)=>{
    if(!token) return null
    return jwt.verify(token, process.env.SECRET_JWT)
}

export default checkAuth