import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedTherapists from '../components/RelatedTherapists';

const Appointment = () => {
  const { therapistId } = useParams();
  const { therapists, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [therapistInfo, setTherapistInfo] = useState(null);
  const [Slots, setSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  const fetchTherapistInfo = async () => {
    const therapistInfo = therapists.find(therapist => therapist._id === therapistId);
    setTherapistInfo(therapistInfo);
  };

  const getAvailableSlots = async () => {
    setSlots([])

    //getting current date
    let today = new Date()

    for(let i=0;i<7;i++){
      // getting day with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      // setting hours
      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      
      let timeSlots = []


      while(currentDate < endTime ){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        // add slot to array 
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setSlots(prev => ([...prev, timeSlots]))
    }
  }


  useEffect(() => {
    fetchTherapistInfo();
  }, [therapists, therapistId]);

  useEffect(()=>{
    getAvailableSlots() 
  }, [therapistInfo])


  useEffect(()=>{
    console.log(Slots)
  }, [Slots])


  return therapistInfo && (
    <div>
      {/* ------Therapist Details------- */}
      <div className='flex felx-col sm:flex-rpw gap-4'>
        <div>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={therapistInfo.image} alt="Therapist" />
        </div>


        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ----- Therapist Info : name, degree, experience ------ */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900' >
            {therapistInfo.name} 
            <img className='w-5' src={assets.verified_icon}/>
            </p>
          <div>
            <p className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              {therapistInfo.degree} - {therapistInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full' >
              {therapistInfo.experience}
              </button>
          </div>

          {/* ----About----- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt=""/>
              </p>
            <p className='text-sm text-gray-500 max-w-[-700px] mt-1'>
              {therapistInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4' >
            Appointment fee: <span className='text-gray-600' >{currencySymbol}</span><span>{therapistInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700' >
        <p>Booking Slots</p>
       
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4' >
          {
            
            Slots.length && Slots.map((item, index)=>(
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4' >
          {Slots.length && Slots[slotIndex].map((item, index) => (
            <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border-gray-300'}`} key = {index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>
      {/* Listing Related Therapists */}
      <RelatedTherapists therapistId={therapistId} speciality={therapistInfo.speciality}></RelatedTherapists>
    </div>

  );
};

export default Appointment;