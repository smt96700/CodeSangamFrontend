import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { MenuItem } from "@mui/material"
import { useTheme } from '@mui/material/styles';

import Select from '@mui/material/Select';


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const {user}= useAuthContext();
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [method, setMethod] = useState('')
  const [status, setStatus] = useState('')
  const [payee, setPayee] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [message, setMessage]= useState('');
  const [amount, setAmount]= useState(undefined);
  const [isRecurring, setIsRecurring] = useState('No')
  const [isDisabled, setIsDisabled] = useState(true)
  const [recurringTime, setRecurringTime] = useState('')

   //conditional styling for light, dark mode
   const theme = useTheme();
   const isDarkMode = theme.palette.mode === 'dark';
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    //check if logged in
    if(!user){
      setError('You must be logged in');
      return;
    }
    
    const workout = {category, description, method, status, payee, message, amount, isRecurring, recurringTime};

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setCategory('')
      setDescription('')
      setMethod('')
      setStatus('')
      setPayee('')
      setMessage('')
      setError(null)
      setEmptyFields([])
      setAmount(undefined)
      setIsRecurring('No')
      setRecurringTime('')
      console.log('new workout added', json)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h1 id = "label" className = "flex flex-wrap justify-center text-3xl font-mono font-light underline">Add Expense</h1>

        <label className="me-4 font-light">Expense Category :</label>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            size="small"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className={`w-1/2 ${emptyFields.includes('category') ? 'error' : ''} ${isDarkMode? 'bg-neutral-800' : 'bg-white'}`}
          >
            <MenuItem value="Meals/ Entertainment">Meals/ Entertainment</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value = "Electricity Bill">Electricity Bill</MenuItem>
            <MenuItem value = "Water Bill">Water Bill</MenuItem>
            <MenuItem value = "LPG Gas">LPG Gas</MenuItem>
            <MenuItem value = "Internet and Phone Bills">Internet and Phone Bills</MenuItem>
            <MenuItem value="Electronic Equipments">Electronic Equipments</MenuItem>
            <MenuItem value="Training/ Education">Training/ Education</MenuItem>
            <MenuItem value="Grocery">Grocery</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </Select>
        <br/><br/>
        
        <input 
        className={`${emptyFields.includes('description') ? 'error' : ''} ${isDarkMode? 'bg-neutral-800 text-white' : 'bg-white'}`}
        type="text"
        onChange={(e)=> setDescription(e.target.value)}
        value={description}
        placeholder="Description"
      />
        <br/><br/>
           

      <label className = "me-4 font-light">Payment Method :</label>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            size="small"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            className={`w-1/5 ${emptyFields.includes('method') ? 'error' : ''} ${isDarkMode? 'bg-neutral-800' : 'bg-white'}`}

          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="UPI">UPI</MenuItem>
            <MenuItem value = "Card">Card</MenuItem>
            <MenuItem value = "Check">Check</MenuItem>
          </Select>
        {/* <br/><br/> */}

        <label className = "me-4 font-light" style={{marginLeft: "40px"}}>Payment Status :</label>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            size="small"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className={`w-1/5 ${emptyFields.includes('status') ? 'error' : ''} ${isDarkMode? 'bg-neutral-800' : 'bg-white'}`}

          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        <br/><br/>

       <input 
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount !== undefined ? amount : ''}
        placeholder="Amount"
        className = {`${isDarkMode? 'bg-neutral-800  text-white' : 'bg-white'}`}
      />

      <input 
        type="String"
        onChange={(e) => setPayee(e.target.value)}
        value={payee}
        className={`${emptyFields.includes('payee') ? 'error' : ''} ${isDarkMode? 'bg-neutral-800  text-white' : 'bg-white'}`}
        placeholder="Payee"
      />
      <input 
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className={`${isDarkMode? 'bg-neutral-800  text-white' : 'bg-white'}`}
        placeholder="Message"
      />

<label className = "me-4 font-light">Recurring Expense :</label>
          <Select
            className = {`w-1/6 ${isDarkMode? 'bg-neutral-800' : 'bg-white'}`}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            size="small"
            onChange={(e) => {
              setIsRecurring(e.target.value)
              if (e.target.value === 'Yes') {
                  setIsDisabled(false)
              }
              else {
                setIsDisabled(true)
              }
            }}
            value={isRecurring}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <br/><br/>

          {!isDisabled && (
            <div>
            <input
              type="text" placeholder="Date" onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value = {recurringTime}
              onChange={(e) => setRecurringTime(e.target.value)}
              className={`${emptyFields.includes('recurringTime') ? 'error' : ''} ${isDarkMode? 'bg-neutral-800  text-white' : 'bg-white'}`}
            >
            </input>
            <p className = "font-extralight text-sm" style = {{marginTop : "-15px"}}>Pick next Scheduled pay</p>
            <br/> <br/>
            </div>
          )}

      <button>Add Expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm