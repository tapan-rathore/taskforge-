import { Trash2, X } from "lucide-react"

const DeleteModal = ({ item, itemType, onClose, onDelete }) => {

    const itemName = itemType === "project"
        ? item?.name
        : item?.title

        const itemLabel = itemType === "project"
        ? "Project"
        : "Task"

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">

            {/* modal */}
            <div className="w-full max-w-md surface shadow-2xl overflow-hidden rounded-xl border app-border">

                <div className="flex items-center justify-between border-b app-border px-5 py-3">
                    <h2 className="text-base font-semibold primary-text">
                        Delete {itemLabel}
                    </h2>
                    <button type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 secondary-text transition hover:bg-slate-500/10 hover:primary-text">
                        <X size={20} />

                    </button>
                </div>

                <div className="flex flex-col items-center px-5 py-6 text-center">

                    <div className="mb-4 w-14 h-14 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                        <Trash2 size={24} />
                    </div>

                    <p className="mt-2 max-w-xs text-sm leading-6 secondary-text">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold primary-text">
                            "{itemName || `This ${itemLabel}`}"
                        </span>
                        ?
                    </p>

                    <p className="mt-1 text-xs muted-text">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 border-t app-border p-4 mt-4 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-lg border app-border px-4 py-2.5 text-sm font-medium primary-text transition hover:bg-slate-500/10 sm:w-auto">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="w-full rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 sm:w-auto">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
