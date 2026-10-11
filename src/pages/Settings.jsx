import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import {
    UserRound,
    Palette,
    Bell,
    ListTodo,
    Save,
    RotateCcw,
} from "lucide-react"

import {
    updateProfile,
    updateNotificationPreference,
    updateTaskPreference,
    resetSettings,
} from "../redux/settings/settingsSlice"

// Adjust this path to your existing uiSlice.
import { setTheme } from "../redux/ui/uiSlice"

const STORAGE_KEY = "taskforge-settings"

const DEFAULT_SETTINGS = {
    profile: {
        name: "TaskForge User",
        username: "taskforge-user",
        email: "",
        avatar: "",
    },
    notifications: {
        taskAssignments: true,
        taskUpdates: true,
        projectUpdates: true,
    },
    preferences: {
        defaultTaskView: "list",
        defaultTaskSorting: "newest",
    },
}

const readStoredSettings = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)

        if (!saved) return null

        const parsed = JSON.parse(saved)

        return {
            profile: { ...DEFAULT_SETTINGS.profile, ...parsed.profile },
            notifications: {
                ...DEFAULT_SETTINGS.notifications,
                ...parsed.notifications,
            },
            preferences: {
                ...DEFAULT_SETTINGS.preferences,
                ...parsed.preferences,
            },
        }
    } catch {
        return null
    }
}

