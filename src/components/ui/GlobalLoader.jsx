import { LoaderCircle } from "lucide-react"
import { useSelector } from "react-redux"

const GlobalLoader = () => {
    const isLoading = useSelector(
        (state) => state.ui.isLoading
    )

    if (!isLoading) {
        return null
    }

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg">
                <LoaderCircle
                    size={24}
                    className="animate-spin text-indigo-600"
                />

                <span className="text-sm font-medium text-slate-700">
                    Loading...
                </span>
            </div>
        </div>
    )
}

export default GlobalLoader