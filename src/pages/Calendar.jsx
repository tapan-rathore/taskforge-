import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    Clock3,
    CircleCheck,
} from "lucide-react"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const formatDateKey = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

const getValidDueDate = (value) => {
    if (!value || typeof value !== "string") return null

    // Support date-only values without timezone shifting.
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

    if (match) {
        const [, year, month, day] = match
        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        )

        if (
            date.getFullYear() !== Number(year) ||
            date.getMonth() !== Number(month) - 1 ||
            date.getDate() !== Number(day)
        ) {
            return null
        }

        return date
    }

    const date = new Date(value)

    return Number.isNaN(date.getTime()) ? null : date
}

const Calendar = () => {
    const navigate = useNavigate()
    const tasks = useSelector((state) => state.tasks.tasks)

    const [currentDate, setCurrentDate] = useState(() => new Date())

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const todayKey = formatDateKey(new Date())

    const monthLabel = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })

    const calendarDays = useMemo(() => {
        const firstDay = new Date(year, month, 1)
        const startDay = firstDay.getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        // Always show complete weeks.
        const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7

        return Array.from({ length: totalCells }, (_, index) => {
            const dayNumber = index - startDay + 1

            return new Date(year, month, dayNumber)
        })
    }, [year, month])

    const tasksByDate = useMemo(() => {
        const grouped = {}

        tasks.forEach((task) => {
            const dueDate = getValidDueDate(task.dueDate)

            if (!dueDate) return

            const key = formatDateKey(dueDate)

            if (!grouped[key]) {
                grouped[key] = []
            }

            grouped[key].push(task)
        })

        return grouped
    }, [tasks])

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const goToToday = () => {
        setCurrentDate(new Date())
    }

    const isCurrentMonth = (date) =>
        date.getMonth() === month &&
        date.getFullYear() === year

    const getStatusClass = (status) => {
        switch (status) {
            case "Done":
                return "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300"
            case "In Progress":
                return "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300"
            case "Review":
                return "border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300"
            default:
                return "border-slate-400 bg-slate-500/10 text-slate-700 dark:text-slate-300"
        }
    }

    const monthTasks = useMemo(() => {
        return calendarDays.reduce((result, date) => {
            if (isCurrentMonth(date)) {
                result.push(...(tasksByDate[formatDateKey(date)] || []))
            }

            return result
        }, [])
    }, [calendarDays, tasksByDate, year, month])

    const completedTasks = monthTasks.filter(
        (task) => task.status === "Done"
    ).length

    return (
        <section className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <CalendarDays size={25} />
                        <h1 className="text-2xl font-bold primary-text">
                            Calendar
                        </h1>
                    </div>

                    <p className="mt-1 text-sm secondary-text">
                        Manage your tasks by their due dates.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={goToToday}
                        className="rounded-lg border app-border px-3 py-2 text-sm font-medium primary-text hover:bg-slate-500/10"
                    >
                        Today
                    </button>

                    <button
                        type="button"
                        onClick={goToPreviousMonth}
                        aria-label="Previous month"
                        className="rounded-lg border app-border p-2 primary-text hover:bg-slate-500/10"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={goToNextMonth}
                        aria-label="Next month"
                        className="rounded-lg border app-border p-2 primary-text hover:bg-slate-500/10"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Monthly summary */}
            <div className="elevated-surface app-border grid grid-cols-2 gap-4 rounded-xl border p-4 sm:grid-cols-3">
                <div>
                    <p className="text-sm secondary-text">Selected month</p>
                    <p className="mt-1 font-semibold primary-text">
                        {monthLabel}
                    </p>
                </div>

                <div>
                    <p className="text-sm secondary-text">Scheduled tasks</p>
                    <p className="mt-1 font-semibold primary-text">
                        {monthTasks.length}
                    </p>
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <p className="text-sm secondary-text">Completed tasks</p>
                    <p className="mt-1 flex items-center gap-2 font-semibold primary-text">
                        <CircleCheck size={17} className="text-green-500" />
                        {completedTasks}
                    </p>
                </div>
            </div>

            {/* Calendar */}
            <div className="overflow-hidden rounded-xl border app-border elevated-surface">
                <div className="grid grid-cols-7 border-b app-border">
                    {WEEKDAYS.map((day) => (
                        <div
                            key={day}
                            className="border-r app-border px-1 py-3 text-center text-xs font-semibold secondary-text last:border-r-0 sm:text-sm"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7">
                    {calendarDays.map((date, index) => {
                        const dateKey = formatDateKey(date)
                        const dayTasks = tasksByDate[dateKey] || []
                        const isToday = dateKey === todayKey
                        const inMonth = isCurrentMonth(date)

                        return (
                            <div
                                key={`${dateKey}-${index}`}
                                className={`min-h-28 border-b border-r app-border p-1 sm:min-h-36 sm:p-2 ${
                                    inMonth ? "" : "bg-slate-500/5"
                                }`}
                            >
                                <div className="mb-1 flex justify-center sm:justify-start">
                                    <span
                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                                            isToday
                                                ? "bg-indigo-600 text-white"
                                                : inMonth
                                                  ? "primary-text"
                                                  : "secondary-text opacity-50"
                                        }`}
                                    >
                                        {date.getDate()}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    {dayTasks.map((task) => (
                                        <button
                                            type="button"
                                            key={task.id}
                                            title={`${task.title} — ${task.status}`}
                                            onClick={() =>
                                                navigate(`/app/tasks/${task.id}`)
                                            }
                                            className={`block w-full truncate rounded border-l-2 px-1.5 py-1 text-left text-[10px] transition hover:brightness-95 sm:text-xs ${getStatusClass(task.status)}`}
                                        >
                                            <span className="hidden sm:inline">
                                                {task.title}
                                            </span>
                                            <span className="sm:hidden">
                                                {task.title?.slice(0, 8) || "Task"}
                                            </span>
                                        </button>
                                    ))}

                                    {dayTasks.length === 0 && inMonth && (
                                        <div className="hidden pt-2 text-center text-[10px] secondary-text sm:block">
                                            No tasks
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 text-xs secondary-text">
                <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                    Todo
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    In Progress
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                    Review
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    Done
                </span>
            </div>

            {/* No tasks in month */}
            {monthTasks.length === 0 && (
                <div className="rounded-xl border app-border p-6 text-center">
                    <Clock3
                        size={28}
                        className="mx-auto mb-2 secondary-text"
                    />
                    <p className="font-medium primary-text">
                        No tasks scheduled for {monthLabel}
                    </p>
                    <p className="mt-1 text-sm secondary-text">
                        Tasks with a valid due date will appear on this calendar.
                    </p>
                </div>
            )}
        </section>
    )
}

export default Calendar
