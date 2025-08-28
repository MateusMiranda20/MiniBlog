import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null,
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "INSERTED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useInsertDocument = (docCollection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState)

    useEffect(() => {
        if (response.error) {
            console.log("Erro ao inserir documento:", response.error)
        }
    }, [response.error])


    //Deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {

        checkCancelledBeforeDispatch({
            type: "LOADING",
        })

        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() }

            const insertedDocument = await addDoc(
                collection(db, docCollection), newDocument
            )

            checkCancelledBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })

        } catch (error) {
            checkCancelledBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)

    }, [])

    return { insertDocument, response }
}