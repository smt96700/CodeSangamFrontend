import { useState } from "react";
import {useLogin} from "../hooks/useLogin"
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';


function Login(){
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error}= useLogin();
    const handleSubmit= async (e)=>{
         e.preventDefault();
         await login(email, password);
    }
    //conditional styling for light, dark mode
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return(
        <form className={`login ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`} onSubmit={handleSubmit}> 
            <h1 id = "label" className = "flex flex-wrap justify-center text-3xl font-light">Login</h1>

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
             <button className = "my-5" disabled= {isLoading}>Login</button>
             {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;