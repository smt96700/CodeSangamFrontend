import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useTheme } from '@mui/material/styles';

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import moment from 'moment-timezone';
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const {user}= useAuthContext();


  //used to get client's timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  //console.log(timezone);
  const utcTimestamp = workout.createdAt;

  //using new date which creates date acc to client's timezone
  const dateNew = new Date(workout.createdAt);
  //console.log(dateNew);

  //using moment to convert gmt to ist
  const newTimestamp = moment(utcTimestamp).tz(timezone);
  const dateTime= newTimestamp.format("dddd, MMMM D, YYYY, h:mm:ss A")

  const utc = workout.recurringTime;
  const newutc = moment(utc).tz(timezone);
  const date= newutc.format("MMMM D, YYYY")

  //conditional styling for light, dark mode
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleClick = async () => {

    if(!user){
       return ;
    }
    const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers:{'Authorization': `Bearer ${user.token}`}
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
 
  return (
    <div className={`workout-details ${isDarkMode? 'dark:bg-zinc-700' : 'bg-white'}`}>

      <h1 className = {`mb-5 flex text-xl font-medium  ${isDarkMode? 'text-blue-300' : 'text-indigo-700'}`}>{workout.category}</h1>

      <p className = {`${isDarkMode? 'text-white' : 'text-neutral-600'}`}><strong className={`font-semibold ${isDarkMode? 'text-white' : 'text-neutral-600'}`}>Description: </strong>{workout.description}</p>
      <p className = {`${isDarkMode? 'text-white' : 'text-neutral-600'}`}><strong className={`font-semibold ${isDarkMode? 'text-white' : 'text-neutral-600'}`}>Payee: </strong>{workout.payee}</p>

      {workout.message !== null && (
        <p className = {`${isDarkMode? 'text-white' : 'text-neutral-600'}`}><strong className={`font-semibold ${isDarkMode? 'text-white' : 'text-neutral-600'}`}>Message: </strong>{workout.message}</p>
       )}

      {workout.message === null && (
        <p className = {`${isDarkMode? 'text-white' : 'text-neutral-600'}`}><strong className={`font-semibold ${isDarkMode? 'text-white' : 'text-neutral-600'}`}>Message: </strong> --</p>
       )}

<p className = {`${isDarkMode? 'text-white' : 'text-neutral-600'}`}><strong className={`font-semibold ${isDarkMode? 'text-white' : 'text-neutral-600'}`}>Recurring: </strong>{workout.isRecurring}</p>
      
      {workout.isRecurring === 'Yes' && (
        <p className = {`${isDarkMode? 'text-white' : 'text-neutral-600'}`}><strong className={`font-semibold ${isDarkMode? 'text-white' : 'text-neutral-600'}`}>Next Scheduled Pay: </strong>{date}</p>
      )}

      <hr className='mt-3 mb-3'></hr>


      <div className = "flex mt-3 mb-3">
        <h1 className = {`mr-6 font-medium text-lg ${isDarkMode? 'text-cyan-300' : 'text-indigo-600'}`}>{workout.amount} /-</h1>
        <h1 className = {`rounded-lg px-3 border-solid border-2 border-indigo-300 mr-6 ${isDarkMode? 'bg-indigo-400' : 'bg-indigo-100'}`}> {workout.method}</h1>
        <h1 className = {`rounded-lg px-3 border-solid border-2 border-indigo-300 mr-6 ${isDarkMode? 'bg-indigo-400' : 'bg-indigo-100'}`}>{workout.status}</h1>
      </div>

      <h1 className='text-sm'>{dateTime}</h1>
      <span><DeleteSweepIcon onClick={handleClick}></DeleteSweepIcon></span>
      
    </div> 
  )
}

export default WorkoutDetails