const Settings = () => {
    const dispatch = useDispatch()

    const settings = useSelector((state) => state.settings)
    const theme = useSelector((state) => state.ui.theme)

    const [loaded, setLoaded] = useState(false)
    const [profileForm, setProfileForm] = useState(settings.profile)

    // Load persisted preferences once.
    useEffect(() => {
        const saved = readStoredSettings()

        if (saved) {
            dispatch(updateProfile(saved.profile))

            Object.entries(saved.notifications).forEach(([key, value]) => {
                dispatch(updateNotificationPreference({ key, value }))
            })

            Object.entries(saved.preferences).forEach(([key, value]) => {
                dispatch(updateTaskPreference({ key, value }))
            })
        }

        const savedTheme = localStorage.getItem("taskforge-theme")

        if (["light", "dark", "system"].includes(savedTheme)) {
            dispatch(setTheme(savedTheme))
        }

        setLoaded(true)
    }, [dispatch])

    // Keep the form in sync after loading persisted profile settings.
    useEffect(() => {
        setProfileForm(settings.profile)
    }, [settings.profile])

    // Save preferences only after initial hydration.
    useEffect(() => {
        if (!loaded) return

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    profile: settings.profile,
                    notifications: settings.notifications,
                    preferences: settings.preferences,
                })
            )

            localStorage.setItem("taskforge-theme", theme)
        } catch {
            // Storage may be unavailable or full.
        }
    }, [loaded, settings.profile, settings.notifications, settings.preferences, theme])

    const handleProfileChange = (event) => {
        const { name, value } = event.target

        setProfileForm((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleProfileSave = (event) => {
        event.preventDefault()

        const name = profileForm.name.trim()
        const username = profileForm.username.trim()
        const email = profileForm.email.trim()

        if (!name || !username || !email) {
            toast.error("Please fill in your name, username, and email.")
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address.")
            return
        }

        dispatch(
            updateProfile({
                ...profileForm,
                name,
                username,
                email,
                avatar: profileForm.avatar.trim(),
            })
        )

        toast.success("Profile settings saved.")
    }

    const handleThemeChange = (event) => {
        dispatch(setTheme(event.target.value))
    }

    const handleNotificationChange = (key, value) => {
        dispatch(updateNotificationPreference({ key, value }))
    }

    const handlePreferenceChange = (key, value) => {
        dispatch(updateTaskPreference({ key, value }))
    }

    const handleReset = () => {
        dispatch(resetSettings())
        dispatch(setTheme("system"))
        setProfileForm(DEFAULT_SETTINGS.profile)

        toast.success("Settings restored to defaults.")
    }

    return (
        <section className="mx-auto max-w-5xl space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold primary-text">
                        Settings
                    </h1>
                    <p className="mt-1 text-sm secondary-text">
                        Customize your profile and workspace preferences.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex w-fit items-center gap-2 rounded-lg border app-border px-4 py-2 text-sm font-medium primary-text hover:bg-slate-500/10"
                >
                    <RotateCcw size={16} />
                    Reset settings
                </button>
            </div>

            {/* Profile */}
            <form
                onSubmit={handleProfileSave}
                className="elevated-surface app-border space-y-5 rounded-xl border p-5"
            >
                <div className="flex items-center gap-2">
                    <UserRound size={20} />
                    <h2 className="text-lg font-semibold primary-text">
                        Profile
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1.5">
                        <span className="text-sm font-medium primary-text">
                            Full name
                        </span>
                        <input
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            required
                            maxLength={80}
                            className="w-full rounded-lg border app-border bg-transparent px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                        />
                    </label>

                    <label className="space-y-1.5">
                        <span className="text-sm font-medium primary-text">
                            Username
                        </span>
                        <input
                            name="username"
                            value={profileForm.username}
                            onChange={handleProfileChange}
                            required
                            maxLength={40}
                            className="w-full rounded-lg border app-border bg-transparent px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                        />
                    </label>

                    <label className="space-y-1.5">
                        <span className="text-sm font-medium primary-text">
                            Email address
                        </span>
                        <input
                            name="email"
                            type="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            required
                            className="w-full rounded-lg border app-border bg-transparent px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                        />
                    </label>

                    <label className="space-y-1.5">
                        <span className="text-sm font-medium primary-text">
                            Avatar URL (optional)
                        </span>
                        <input
                            name="avatar"
                            type="url"
                            value={profileForm.avatar}
                            onChange={handleProfileChange}
                            placeholder="https://example.com/avatar.jpg"
                            className="w-full rounded-lg border app-border bg-transparent px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                    <Save size={16} />
                    Save profile
                </button>
            </form>

            {/* Appearance */}
            <div className="elevated-surface app-border space-y-4 rounded-xl border p-5">
                <div className="flex items-center gap-2">
                    <Palette size={20} />
                    <h2 className="text-lg font-semibold primary-text">
                        Appearance
                    </h2>
                </div>

                <label className="block max-w-sm space-y-1.5">
                    <span className="text-sm font-medium primary-text">
                        Theme
                    </span>
                    <select
                        value={theme}
                        onChange={handleThemeChange}
                        className="w-full rounded-lg border app-border bg-transparent px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System default</option>
                    </select>
                </label>

                <p className="text-xs secondary-text">
                    Your existing theme provider must support light, dark,
                    and system modes for all three options to work correctly.
                </p>
            </div>

            {/* Notification preferences */}
            <div className="elevated-surface app-border space-y-4 rounded-xl border p-5">
                <div className="flex items-center gap-2">
                    <Bell size={20} />
                    <h2 className="text-lg font-semibold primary-text">
                        Notification preferences
                    </h2>
                </div>

                <ToggleRow
                    title="Task assignments"
                    description="Updates when tasks are assigned to you."
                    checked={settings.notifications.taskAssignments}
                    onChange={(value) =>
                        handleNotificationChange("taskAssignments", value)
                    }
                />

                <ToggleRow
                    title="Task updates"
                    description="Updates when task details or status change."
                    checked={settings.notifications.taskUpdates}
                    onChange={(value) =>
                        handleNotificationChange("taskUpdates", value)
                    }
                />

                <ToggleRow
                    title="Project updates"
                    description="Updates about project activity."
                    checked={settings.notifications.projectUpdates}
                    onChange={(value) =>
                        handleNotificationChange("projectUpdates", value)
                    }
                />
            </div>

            {/* Task preferences */}
            <div className="elevated-surface app-border space-y-4 rounded-xl border p-5">
                <div className="flex items-center gap-2">
                    <ListTodo size={20} />
                    <h2 className="text-lg font-semibold primary-text">
                        Task preferences
                    </h2>
                </div>

                <label className="block max-w-sm space-y-1.5">
                    <span className="text-sm font-medium primary-text">
                        Default task view
                    </span>
                    <select
                        value={settings.preferences.defaultTaskView}
                        onChange={(event) =>
                            handlePreferenceChange(
                                "defaultTaskView",
                                event.target.value
                            )
                        }
                        className="w-full rounded-lg border app-border bg-transparent px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                    >
                        <option value="list">List</option>
                        <option value="board">Board</option>
                    </select>
                </label>

                <label className="block max-w-sm space-y-1.5">
                    <span className="text-sm font-medium primary-text">
                        Default task sorting
                    </span>
                    <select
                        value={settings.preferences.defaultTaskSorting}
                        onChange={(event) =>
                            handlePreferenceChange(
                                "defaultTaskSorting",
                                event.target.value
                            )
                        }
                        className="w-full rounded-lg border app-border bg-transparent px-3 py-2.5 text-sm primary-text outline-none focus:border-indigo-500"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="priority">Priority</option>
                    </select>
                </label>
            </div>
        </section>
    )
}

const ToggleRow = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 border-b app-border pb-4 last:border-b-0 last:pb-0">
        <div>
            <p className="text-sm font-medium primary-text">{title}</p>
            <p className="mt-1 text-sm secondary-text">{description}</p>
        </div>

        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={title}
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                checked ? "bg-indigo-600" : "bg-slate-400"
            }`}
        >
            <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    checked ? "left-[22px]" : "left-0.5"
                }`}
            />
        </button>
    </div>
)

export default Settings
