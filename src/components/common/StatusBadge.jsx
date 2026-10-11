const StatusBadge = ({ status }) => {

    const styles = {
        Todo: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",

        "In Progress": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400",

        Review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",

        Done: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",

        Active: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",

        "On Hold": "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",

        "Planning": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400",

    }

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${styles[status]}`}>
            {status}
        </span>
    )
}

export default StatusBadge