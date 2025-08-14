import { auth } from "../firebase/config"

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup

    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled () {
        if(cancelled){
            return
        }
    }
    //Create
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)

            return user
        } catch (error) {

            let systemErrorMessage 

            if(error.message.includes("password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if (error.message.includes("Email-already")){
                systemErrorMessage = "E-mail já cadastrado";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor volte mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }

    }

    //logout 
    const logout = () => {
        checkIfIsCancelled();
        signOut(auth)
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    //Login
    const login = async(data) => {

        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {
           await signInWithEmailAndPassword( auth, data.email, data.password )
        } catch (error) {
            
            let systemErrorMessage 

            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuário não encontrado"
            } else if (error.message.includes("wrong-password" )){
                systemErrorMessage = "Senha ou Email incorreto";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor volte mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}