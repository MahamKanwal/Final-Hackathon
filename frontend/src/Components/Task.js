import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index, moveTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{task.content}</p>
          <small>Assigned to: {task.assignedTo}</small>
          <div>
            <button onClick={() => moveTask(task.id, 'inProgress')}>Move to In Progress</button>
            <button onClick={() => moveTask(task.id, 'done')}>Move to Done</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
