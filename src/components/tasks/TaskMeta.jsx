import { CalendarDays, Circle, FileText, FolderKanban, Tag, User } from "lucide-react"
import MetaItem from "./MetaItem"
const TaskMeta = ({ task }) => {

    return (
        <div className="space-y-4">

            <MetaItem
                icon={FileText}
                label="Title"
                value={task.title}
            />

            <MetaItem
                icon={Circle}
                label="Status"
                value={task.status}
            />

            <MetaItem
                icon={Tag}
                label="Priority"
                value={task.priority}
            />

            <MetaItem
                icon={CalendarDays}
                label="Due Date"
                value={task.dueDate}
            />

            <MetaItem
                icon={FolderKanban}
                label="Project"
                value={`Project ${task.project}`}
            />

            <MetaItem
                icon={User}
                label="Assignee"
                value={task.assignee || "Unassigned"}
            />

            <div className="
                flex
                items-start
                gap-3
            ">

                <Tag
                    size={17}
                    className="
                        mt-0.5
                        shrink-0
                        secondary-text
                    "
                />

                <div className="min-w-0">

                    <p className="text-xs secondary-text">
                        Tags
                    </p>

                    <div className="
                        mt-1.5
                        flex
                        flex-wrap
                        gap-1.5
                    ">
                        {task.tags?.length ? (
                            task.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="
                                        rounded-full
                                        bg-indigo-500/10
                                        px-2.5
                                        py-1
                                        text-xs
                                        font-medium
                                        text-indigo-500
                                    "
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm secondary-text">
                                No tags
                            </span>
                        )}
                    </div>

                </div>

            </div>


            <MetaItem
                icon={CalendarDays}
                label="Created"
                value={task.createdAt}
            />

        </div>
    )
}

export default TaskMeta