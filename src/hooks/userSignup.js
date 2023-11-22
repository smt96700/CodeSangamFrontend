import { useState } from 'react'
import { useAuthContext } from './useAuthContext'


export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()


  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      
         
      // update the auth context
      dispatch({type: 'SIGNUP', payload: json})

      // update loading state
      setIsLoading(false)

      //redirect to create user profile
    }
  }

  return { signup, isLoading, error }
}