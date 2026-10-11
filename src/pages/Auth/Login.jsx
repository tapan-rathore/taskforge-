import { Link, useNavigate } from "react-router"
import Logo2 from "../../components/common/Logo2"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
        rememberme: false
    })
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
            submit: "",
        }));
    }

    const validateForm = () => {
        const newErrors = {}

        // Email validation
        if (!formData.identifier.trim()) {
            newErrors.identifier =
                "Email or username is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters";
        }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = validateForm()


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const result = login(
                formData.identifier,
                formData.password,
                formData.rememberme
            );

            setIsLoading(false);

            if (!result.success) {
                setErrors({
                    submit: result.error
                })

                return;
            }

            toast.success("Welcome back! You're signed in.")

            navigate("/app")
        }, 500);
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm py-2 px-6">
            <Logo2 />

            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Welcome Back
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Sign in to continue to your workspace
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-3">

                {/* Email */}
                <div>
                    <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor="identifier">
                        Email or Username
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full h-11 mt-1 px-4 rounded-lg border border-slate-300 outline-none text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    {/* Email error */}
                    {errors.identifier && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.identifier}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label
                            className="text-sm font-medium text-slate-700"
                            htmlFor="password">
                            Password
                        </label>
                        <Link to="/forgot-password"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
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

                {/* Submit error */}
                {errors.submit && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                        {errors.submit}
                    </p>
                )}

                {/* Remember me */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="rememberme"
                        name="rememberme"
                        checked={formData.rememberme}
                        onChange={handleChange}
                    />
                    <label
                        htmlFor="rememberme"
                        className="text-sm font-medium text-slate-700">
                        Remember me
                    </label>
                </div>

                <button
                    className="w-full px-4 py-2 rounded-lg text-white bg-blue-500 transition hover:bg-blue-600 hover:scale-95 cursor-pointer"
                    type="submit"
                    disabled={isLoading}>
                    {isLoading
                        ? "Signing in..."
                        : "Sign in"}
                </button>
            </form>

            <div className="text-sm text-slate-500 mt-2 text-center">
                <span>Don't have an account?</span>{" "}
                <Link
                    className="font-medium text-indigo-600 hover:text-indigo-800"
                    to="/register">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default Login