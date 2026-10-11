import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import {
    Search,
    Users,
    Mail,
    CheckCircle2,
    Clock3,
    CircleUserRound,
} from "lucide-react"
import teamMembers from "../data/teamMembers"

const ROLES = ["All", "Admin", "Manager", "Developer", "Designer"]

const getInitials = (name = "") =>
    name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("") || "U"

const Team = () => {
    const tasks = useSelector((state) => state.tasks.tasks)

    const [search, setSearch] = useState("")
    const [selectedRole, setSelectedRole] = useState("All")

    const filteredMembers = useMemo(() => {
        const query = search.trim().toLowerCase()

        return teamMembers.filter((member) => {
            const matchesRole =
                selectedRole === "All" ||
                member.role === selectedRole

            const matchesSearch =
                member.name.toLowerCase().includes(query) ||
                member.email.toLowerCase().includes(query)

            return matchesRole && matchesSearch
        })
    }, [search, selectedRole])

    const getTaskCount = (memberName) =>
        tasks.filter(
            (task) =>
                task.assignee?.trim().toLowerCase() ===
                memberName.trim().toLowerCase()
        ).length

    const getStatusStyle = (status) => {
        switch (status) {
            case "Available":
                return "bg-green-500/10 text-green-600 dark:text-green-400"
            case "Busy":
                return "bg-red-500/10 text-red-600 dark:text-red-400"
            case "Away":
                return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            default:
                return "bg-slate-500/10 secondary-text"
        }
    }

    const roleCounts = useMemo(() => {
        return teamMembers.reduce(
            (counts, member) => {
                counts[member.role] = (counts[member.role] || 0) + 1
                return counts
            },
            {}
        )
    }, [])

    return (
        <section className="space-y-6">
            {/* Page heading */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Users size={25} />
                        <h1 className="text-2xl font-bold primary-text">
                            Team
                        </h1>
                    </div>

                    <p className="mt-1 text-sm secondary-text">
                        Manage your team members and their workloads.
                    </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-lg border app-border px-4 py-3">
                    <Users size={19} className="secondary-text" />
                    <span className="text-sm primary-text">
                        <strong>{teamMembers.length}</strong> Members
                    </span>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ROLES.filter((role) => role !== "All").map((role) => (
                    <button
                        type="button"
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`rounded-xl border p-4 text-left transition ${
                            selectedRole === role
                                ? "border-indigo-500 bg-indigo-500/10"
                                : "app-border elevated-surface hover:bg-slate-500/5"
                        }`}
                    >
                        <p className="text-sm secondary-text">{role}</p>
                        <p className="mt-1 text-2xl font-bold primary-text">
                            {roleCounts[role] || 0}
                        </p>
                    </button>
                ))}
            </div>

            {/* Search and filters */}
            <div className="elevated-surface app-border space-y-4 rounded-xl border p-4">
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 secondary-text"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by name or email..."
                        aria-label="Search team members"
                        className="w-full rounded-lg border app-border bg-transparent py-2.5 pl-10 pr-3 text-sm primary-text outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                    {ROLES.map((role) => (
                        <button
                            type="button"
                            key={role}
                            onClick={() => setSelectedRole(role)}
                            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                selectedRole === role
                                    ? "bg-indigo-600 text-white"
                                    : "border app-border primary-text hover:bg-slate-500/10"
                            }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            {/* Team members */}
            {filteredMembers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredMembers.map((member) => {
                        const taskCount = getTaskCount(member.name)

                        return (
                            <article
                                key={member.id}
                                className="elevated-surface app-border rounded-xl border p-5 transition hover:shadow-md"
                            >
                                <div className="flex items-start gap-3">
                                    {member.avatar ? (
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className="h-12 w-12 shrink-0 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                            {getInitials(member.name)}
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <h2 className="truncate font-semibold primary-text">
                                            {member.name}
                                        </h2>

                                        <p className="mt-1 flex items-center gap-1.5 break-all text-sm secondary-text">
                                            <Mail size={14} className="shrink-0" />
                                            {member.email}
                                        </p>
                                    </div>

                                    <CircleUserRound
                                        size={18}
                                        className="shrink-0 secondary-text"
                                    />
                                </div>

                                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                                    <span className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                        {member.role}
                                    </span>

                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(member.status)}`}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        {member.status}
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t app-border pt-4">
                                    <span className="text-sm secondary-text">
                                        Assigned tasks
                                    </span>

                                    <span className="flex items-center gap-1.5 text-sm font-semibold primary-text">
                                        <CheckCircle2
                                            size={16}
                                            className="text-indigo-500"
                                        />
                                        {taskCount}
                                    </span>
                                </div>
                            </article>
                        )
                    })}
                </div>
            ) : (
                <div className="elevated-surface app-border rounded-xl border px-5 py-12 text-center">
                    <Users
                        size={34}
                        className="mx-auto mb-3 secondary-text"
                    />

                    <h2 className="font-semibold primary-text">
                        No team members found
                    </h2>

                    <p className="mt-1 text-sm secondary-text">
                        Try another name, email, or role.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch("")
                            setSelectedRole("All")
                        }}
                        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    )
}

export default Team
