import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">Assigned: {task.assignedTo}</p>
    </div>
  );
};

export default TaskCard;
