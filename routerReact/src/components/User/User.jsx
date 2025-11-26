import { useParams } from "react-router-dom"

function User() {
    const { userId } = useParams()
    return (
        <div className="bg-amber-400 text-white text-2xl py-3 text-center">User: {userId}</div>
    )
}

export default User
