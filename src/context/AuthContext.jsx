import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext(null)

const USERS_KEY = "taskforge_users";
const AUTH_USER_KEY = "taskforge_user";
const SESSION_USER_KEY = "taskforge_session";

const getStoredUsers = () => {
    try {
        const users = localStorage.getItem(USERS_KEY)

        if (!users) {
            return []
        }

        const parsedUsers = JSON.parse(users)
        return Array.isArray(parsedUsers) ? parsedUsers : []

    } catch (error) {
        console.error("Failed to read Users:", error);
        localStorage.removeItem(USERS_KEY);
        return []
    }
}

const getStoredAuthUsers = () => {
    try {
        const persistentUser = localStorage.getItem(AUTH_USER_KEY);
        const sessionUser = sessionStorage.getItem(SESSION_USER_KEY);

        const savedUser = persistentUser || sessionUser

        if (!savedUser) {
            return null
        }

        return JSON.parse(savedUser)
    } catch (error) {
        console.error("Failed to read authenticated user:", error);

        localStorage.removeItem(AUTH_USER_KEY);
        sessionStorage.removeItem(SESSION_USER_KEY)

        return null
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredAuthUsers);

    const register = (userData) => {
        const users = getStoredUsers()

        const normalizedEmail = userData.email.trim().toLowerCase()
        const normalizedUsername = userData.username.trim().toLowerCase()

        const emailExists = users.some(
            (existingUser) =>
                existingUser.email.toLowerCase() === normalizedEmail
        )

        if (emailExists) {
            return {
                success: false,
                error: "An account with this email already exists.",
            }
        }

        const usernameExists = users.some(
            (existingUser) =>
                existingUser.username.toLowerCase() === normalizedUsername
        );

        if (usernameExists) {
            return {
                success: false,
                error: "This username is already taken.",
            }
        }

        const newUser = {
            id: Date.now(),
            fullName: userData.fullName.trim(),
            username: userData.username.trim(),
            email: userData.email.trim(),
            password: userData.password.trim()
        };

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify([...users, newUser])
        );

        return {
            success: true,
            user: newUser,
        };
    };


    const login = (emailOrUsername, password, rememberMe = false) => {
        const users = getStoredUsers();

        const identifier = emailOrUsername.trim().toLowerCase();

        const existingUser = users.find(
            (storedUser) =>
                storedUser.email.toLowerCase() === identifier ||
                storedUser.username.toLowerCase() === identifier
        );

        if (!existingUser) {
            return {
                success: false,
                error: "Invalid username/email or password."
            }
        }

        if (existingUser.password !== password) {
            return {
                success: false,
                error: "Invalid username/email or password."
            }
        }

        const authenticatedUser = {
            id: existingUser.id,
            fullName: existingUser.fullName,
            username: existingUser.username,
            email: existingUser.email
        }

        sessionStorage.removeItem(SESSION_USER_KEY)
        localStorage.removeItem(AUTH_USER_KEY)

        if (rememberMe) {
            localStorage.setItem(
                AUTH_USER_KEY,
                JSON.stringify(authenticatedUser)
            )
        } else {
            sessionStorage.setItem(
                SESSION_USER_KEY,
                JSON.stringify(authenticatedUser)
            )
        }

        setUser(authenticatedUser)

        return {
            success: true,
            user: authenticatedUser,
        };
    }

    const logout = () => {
        localStorage.removeItem(AUTH_USER_KEY);
        sessionStorage.removeItem(SESSION_USER_KEY);

        setUser(null)

        toast.success("You've been logged out successfully.")
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context
}