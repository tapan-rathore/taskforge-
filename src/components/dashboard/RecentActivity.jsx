import {
    Check,
    Plus,
    ArrowRight
} from "lucide-react"

const activities = [
    {
        id: 1,
        type: "completed",
        message: 'You completed "Build Navbar"',
        time: "10 minutes ago"
    },
    {
        id: 2,
        type: "created",
        message: 'You created "TaskForge"',
        time: "2 hours ago"
    },
    {
        id: 3,
        type: "moved",
        message: 'You moved "API Integration" to Review',
        time: "Yesterday"
    },
    {
        id: 4,
        type: "completed",
        message: 'You completed "Login Page"',
        time: "Yesterday"
    }
]

const activityIcons = {
    completed: Check,
    created: Plus,
    moved: ArrowRight
}

const activityStyles = {
    completed: "bg-success/15 text-success",
    created: "bg-blue-500/15 text-blue-500",
    moved: "bg-warning/15 text-warning"
}

const RecentActivity = () => {
    return (
        <div className="
            surface
            app-border
            border
            rounded-xl
            p-5
            shadow-sm
        ">

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-lg font-semibold primary-text">
                    Recent Activity
                </h2>

                <p className="text-sm secondary-text">
                    Latest activity in your workspace
                </p>
            </div>

            {/* Activities */}
            <div className="space-y-5">

                {activities.map((activity) => {

                    const Icon = activityIcons[activity.type]

                    return (
                        <div
                            key={activity.id}
                            className="flex items-start gap-3"
                        >

                            {/* Icon */}
                            <div className={`
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                ${activityStyles[activity.type]}
                            `}>
                                <Icon size={16} />
                            </div>

                            {/* Content */}
                            <div className="min-w-0">

                                <p className="text-sm font-medium primary-text">
                                    {activity.message}
                                </p>

                                <p className="mt-1 text-xs muted-text">
                                    {activity.time}
                                </p>

                            </div>

                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default RecentActivity