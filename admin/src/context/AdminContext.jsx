import { createContext,useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const AdminContext=createContext();

const AdminContextProvider = (props) => {
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
    const [therapists, setTherapists] = useState([])

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    
    const getAllTherapists = async() =>{
        try{

            const {data} = await axios.post(backendUrl + '/api/admin/all-therapist', {}, {headers: {token}})
            if(data.success) {
                setTherapists(data.therapists);
                console.log(data.therapists);
            } else{
                toast.error(data.message)
            }
        }   
        catch (error){
            toast.error(error.message)
        }
    }

    const changeAvailability = async (therapistId) => {

        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {therapistId}, {headers: {token}})
            if(data.success) {
                toast.success(data.message)
                getAllTherapists()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value={
        token,
        setToken, 
        backendUrl,
        therapists,
        getAllTherapists,
        changeAvailability
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;