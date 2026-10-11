import { Link } from "react-router"
import logo from "../../assets/logo.png"

const Logo = () => {
    return(
        <Link to="/app/dashboard" 
        className="flex items-center">
            <img width={50} src={logo} alt="Logo" />
            <div className="text-3xl font-bold px-1">
                <span className="text-white">Task</span>
                <span className="bg-linear-to-r from-blue-600 to-pink-300 bg-clip-text text-transparent">Forge</span>
            </div>
        </Link>
    )
}

export default Logo