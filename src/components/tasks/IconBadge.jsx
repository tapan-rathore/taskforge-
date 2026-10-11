import React from 'react'

const IconBadge = ({ data }) => {
    const Icon = data.icon
    return (
        <div className='inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap gap-2 secondary-text'>
            <Icon size={18} />
            <span>
                {data.name}
            </span>
        </div>
    )
}

export default IconBadge
