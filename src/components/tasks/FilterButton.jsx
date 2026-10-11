import { ChevronDown } from 'lucide-react'

const FilterButton = ({ item, onChange, value }) => {
    const Icon = item.icon

    return (
        <div className='relative'>
            {Icon &&
                <Icon
                    size={18}
                    className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 secondary-text'
                />}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='text-sm appearance-none rounded-lg border app-border elevated-surface px-9 py-2 primary-text outline-none cursor-pointer focus:border-indigo-500'>
                {item.options && item.options.map(option =>
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                )}
            </select>
            <ChevronDown
                size={16}
                className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 secondary-text'
            />
        </div>
    )
}

export default FilterButton
