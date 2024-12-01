import Client from '../models/ClientModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Client
export const registerClient = async (req, res) => {
    const { name, email, password, profileData} = req.body;

    try {
        let client = await Client.findOne({email});
        if(client) return res.status(400).json({
            msg:"Client already exist"
        });
        //hashpassword
        const salt= await bcrypt.genSalt(10);
        const hashed_password=await bcrypt.hash(password,salt);
        client =new Client({
            name,email,password:hashed_password,profile: profileData
        });

        await client.save();
        res.status(201).json({ message: 'Client registered successfully' });

    }
    catch(error){
        res.status(400).json({ message: 'Registration failed', error });
    }
};

// Login Client
export const loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ email });
        if (!client) return res.status(404).json({ message: 'Client not found' });

        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        //generating jwt
        const payload={
            client:{id: client._id, email:client.email }
        };
        const token=jwt.sign(payload,process.env.JWT_SECRET);
        res.json({token});
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
