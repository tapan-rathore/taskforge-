import CheckboxItem from "./CheckboxItem"

const FilterSection = ({ title, items, selected, setSelected, allSelected, onAll }) => {
    return (
        <div className="border-b app-border pb-3 mb-3 last:border-none">
            <h3 className="mb-2 text-sm font-medium primary-text">
                {title}
            </h3>

            <CheckboxItem
                label={`All ${title}`}
                checked={allSelected}
                onChange={onAll}
            />

            {items.map(item => {
                const value =
                    typeof item === "string" ? item : item.value

                const label =
                    typeof item === "string" ? item : item.label

                return (
                    <CheckboxItem
                        key={value}
                        label={label}
                        checked={selected.includes(value)}
                        onChange={() =>
                            setSelected(prev =>
                                prev.includes(value)
                                    ? prev.filter(current => current !== value)
                                    : [...prev, value]
                            )
                        }
                    />
                )
            })}

        </div>
    )
}

export default FilterSection
