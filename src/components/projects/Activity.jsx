const Activity = ({
    icon: Icon,
    text,
    highlight,
    time
}) => {

    return (
        <div className="flex gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
                <Icon size={15} />
            </div>

            <div className="min-w-0">

                <p className="text-xs leading-5 primary-text">

                    {text}{" "}

                    {highlight && (
                        <span className="font-semibold">
                            {highlight}
                        </span>
                    )}

                </p>

                <p className="mt-1 text-[11px] secondary-text">
                    {time}
                </p>

            </div>

        </div>
    )
}

export default Activity