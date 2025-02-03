import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createToken = (user)=>{
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    },process.env.SECRET_JWT )
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
        const token = createToken(newUser.rows[0])
        res.cookie("token",token)
        res.json({success: true})
        

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
        const token = createToken(user.rows[0])
        res.cookie("token",token)
        res.json({success: true})
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export const adminLogin = async(req,res)=>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Not Authorized" });
        }

        const token = createToken(user)

        // Set token in HTTP-only cookie
        res.cookie("token", token);

        res.json({ success: true});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }


}
