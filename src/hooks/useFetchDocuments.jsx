import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData() {
            if (cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                let q;

                if (search) {
                const searchLower = search.toLowerCase(); // transforma a busca em minúscula

                // Busca por tags exatas (array-contains) e padronizando tudo em minúscula
                q = query(
                    collectionRef,
                    where("tags", "array-contains", searchLower),
                    orderBy("createdAt", "desc")
                );

                } else if (uid) {
                q = query(
                    collectionRef,
                    where("uid", "==", uid),
                    orderBy("createdAt", "desc")
                );
                } else {
                q = query(collectionRef, orderBy("createdAt", "desc"));
                }

                console.log("search:", search);
                console.log("collectionRef:", collectionRef);

                onSnapshot(q, (querySnapshot) => {
                setDocuments(
                    querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    }))
                );
                });


                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.message)

                setLoading(false)
            }
        }

        loadData()
    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { documents, loading, error }

}