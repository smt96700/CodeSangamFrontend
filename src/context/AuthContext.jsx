import { createContext, useEffect, useReducer } from "react";

export const AuthContext= createContext(); //creating context

export const AuthReducer= (state, action)=>{
      switch(action.type){
        case 'SIGNUP' : 
            console.log("sign up chala")
            const newUser = action.payload;
            return {user : newUser};
            
        case 'LOGIN':
            console.log("Login chla")
            const user= action.payload;
            return {user};

        case 'LOGOUT':
            return {user: null};

        
        default:
            return state;
      }
}

//function that provides value for context
export const AuthContextProvider= ({children})=>{
       const [state, dispatch]= useReducer(AuthReducer, {user:null});
       
       //check if the user data already exist in local storage
       useEffect(()=>{
           console.log("inside use effect");
           const user= JSON.parse(localStorage.getItem('user'));
        //    console.log(user);
           if(user){
            dispatch({type: "LOGIN", payload:user});
           }
       }, [])
       console.log('Authentication state: ', state);
       return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
       )
}