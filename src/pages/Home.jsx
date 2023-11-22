import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useEffect, useState }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import ChartOnCategory from '../charts/pieChart/ChartOnCategory'

//authContext
import { useAuthContext } from '../hooks/useAuthContext'
import CurrencyConverter from '../components/CurrencyConverter'
const Home = () => {
  // states for the notification bar
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const {workouts, dispatch} = useWorkoutsContext()
  const {user}= useAuthContext();
  const [userResponded, setUserResponded] = useState(false)

  useEffect(() => {
    console.log("chal rha h")
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts', {headers:{'Authorization': `Bearer ${user.token}`}})
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
     if(user){
      fetchWorkouts()
     }
     
  }, [user, dispatch])

  useEffect(() => {
    const callNotification = () => {
      let intervalCounter = 0;
      if (giveNotification()) {
        const intervalId = setInterval(() => {
          notifyUser("Pay kar") 
          // Increment the counter
          intervalCounter++;

          // Check if the counter has reached the limit
          if (intervalCounter >= 1) {
            clearInterval(intervalId);
          }
        }, 5000)
        return () => clearInterval(intervalId);
      }

    }

    if (workouts) {
      console.log("fsjfs")
      callNotification()
    }
  }, [workouts])

  const giveNotification = () => {
    const checkDue = () => {
      console.log(workouts);
  
      // Use Array.some to check if any workout matches the condition
      return workouts.some((workout) => {
        const recurringTime = new Date(workout.recurringTime);
        const presentDate = new Date();
  
        // Check if the recurringTime matches the present date
        if (
          recurringTime.getDate() === presentDate.getDate() &&
          recurringTime.getMonth() === presentDate.getMonth() &&
          recurringTime.getFullYear() === presentDate.getFullYear()
        ) {
          // Send a notification
          console.log("Notification sent");
          return true;
        }
  
        return false;
      });
    };
  
    if (Notification.permission === 'granted') {
      console.log(checkDue())
      return checkDue();
    }
    return false;
  };
  

  async function notifyUser(notificationText = "Thank you for enabling notification") {
    if (!('Notification' in window)) {
      alert("Notifications are not supported in this browser") 
    }
    else if (Notification.permission === 'granted') {
      const notification = new Notification(notificationText) 
    }
    else if (Notification.permission !== 'denied') {
      await Notification.requestPermission().then ((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(notificationText)
        }
      })
    }
  }

  async function enableNotificationAndClose () {
    await notifyUser().then( () => {
      setUserResponded(true)
      setOpen(false);
    })
  }

  function disableNotificationAndClose () {
    setUserResponded(true)
    setOpen(false);
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

  return (
    <>
    <div className = "flex flex-wrap justify-end">
    {(!(userResponded) && !(Notification.permission === 'granted')) ? (
        <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Allow Notification
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Notifications?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Allow Notifications to get reminders of the 
              due Expenses.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={enableNotificationAndClose}>Sure</Button>
            <Button onClick={disableNotificationAndClose}>No Thanks</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>


  ) : (Notification.permission === 'granted' && workouts) ? (
      <>
      </>
    
  ) : (
    <></>
  )}

    </div>
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <div>
      {workouts && 
        <ChartOnCategory workouts = {workouts}/>
      }
      <CurrencyConverter />
      </div>
    </div>
     
    </>
  )
}

export default Home