const MetaItem = ({
    icon: Icon,
    label,
    value,
}) => {

    return (
        <div className="
            flex
            items-start
            gap-3
        ">

            <Icon
                size={17}
                className="
                    mt-0.5
                    shrink-0
                    secondary-text
                "
            />

            <div className="min-w-0">

                <p className="text-xs secondary-text">
                    {label}
                </p>

                <p className="
                    mt-0.5
                    wrap-break-words
                    text-sm
                    font-medium
                    primary-text
                ">
                    {value}
                </p>

            </div>
        </div>
    )
}

export default MetaItem