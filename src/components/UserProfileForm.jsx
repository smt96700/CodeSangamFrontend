import { useState } from "react";
// import { useProfileContext } from '../hooks/useProfileContext'
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';

function UserProfileForm() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const email = user ? user.email : '';
  const { dispatch } = useAuthContext();
  const navigate= useNavigate();

  //conditional styling for light, dark mode
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  //including dispatch fun
  // const {dispatch} = useProfileContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside handle submit");
    const profileInfo = {
      name,
      dateOfBirth,
      gender,
      contactNumber,
      currency,
      monthlySalary,
      monthlyExpense,
      country,
      state,
      city,
      email,
    };
    console.log(gender);
    console.log(profileInfo);

    const response = await fetch("http://localhost:4000/api/profile/createProfile", {
      method: "POST",
      body: JSON.stringify(profileInfo),
      headers: {
        "Content-Type": "application/json", //to specify that the data is in json format
      },
    });
    console.log(response);
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(json.emptyFields);
    }
    if (response.ok) {
      console.log("Error h");
      setName("");
      setDateOfBirth("");
      setGender("");
      setContactNumber("");
      setCurrency("");
      setMonthlyExpense(0);
      setMonthlySalary(0);
      setCity("");
      setCountry("");
      setState("");
      setEmptyFields([]);
      setError(null);

      console.log("profile added");
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);

      // Update the 'isBool' property
      user.isFilledUserProfile = true;

      // Save the updated user object back to local storage
      localStorage.setItem("user", JSON.stringify(user));
      const data= JSON.parse(localStorage.getItem('user'));
      dispatch({type:"LOGIN", payload: data});
      navigate('/login')
      // dispatch({type : 'PROFILEADDED'})
    }
  };

  return (
    <>
      <form className={`create_profile ${isDarkMode? 'bg-zinc-700' : 'bg-white'}`} onSubmit={handleSubmit}>
      <h1 id = "label" className = "flex flex-wrap justify-center text-3xl font-light font-serif">Let Us know about you...</h1>
        
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={`${emptyFields.includes("name") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          onChange={(e) => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          className={`${emptyFields.includes("dateOfBirth") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <br/>
        <InputLabel id="demo-simple-select-helper-label">Gender:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          size = "small"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={`${emptyFields.includes("gender") ? "error" : ""} ${isDarkMode? 'bg-zinc-600' : 'bg-white'}`}
        >
          
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        <br/><br/>

        <label>Contact Number:</label>
        <input
          type="text"
          onChange={(e) => setContactNumber(e.target.value)}
          value={contactNumber}
          className={`${emptyFields.includes("contactNumber") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <label>Currency:</label>
        <input
          type="text"
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
          className={`${emptyFields.includes("currency") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <label>Monthly Salary:</label>
        <input
          type="number"
          onChange={(e) => setMonthlySalary(e.target.value)}
          value={monthlySalary}
          className={`${emptyFields.includes("monthlySalary") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <label>Expected Monthly Expense:</label>
        <input
          type="number"
          onChange={(e) => setMonthlyExpense(e.target.value)}
          value={monthlyExpense}
          className={`${emptyFields.includes("monthlyExpense") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          className={`${emptyFields.includes("country") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <label>State:</label>
        <input
          type="text"
          onChange={(e) => setState(e.target.value)}
          value={state}
          className={`${emptyFields.includes("state") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}
        />

        <label>City:</label>
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className = {`${emptyFields.includes("city") ? "error" : ""} ${isDarkMode? 'bg-zinc-600 text-white' : 'bg-white'}`}        />

        {error && <div className="error">{error}</div>}
        <button className="mt-5">Add Profile</button>
        
      </form>
    </>
  );
}

export default UserProfileForm;
