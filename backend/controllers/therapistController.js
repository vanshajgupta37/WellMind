import Therapist from '../models/TherapistModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Therapist
export const registerTherapist = async (req, res) => {
    const { name, email, password, profileData} = req.body;

    try {
        let therapist = await Therapist.findOne({email});
        if(therapist) return res.status(400).json({
            msg:"Therapist already exist"
        });
        //hashpassword
        const salt= await bcrypt.genSalt(10);
        const hashed_password=await bcrypt.hash(password,salt);
        therapist =new Therapist({
            name,email,password:hashed_password,profile: profileData
        });

        await therapist.save();
        res.status(201).json({ message: 'Therapist registered successfully, now wait for approval from admin' });

    }
    catch(error){
        res.status(400).json({ message: 'Registration failed', error });
    }
};

// Login Therapist
export const loginTherapist = async (req, res) => {
    const { email, password } = req.body;

    try {
        const therapist = await Therapist.findOne({ email });
        if (!therapist) return res.status(404).json({ message: 'Therapist not found' });

        const isMatch = await bcrypt.compare(password, therapist.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        //generating jwt
        const payload={
            therapist:{id: therapist._id, email:therapist.email }
        };
        const token=jwt.sign(payload,process.env.JWT_SECRET);
        res.json({token});
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
