import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authenticated = true}) {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    
    useEffect(
        () => {
            if (authenticated && authenticated !== authStatus) {
                navigate("/login")
            } else if (!authenticated && authenticated !== authStatus) {
                navigate("/")
            } 
            setLoading(false)
        }
    )

    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected
