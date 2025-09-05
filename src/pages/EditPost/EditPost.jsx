import styles from "./EditPost.module.css"

import { useNavigate, useParams } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useEffect, useState } from "react"

function EditPost() {
    const { id } = useParams()
    const { document: post } = useFetchDocument('posts', id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            setTags(post.tags.join(", "))
        }
    }, [post])

    const { user } = useAuthValue()

    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")

        const tagsArray = (tags || "")
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);

        //Checar todos os valores
        if (!title || !image || !body || tagsArray.length === 0) {
            setFormError("Por favor, preencha todos os campos.")
            return
        }

        //Validate image URL
        try {
            new URL(image)
        } catch (error) {
            setFormError("Por favor, insira uma URL de imagem válida." + error)
            return
        }

        if (formError) return;

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }
        updateDocument(id, data)

        navigate("/dashboard")
    }


    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h1> Editando Post: {post.title}</h1>
                    <p>Altere os dados dos posts como desejar!</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Titulo:</span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="Pense em um bom título..."
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input
                                type="text"
                                name="image"
                                required
                                placeholder="Insira a URL da imagem..."
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}>Preview da imagem atual:</p>
                        <img  className={styles.image_preview} src={post.image} alt={post.title} />
                        <label>
                            <span>Conteúdo:</span>
                            <textarea
                                name="body"
                                required
                                placeholder="Escreva o conteúdo do post..."
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            />
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input
                                type="text"
                                name="tags"
                                required
                                placeholder="Adicione tags separadas por vírgula..."
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>
                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost
