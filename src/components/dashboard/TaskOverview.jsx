import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const TaskOverview = () => {
  const tasks = useSelector((state) => state.tasks.tasks)

  const statuses = [
    "Todo",
    "In Progress",
    "Review",
    "Done"
  ]

  const colors = [
    "#3b82f6",
    "#6366f1",
    "#f59e0b",
    "#22c55e"
  ]

  const taskData = statuses.map((status) => ({
    name: status,
    value: tasks.filter(
      (task) => task.status === status
    ).length
  }))

  const totalTasks = tasks.length

  return (
    <div className="surface app-border border rounded-xl p-5 shadow-sm">

      <h2 className="text-lg font-semibold primary-text">
        Task Overview
      </h2>

      <p className="text-sm secondary-text">
        Your task distribution
      </p>

      {/* Chart + Legend */}
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        {/* Chart */}
        <div className="relative w-52 h-52 shrink-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={taskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={2}
                stroke="none"
              >
                {taskData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={colors[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold primary-text">
              {totalTasks}
            </span>
            <span className="text-xs secondary-text">
              Tasks
            </span>
          </div>


        </div>

        {/* Legends */}
        <div className="space-y-4 min-w-24">
          {taskData.map((item, index) => (

            <div
              key={item.name}
              className="flex items-center justify-between gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: colors[index]
                  }}
                />
                <span className="secondary-text">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold primary-text">
                {item.value}
              </span>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default TaskOverview
