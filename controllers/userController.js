import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_JWT )
}

export const registerUser = async(req,res)=>{
    const {name, email, password} = req.body;
    try{
      
        const exists= await db.query('SELECT * FROM users WHERE email=$1',[email])
      
        if(exists.rows.length>0){
           return res.json({success: false, message: 'User already exists'})
        }
        const salt = await bcrypt.genSalt(10)
       
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',[name, email, hashedPassword])
        const token = createToken(newUser.rows[0].id)
        res.json({success: true, token})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export const loginUser = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await db.query('SELECT * FROM users WHERE email=$1',[email])
        if(user.rows.length===0){
            return res.json({success: false, message: 'User does not exist'})
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if(!validPassword){
            return res.json({success: false, message: 'Invalid password'})
        }
        const token = createToken(user.rows[0].id)
        res.json({success: true, token})
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//Route for admin login
 export const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.SECRET_JWT);
            res.json({success:true,token})
        } else{
            res.json({success:false, message: "Invalid credentials"})
        }

    }catch(error){
        console.log(error);
        res.json({success: false, message:error.message})
    }

}
