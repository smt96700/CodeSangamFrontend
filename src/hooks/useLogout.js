// import getSocketInstance from '../socket';
import {useAuthContext} from './useAuthContext'
import {useWorkoutsContext} from './useWorkoutsContext'
import { useNavigate } from 'react-router-dom';
export const useLogout= ()=>{
      const {user, dispatch}= useAuthContext();
      const email= user && user.email;
      const navigate= useNavigate();
      const {dispatch:workoutDispatch}= useWorkoutsContext(); //to use dispatch as other reference name
    //   const socket= getSocketInstance();
    const logout= async ()=>{
        //remove user from local stroage
        localStorage.removeItem('user');
        
        //dispatch logout action
        dispatch({type: 'LOGOUT'}); //payload is not needed in logout as we set user null
        workoutDispatch({type: 'SET_WORKOUTS', payload: null});
        console.log("inside logout");
       
        // navigate('/login')
        try {
            // Send a request to update the connected field on the server
            const response = await fetch('http://localhost:4000/api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });
    
            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                // Handle the error, e.g., show a message to the user
                throw new Error('Failed to update connected field on the server');
            }
            // socket.emit("disconnecting", {});
            // Navigate to the login page
            navigate('/login');
        } catch (error) {
            // Handle any errors that occurred during the fetch or processing
            console.error('Error during logout:', error);
        }
    }
    return {logout};
}