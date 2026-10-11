import React from 'react'

const Button = ({ name, icon: Icon, handleAddTask }) => {
  return (
    <button className='primary-button hover:primary-button text-white py-2 px-4  flex items-center gap-2 rounded-lg whitespace-nowrap cursor-pointer'
      onClick={handleAddTask}>
      <Icon size={20} />
      <span className=''>
        {name}
      </span>
    </button>
  )
}

export default Button
