import { useState } from "react"
import { useDispatch } from "react-redux"
import { Loader, OverLay } from ".."
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
    const dispath = useDispatch()
    const [isClicked, setIsClicked] = useState(false)

    const logoutHandler = () => {
        setIsClicked(true)
        authService.logout()
        .then(
            () => {
                dispath(logout())
            }
        )
        .catch((err) => {
            console.error("LogoutBtn.jsx :: Got error in logoutHandler while handling logout promise", err)
        }
        )
        setIsClicked(false)
    }

    return (
        !isClicked ? (<button
        className="className='inline-bock px-6 py-2 duration-200 text-red-500 enabled:hover:bg-red-500 enabled:hover:text-white rounded-full enabled:hover:shadow-lg enabled:hover:shadow-red-400/50"
        disabled={isClicked}
        onClick={logoutHandler}
        >
            Logout
        </button>) : (
            <OverLay message="Logging out">
                <Loader color="text-red-500" size="10" label=""/>
            </OverLay>
        )
    )
}

export default LogoutBtn
