import { Link, useNavigate } from "react-router"
import Logo2 from "../../components/common/Logo2"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "../../context/AuthContext"

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [users, setUsers] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    const { register } = useAuth()


    const handleChange = (e) => {
        const { name, value } = e.target

        setUsers((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    const validateForm = () => {
        const newErrors = {}

        if (!users.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (users.fullName.trim().length < 3) {
            newErrors.fullName =
                "Full name must be at least 3 characters";
        }

        if (!users.username.trim()) {
            newErrors.username = "Username is required";
        } else if (users.username.trim().length < 3) {
            newErrors.username =
                "Username must be at least 3 characters";
        }

        if (!users.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users.email)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!users.password) {
            newErrors.password = "Password is required";
        } else if (users.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters";
        }

        if (!users.confirmPassword) {
            newErrors.confirmPassword =
                "Confirm password is required";
        } else if (users.confirmPassword !== users.password) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = validateForm();

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const result = register({
                fullName: users.fullName,
                username: users.username,
                email: users.email,
                password: users.password,
            });

            setIsLoading(false)

            if (!result.success) {
                if (result.error.includes("email")) {
                    setErrors({
                        email: result.error,
                    });
                } else {
                    setErrors({
                        username: result.error,
                    });
                }

                return;
            }

            toast.success("Account created successfully!");

            navigate("/login");
        }, 500)
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm py-2 px-6">
            <Logo2 />

            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Create your account
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Join TaskFlow and start managing your work
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-3">

                {/* Fullname */}
                <div>
                    <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor="fullName">
                        Full name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={users.fullName}
                        onChange={handleChange}
                        placeholder="Tapan Rathore"
                        className="w-full h-11 mt-1 px-4 rounded-lg border border-slate-300 outline-none text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    {/* Name errors */}
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullName}
                        </p>
                    )}
                </div>

                {/* Username */}
                <div>
                    <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor="username"
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={users.username}
                        onChange={handleChange}
                        placeholder="tapan123"
                        className="w-full h-11 mt-1 px-4 rounded-lg border border-slate-300 outline-none text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.username}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor="email">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={users.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full h-11 mt-1 px-4 rounded-lg border border-slate-300 outline-none text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    {/* Email error */}
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor="password">
                        Password
                    </label>

                    <div className="relative mt-1">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={users.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full h-11 px-4 rounded-lg border border-slate-300 outline-none text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Password Errors */}
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor="confirmPassword">
                        Confirm password
                    </label>

                    <div className="relative mt-1">
                        <input
                            type={showConfirmedPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={users.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full h-11 px-4 rounded-lg border border-slate-300 outline-none text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            {showConfirmedPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                        {/* Password Errors */}
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                </div>

                {/* Register button */}
                <button
                    className="w-full px-4 py-2 rounded-lg text-white bg-blue-500 transition hover:bg-blue-600 hover:scale-95 cursor-pointer"
                    type="submit"
                    disabled={isLoading}>
                    {isLoading
                        ? "Creating account..."
                        : "Create account"}
                </button>
            </form>

            <div className="text-sm text-slate-500 mt-2 text-center">
                <span>Already have an account?</span>{" "}
                <Link
                    className="font-medium text-indigo-600 hover:text-indigo-800"
                    to="/login">
                    Sign in
                </Link>
            </div>
        </div>
    )
}

export default Register