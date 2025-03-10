import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const address = import.meta.env.VITE_ADDRESS;
    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://${address}:4000/API/USERS/login`,//'http://artour-app.azurewebsites.net/login',
            { 
            method: `POST`,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email" : email,"password" : password})
        })

            const json = await response.json()

            if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }
            if(response.ok){
                //save the user to local storage
                localStorage.setItem("user", JSON.stringify(json))

                //update Authcontact
                dispatch({type: 'LOGIN', payload: json})

                setIsLoading(false)
            }
    } 
    return {login,isLoading,error}
}