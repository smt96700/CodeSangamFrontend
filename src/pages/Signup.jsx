import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import { useSignup } from "../hooks/userSignup";
import TextField from '@mui/material/TextField';

const Signup=()=>{
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const {signup, isLoading, error}= useSignup();

    //handler function
    const handleSubmit= async (e)=>{
         e.preventDefault();
        //  console.log(email, password);
        await signup(email, password);
    }

    //conditional styling for light, dark mode
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return(
        <form className={`signup ${isDarkMode ? 'dark:bg-zinc-700' : 'bg-white'}`} onSubmit={handleSubmit}> 
            <h1 id = "label" className = "flex flex-wrap justify-center text-3xl font-light">SignUp</h1>

            <TextField 
                className = "w-full"
                id="outlined-basic" 
                label="Email" 
                variant="outlined"
                type="email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                size="small"
            />
            <br></br>
            <br></br>
            <TextField 
                className = "w-full"
                id="outlined-basic" 
                label="Password" 
                variant="outlined"
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                size="small"
            />
            <br></br>
            <br></br>
             <button className = "my-5" disabled={isLoading}>Sign up</button>
             {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup;