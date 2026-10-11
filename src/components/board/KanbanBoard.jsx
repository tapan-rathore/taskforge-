import Column from './Column'

const KanbanBoard = ({filteredTasks, onEdit, openDeleteModal, onDropTask, onAddTask}) => {

    const statuses = ["Todo", "In Progress", "Review", "Done"]

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
            {statuses.map(status => {
                const columnTasks = filteredTasks.filter(
                    task => task.status === status
                )

                return (
                    <Column
                        key={status}
                        status={status}
                        tasks={columnTasks}
                        onEdit={onEdit}
                        openDeleteModal={openDeleteModal}
                        onDropTask={onDropTask}
                        onAddTask={onAddTask}
                    />
                )
            })}
        </div>
    )
}

export default KanbanBoard
