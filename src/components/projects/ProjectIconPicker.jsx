import { useState } from "react"
import { projectIcons } from "../../constants/projectIcons"
import { ChevronDown } from "lucide-react"

const ProjectIconPicker = ({
    value = "Rocket",
    onChange,
    color = "#6366f1"
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const SelectedIcon =
        projectIcons[value] || projectIcons.Rocket

    const handleSelect = (iconName) => {
        onChange(iconName)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <label className="mb-2 block text-sm font-medium primary-text ">
                Project Icon
            </label>

            {/* Selected Icon */}
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="flex w-full items-center justify-between rounded-lg border app-border elevate-surface px-3 py-2 transition hover:border-indigo-400"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10"
                        style={{ background: `${color}20` }}>

                        <SelectedIcon
                            size={20}
                            color={color}
                        />
                    </div>

                    <span className="text-sm primary-text">
                        {value}
                    </span>

                    <ChevronDown
                        size={18}
                        className={`secondary-text transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>

            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 z-50 mt-2 max-h-52 overflow-y-auto rounded-lg border app-border elevated-surface p-2 shadow-xl custom-scrollbar">
                    <div>
                        {Object.entries(projectIcons).map(([name, Icon]) => {
                            const isSelected = value === name

                            return (
                                <button
                                    key={name}
                                    type="button"
                                    title={name}
                                    onClick={() =>
                                        handleSelect(name)
                                    }
                                    className={`flex h-12 items-center justify-start gap-2 w-full p-2 rounded-lg border transition truncate ${isSelected
                                        ? "border-indigo-500 bg-indigo-500/15"
                                        : "border-transparent hover:border-indigo-400 hover:bg-slate-500/10"}`}
                                >
                                    <Icon
                                        size={21}
                                        color={isSelected ? color : "currentColor"} />
                                    <span className="text-sm">
                                        {name}
                                    </span>

                                </button>
                            )


                        })}
                    </div>

                </div>
            )

            }

        </div>
    )
}

export default ProjectIconPicker