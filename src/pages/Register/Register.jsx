import { useAuthentication } from "../../hooks/useAuthentication"
import styles from "../Register/Register.module.css"

import {useState, useEffect} from "react"

function Register() {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassaword] = useState("")
  const [confirmPassaword, setConfirmPassaword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

      const user = {
        displayName,
        email,
        password
      }

      if(password !== confirmPassaword) {
        setError("As senhas precisam ser iguais")
        return
      }

      const res = await createUser(user)

      console.log(res)
  }

  useEffect(() => {

    if(authError){
      setError(authError)
    }
  },[authError])

  return (
    <div className={styles.register}>
      <h1>Cadastra-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="email"
            name="email"
            required
            placeholder="E-mail do usuário" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password"
            name="password"
            required
            placeholder="Insira sua senha" 
            value={password}
            onChange={(e) => setPassaword(e.target.value)}
            />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input type="password"
          name="ConfirmPassword"
          required
          placeholder="Confirme a sua senha" 
          value={confirmPassaword}
          onChange={(e) => setConfirmPassaword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register
