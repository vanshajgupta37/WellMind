import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'

import TherapistModel from '../models/TherapistModel.js'
//API
const addTherapist= async(req,res)=>{
    try{
        const {name, email, password, speciality, degree, experience, about,  fees, address}=req.body;
        const imageFile=req.file
        //checking for all data to add doctor
        if(!name || !email || !speciality || !degree || !experience || !about || !fees || !address){
            return res.status(400).json({success:false,message:"All fields are required"})

        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Enter a valid email"})
        }
        //validating password
        if(password.length<8){
            return res.status(400).json({success:false,message:"Password should be atleast 8 characters"})
        }
        
        //hashing password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //uploading image to cloudinary
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})

        const imageUrl=imageUpload.secure_url;

        const therapistData={
            name,
            email,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            image:imageUrl,
            date:Date.now()
        }

        const newTherapist=new TherapistModel(therapistData);
        await newTherapist.save();
        res.status(201).json({success:true,message:"Therapist added successfully"})

    }
    catch(error){
        console.log("Error in addTherapist: ",error);
        res.status(500).json({success:false,message:error.message})
    }
}

//API for admin Login



export {addTherapist}