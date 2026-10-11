
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Bell,
    CheckCheck,
    CircleCheck,
    Clock,
    Trash2,
    Inbox,
    Check,
} from "lucide-react"
import {
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
} from "../redux/notifications/notificationsSlice"

const formatDate = (dateString) => {
    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
        return "Unknown date"
    }

    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    })
}

const Notifications = () => {
    const dispatch = useDispatch()

    const notifications = useSelector(
        (state) => state.notifications.notifications
    )

    const unreadCount = useMemo(
        () => notifications.filter((item) => !item.isRead).length,
        [notifications]
    )

    const sortedNotifications = useMemo(
        () =>
            [...notifications].sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            ),
        [notifications]
    )

    return (
        <section className="space-y-6">
            {/* Page heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Bell size={25} />
                        <h1 className="text-2xl font-bold primary-text">
                            Notifications
                        </h1>
                    </div>

                    <p className="mt-1 text-sm secondary-text">
                        Stay updated on your workspace activity.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => dispatch(markAllAsRead())}
                        disabled={unreadCount === 0}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border app-border px-3 py-2 text-sm font-medium primary-text transition hover:bg-slate-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <CheckCheck size={16} />
                        Mark all as read
                    </button>

                    <button
                        type="button"
                        onClick={() => dispatch(clearNotifications())}
                        disabled={notifications.length === 0}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
                    >
                        <Trash2 size={16} />
                        Clear all
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="elevated-surface app-border rounded-xl border p-4">
                    <p className="text-sm secondary-text">
                        Total notifications
                    </p>
                    <p className="mt-2 text-2xl font-bold primary-text">
                        {notifications.length}
                    </p>
                </div>

                <div className="elevated-surface app-border rounded-xl border p-4">
                    <p className="text-sm secondary-text">
                        Unread
                    </p>
                    <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {unreadCount}
                    </p>
                </div>

                <div className="elevated-surface app-border rounded-xl border p-4">
                    <p className="text-sm secondary-text">
                        Read
                    </p>
                    <p className="mt-2 text-2xl font-bold primary-text">
                        {notifications.length - unreadCount}
                    </p>
                </div>
            </div>

            {/* Notification list */}
            {sortedNotifications.length > 0 ? (
                <div className="space-y-3">
                    {sortedNotifications.map((notification) => (
                        <article
                            key={notification.id}
                            className={`elevated-surface app-border rounded-xl border p-4 transition sm:p-5 ${
                                !notification.isRead
                                    ? "border-l-4 border-l-indigo-500"
                                    : ""
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                        notification.isRead
                                            ? "bg-slate-500/10 secondary-text"
                                            : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                    }`}
                                >
                                    {notification.isRead ? (
                                        <CircleCheck size={20} />
                                    ) : (
                                        <Bell size={20} />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="font-semibold primary-text">
                                            {notification.title}
                                        </h2>

                                        {!notification.isRead && (
                                            <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-1 text-sm leading-6 secondary-text">
                                        {notification.message}
                                    </p>

                                    <p className="mt-3 flex items-center gap-1.5 text-xs secondary-text">
                                        <Clock size={14} />
                                        {formatDate(notification.createdAt)}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {!notification.isRead && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    dispatch(
                                                        markAsRead(
                                                            notification.id
                                                        )
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-700"
                                            >
                                                <Check size={14} />
                                                Mark as read
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                dispatch(
                                                    deleteNotification(
                                                        notification.id
                                                    )
                                                )
                                            }
                                            aria-label={`Delete ${notification.title}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg border app-border px-3 py-2 text-xs font-medium primary-text transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="elevated-surface app-border rounded-xl border px-5 py-14 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10">
                        <Inbox
                            size={28}
                            className="text-indigo-600 dark:text-indigo-400"
                        />
                    </div>

                    <h2 className="mt-4 font-semibold primary-text">
                        You're all caught up!
                    </h2>

                    <p className="mt-1 text-sm secondary-text">
                        You don't have any notifications right now.
                    </p>
                </div>
            )}
        </section>
    )
}

export default Notifications
