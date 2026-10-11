import React from 'react'

const PriorityBadge = ({ priority }) => {

    const styles = {
        Low: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",

        Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",

        High: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",

        Urgent: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    }


    return (
        <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${styles[priority]}`}>
            {priority}
        </span>
    )
}

export default PriorityBadge
