const mockTasks = [
  {
    id: 1,
    title: "Design Landing Page",
    description: "Create the initial landing page design.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-10-05",
    projectId: 1,
    project: "TaskForge",
    assignee: "Tapan",
    tags: ["UI", "Design"],
    createdAt: "2026-09-20"
  },

  {
    id: 2,
    title: "Build Authentication",
    description: "Implement login and registration functionality.",
    status: "Done",
    priority: "Urgent",
    dueDate: "2026-09-28",
    projectId: 1,
    project: "TaskForge",
    assignee: "Rahul",
    tags: ["Auth", "React"],
    createdAt: "2026-09-18"
  },

  {
    id: 3,
    title: "Create API Structure",
    description: "Set up the initial backend API structure.",
    status: "Todo",
    priority: "High",
    dueDate: "2026-10-08",
    projectId: 3,
    project: "Backend",
    assignee: "Aman",
    tags: ["API", "Backend"],
    createdAt: "2026-09-22"
  },

  {
    id: 4,
    title: "Database Integration",
    description: "Connect the application with the database.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-10-10",
    projectId: 3,
    project: "Backend",
    assignee: "Tapan",
    tags: ["Database", "API"],
    createdAt: "2026-09-23"
  },

  {
    id: 5,
    title: "Portfolio Hero Section",
    description: "Design and implement the portfolio hero section.",
    status: "Review",
    priority: "Medium",
    dueDate: "2026-10-03",
    projectId: 2,
    project: "Portfolio",
    assignee: "Priya",
    tags: ["UI", "Portfolio"],
    createdAt: "2026-09-21"
  },

  {
    id: 6,
    title: "Responsive Navbar",
    description: "Make the navigation responsive across devices.",
    status: "Done",
    priority: "Low",
    dueDate: "2026-09-30",
    projectId: 2,
    project: "Portfolio",
    assignee: "Tapan",
    tags: ["Responsive", "UI"],
    createdAt: "2026-09-19"
  },

  {
    id: 7,
    title: "Task Filter System",
    description: "Implement project, status, and priority filters.",
    status: "Done",
    priority: "High",
    dueDate: "2026-10-01",
    projectId: 1,
    project: "TaskForge",
    assignee: "Rahul",
    tags: ["Redux", "Filter"],
    createdAt: "2026-09-24"
  },

  {
    id: 8,
    title: "Kanban Board",
    description: "Build drag and drop Kanban functionality.",
    status: "In Progress",
    priority: "Urgent",
    dueDate: "2026-10-12",
    projectId: 1,
    project: "TaskForge",
    assignee: "Tapan",
    tags: ["Kanban", "DragDrop"],
    createdAt: "2026-09-25"
  },

  {
    id: 9,
    title: "Task Details Page",
    description: "Create the detailed task view with actions.",
    status: "Review",
    priority: "High",
    dueDate: "2026-10-06",
    projectId: 1,
    project: "TaskForge",
    assignee: "Aman",
    tags: ["React", "Details"],
    createdAt: "2026-09-26"
  },

  {
    id: 10,
    title: "Dark Mode",
    description: "Add light and dark theme support.",
    status: "Done",
    priority: "Medium",
    dueDate: "2026-09-29",
    projectId: 1,
    project: "TaskForge",
    assignee: "Priya",
    tags: ["Theme", "UI"],
    createdAt: "2026-09-17"
  },

  {
    id: 11,
    title: "API Error Handling",
    description: "Handle API errors and display useful messages.",
    status: "Todo",
    priority: "High",
    dueDate: "2026-10-15",
    projectId: 3,
    project: "Backend",
    assignee: "Rahul",
    tags: ["API", "Error"],
    createdAt: "2026-09-27"
  },

  {
    id: 12,
    title: "Contact Page",
    description: "Create a responsive contact page.",
    status: "In Progress",
    priority: "Low",
    dueDate: "2026-10-07",
    projectId: 2,
    project: "Portfolio",
    assignee: "Priya",
    tags: ["UI", "Contact"],
    createdAt: "2026-09-28"
  },

  {
    id: 13,
    title: "Loading State",
    description: "Add global loading indicators to the application.",
    status: "Done",
    priority: "Medium",
    dueDate: "2026-10-02",
    projectId: 1,
    project: "TaskForge",
    assignee: "Tapan",
    tags: ["Redux", "Loading"],
    createdAt: "2026-09-16"
  },

  {
    id: 14,
    title: "Notification System",
    description: "Add toast notifications for task actions.",
    status: "Review",
    priority: "Medium",
    dueDate: "2026-10-09",
    projectId: 1,
    project: "TaskForge",
    assignee: "Aman",
    tags: ["Toast", "UX"],
    createdAt: "2026-09-29"
  },

  {
    id: 15,
    title: "Mobile Task Cards",
    description: "Improve task cards for mobile screens.",
    status: "Todo",
    priority: "Low",
    dueDate: "2026-10-14",
    projectId: 1,
    project: "TaskForge",
    assignee: "Rahul",
    tags: ["Mobile", "Responsive"],
    createdAt: "2026-09-30"
  }
]

export default mockTasks