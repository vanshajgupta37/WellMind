import TherapistModel from "../models/TherapistModel.js";

const changeAvailability = async (req, res) => {
    try {
        const {therapistId} = req.body;

        const therapistData = await TherapistModel.findById(therapistId)
        await TherapistModel.findByIdAndUpdate(therapistId, {available: !therapistData.available})
        res.json({success: true, message: 'Availability Changed'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const therapistList = async (req, res) => {
    try{

        const therapists = await TherapistModel.find({}).select(['-password', '-email'])

        res.json({success:true, therapists})

    } catch(error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {changeAvailability, therapistList}