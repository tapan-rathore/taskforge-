import { useState } from "react"
import Logo2 from "../../components/common/Logo2"
import { Link } from "react-router"
import toast from "react-hot-toast"

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        let errorMessage = ""

        // Email validation
        if (!email) {
            errorMessage = "Email is required"
        } else if (!email.includes("@")) {
            errorMessage = "Please enter a valid email address"
        }

        setError(errorMessage)

        if (!errorMessage) {
            setEmail("")
            toast.success('Password reset link sent to your email.')
        }
    }

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm py-2 px-6 mx-2">
            <Logo2 />

            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                    Forgot your password?
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <form
                noValidate
                onSubmit={handleSubmit}
                className="space-y-4">
                <div>
                    <label
                        className="text-sm font-medium text-slate-700"
                        htmlFor="email">
                        Email address
                    </label>

                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setError("")
                        }}
                        placeholder="you@example.com"
                        className="w-full h-11 mt-1 px-4 rounded-lg border border-slate-300 outline-none text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />

                    {/* Email errors */}
                    {error && (
                        <p className="text-red-500 text-sm mt-1">
                            {error}
                        </p>
                    )}
                </div>

                <button
                    className="w-full px-4 py-2 rounded-lg text-white bg-blue-500 transition hover:bg-blue-600 hover:scale-95 cursor-pointer"
                    type="submit">
                    Send reset link
                </button>

                <div className="text-center mb-2">
                    <Link
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        to="/login" >
                        Back to login
                    </Link>
                </div>
            </form>

        </div>
    )
}

export default ForgotPassword