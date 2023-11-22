import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

//user
import { useAuthContext } from './hooks/useAuthContext'
import { useProfileContext } from './hooks/useProfileContext'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfile from './pages/UserProfile'
import Profile from './pages/Profile'
import Friends from './components/Friends'

function App() {
  const {user} = useAuthContext();
  // const userLocal= localStorage.getItem('user');
  //  const parsedUserLocal=  userLocal ? JSON.parse(userLocal) : userLocal;
  
  // console.log("inside app userLocal", userLocal.isFilledUserProfile);
  const {isFilledUserProfile} = useProfileContext();
  console.log(user, "inside app");


  const [darkMode, setDarkMode] = useState(false)

  const lightTheme = createTheme( {
    palette: {
      background: {
        default: '#f1f1f1',
      },
    },
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#2E3030',
      },

    },
  });

  return (
    <ThemeProvider theme={darkMode? darkTheme : lightTheme }>
      <CssBaseline />
      
    <div className="App">
      <BrowserRouter>
        <Navbar change = {darkMode} setChange = {() => setDarkMode(!darkMode)}/>
        <div className="pages">
          <Routes>
            <Route
              path = "/home"
              element = {!user ? <Navigate to = '/login'/> : <Home/>}
            />

            <Route 
              path="/"
              element={(user && user.isFilledUserProfile) ? <Home /> : (user ? <Navigate to = '/userProfile'/>  : <Navigate to='/login' />)}
            />

            <Route
              path= "/login"
              element={(!user ? <Login /> : (!user.isFilledUserProfile ?  <Navigate to= '/userProfile' /> : <Navigate to = '/home'/>))}
            /> 

            <Route
              path= "/signup"
              element={!user ? <Signup /> : <Navigate to= '/userProfile' />}
            />

            <Route
              path= "/userProfile"
              element = {<UserProfile/>}
            />
           <Route path= '/friends' element= {(user) ? <Friends /> : <Navigate to = '/home' />}
           />
            <Route 
              path = "/profile"
              element = {(user) ? (user.isFilledUserProfile ? <Profile/> : <Navigate to= '/userProfile' />) : <Navigate to='/login' />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
