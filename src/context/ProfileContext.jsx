import { createContext, useEffect, useReducer } from "react";

export const ProfileContext = createContext();

export const ProfileReducer = (state, action) => {
    switch(action.type) {
        case 'PROFILEADDED' :
            console.log("inside profile added")
            console.log(action.payload)
            return {isFilledUserProfile : true, profileInfo : action.payload}

        default :
            return state
    }
}

export const ProfileContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ProfileReducer, {isFilledUserProfile : false, profileInfo : null})

    // useEffect (() => {
         
    // }, [])
    
    return (
        <ProfileContext.Provider value={{...state, dispatch}}>
            {children}
        </ProfileContext.Provider>
    )
}