import React from "react";
import { Droppable } from "react-beautiful-dnd";
// import TaskCard from "./TaskCard";  
// import TaskBoard from "./TaskBoard";
const TaskColumn = ({ title, tasks, columnId }) => {
  return (
    <div className="flex flex-col w-1/3 mx-2">
      <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-100 p-4 rounded-md"
            style={{ minHeight: "400px" }}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
