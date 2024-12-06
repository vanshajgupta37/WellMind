import { createContext } from "react";

export const TherapistContext=createContext();

const TherapistContextProvider = (props) => {
    const value={

    }
    return(
        <TherapistContext.Provider value={value}>
            {props.children}
        </TherapistContext.Provider>
    )
}
export default TherapistContextProvider;