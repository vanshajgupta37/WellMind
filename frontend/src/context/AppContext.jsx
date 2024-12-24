import { createContext, useState , useEffect} from "react";
import { therapists } from "../assets/assets_frontend/assets";
export const AppContext = createContext();
import axios from 'axios'
import {toast} from 'react-toastify'



const AppContextProvider = (props ) => {

  const currencySymbol ='$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [therapists, setTherapists] = useState([])
  const [token, setToken] = useState('')

    

  const getTherapistsData = async () => {
    try{
      const {data} = await axios.get(backendUrl + '/api/therapist/list');
      if(data.success) {
        setTherapists(data.therapists)
      } else {
        toast.error(data.message)
      }

    } catch(error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value={
    therapists,
    currencySymbol,
    token,setToken,
    backendUrl
}

  useEffect(()=>{
    getTherapistsData();
  })
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;