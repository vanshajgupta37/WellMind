import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
const Therapists = () => {
  const {speciality}=useParams();
  const {therapists}=useContext(AppContext);
  const[filterDoc,setFilterDoc]=useState([]);
  const [showFilter, setShowFilter] = useState(false)

  const navigate=useNavigate();
  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(therapists.filter((item)=>item.speciality===speciality));
    }
    else{
      setFilterDoc(therapists);
    }
  }
  
  useEffect(()=>{
    applyFilter();
  },[therapists,speciality])


  return (
    <div>
        <p className='text-gray-600'>Browse through the Therapists Specialist.</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=> setShowFilter(prev => !prev )}>Filters</button>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p onClick={()=>speciality==='General physician'?navigate('/therapists') : navigate('/therapists/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General physician"?"bg-indigo-100 text-black ": ""}`}>General physician</p>




            <p onClick={()=>speciality==='Gynecologist'?navigate('/therapists') : navigate('/therapists/Gynecologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist"?"bg-indigo-100 text-black ": ""}`}>Gynecologist</p>


            <p onClick={()=>speciality==='Dermatologist'?navigate('/therapists') : navigate('/therapists/Dermatologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-100 text-black ": ""}`}>Dermatologist</p>


            <p onClick={()=>speciality==='Pediatricians'?navigate('/therapists') : navigate('/therapists/Pediatricians')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-100 text-black ": ""}`}>Pediatricians</p>


            <p onClick={()=>speciality==='Neurologist'?navigate('/therapists') : navigate('/therapists/Neurologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist"?"bg-indigo-100 text-black ": ""}`}>Neurologist</p>


            <p onClick={()=>speciality==='Gastroenterologist'?navigate('/therapists') : navigate('/therapists/Gastroenterologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black ": ""}`}>Gastroenterologist</p>

          </div>
          <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
              {
                filterDoc.map((item,index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='bg-blue-50 ' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500 '>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>
                                {item.name}
                            </p>
                            <p className='text-gray-600 text-sm '>{item.speciality}</p>
                        </div>
                    </div>
                ))
              }
          </div>
        </div>
    </div>
  )
}

export default Therapists