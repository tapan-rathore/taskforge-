const FeatureHighlights = ({ title, description, icon: Icon, backgroundColor }) => {
    return (
        <div className="flex items-center p-1 gap-5 pt-4">
            <div className={`p-2 h-10 w-10 rounded-lg text-white flex justify-center items-center ${backgroundColor}`}>
                <Icon size={20} />
            </div>

            <div>
                <h1 className="font-semibold text-sm text-slate-100">
                    {title}
                </h1>
                <p className="text-xs font-medium text-slate-300">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default FeatureHighlights