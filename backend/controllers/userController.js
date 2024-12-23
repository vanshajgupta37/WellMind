import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// API to register user

const registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            res.json({success: false, message: "Incomplete Details"})
        }

        if(!validator.isEmail(email)) {
            res.json({success: false, message: "Invalid Email"})
        }

        if(password.length<8) {
            res.json({success: false, message: "Enter a strong Password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash( password, salt);
        
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET )

        res.json({success:true, token})

    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

//api for user login
const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            res.json({success: false, message: "Incomplete Details"})
        }

        if(!validator.isEmail(email)) {
            res.json({success: false, message: "Invalid Email"})
        }

        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.json({success: false, message: "Invalid Password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET )

        return res.json({success:true, token})

    }
    catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {registerUser,loginUser}