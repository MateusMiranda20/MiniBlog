import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { doc, deleteDoc} from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null,
}

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "DELETED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer, initialState)

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

    const deleteDocument = async (id) => {

        checkCancelledBeforeDispatch({
            type: "LOADING",
        })

        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const deletDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelledBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletDocument
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

    return { deleteDocument, response }
}