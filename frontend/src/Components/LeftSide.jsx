import React from 'react'

const LeftSide = (props) => {
  return (
    <div className='col-span-2 p-4 border-e'>
      <button 
        onClick={props.onAddTask} 
        className='border p-2 w-full mb-4 hover:bg-black hover:text-white'
      >
        Add Task
      </button>
      
      <button 
        onClick={props.onViewInProgress} 
        className='border p-2 w-full mb-4 hover:bg-black hover:text-white'
      >
        In Progress
      </button>
      
      <button 
        onClick={props.onViewDone} 
        className='border p-2 w-full hover:bg-black hover:text-white'
      >
        Done
      </button>
    </div>
  )
}

export default LeftSide
