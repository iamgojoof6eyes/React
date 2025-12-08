import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
    const dispath = useDispatch()

    const logoutHandler = () => {
        authService.logout()
        .then(
            () => {
                dispath(logout())
            }
        )
        .catch((err) => console.error("LogoutBtn.jsx :: Got error in logoutHandler while handling logout promise", err)
        )
    }

    return (
        <button
        className="className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
