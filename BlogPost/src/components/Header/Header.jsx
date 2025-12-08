import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Container, Logo, LogoutBtn } from "../index"

function Header() {
    const authStatus = useSelector((state) => state.auth.status) //state.<name of slice>.<state want to access>
    const navigate = useNavigate()

    // We create navItems so if we have to add or remove any element from navigation bar we can just add or remove it from array
    const navItems = [
        {
            name: "Home",
            redirect: "/",
            active: true
        },
        {
            name: "Login",
            redirect: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            redirect: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            redirect: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            redirect: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header
        className="py-3 shadow bg-gray-700"
        >
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="60px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {
                            navItems.map(
                                (item) => item.active ? (
                                    <li key={item.name}>
                                        <button 
                                        onClick={() => navigate(item.redirect)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )
                        }
                        {// condition && (want to execute)
                        authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
