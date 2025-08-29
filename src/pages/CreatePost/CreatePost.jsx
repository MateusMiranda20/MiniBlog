import styles from "../CreatePost/CreatPost.module.css"
import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"

function CreatePost() {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

     const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

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
        }

        if (formError) return;



        insertDocument({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        navigate("/")
    }


    return (
        <div className={styles.create_post}>
            <h1>Criar post</h1>
            <p>Escreva o que quiser e compartilhe o seu conhecimento!</p>
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
                {!response.loading && <button className="btn">Cadastrar</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost
