import { Check } from "lucide-react"

const CheckboxItem = ({ label, checked, onChange }) => {
    return (
        <button
            type="button"
            onClick={onChange}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-left text-sm secondary-text hover:bg-indigo-500/10"
        >
            <span
                className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    checked
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "app-border bg-transparent"
                }`}
            >
                {checked && <Check size={12} />}
            </span>

            <span>{label}</span>
        </button>
    )
}

export default CheckboxItem