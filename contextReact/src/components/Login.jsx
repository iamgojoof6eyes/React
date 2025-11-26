import { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password})
    }
    return (
        <h2>Login
            <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>Login</button>
        </h2>
    )
}

export default Login
