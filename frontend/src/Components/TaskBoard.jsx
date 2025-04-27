import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "TaskColumn";

const TaskBoard = () => {
  const initialTasks = {
    "to-do": [
      { id: "1", title: "Task A", assignedTo: "User1" },
      { id: "2", title: "Task B", assignedTo: "User2" },
    ],
    "in-progress": [
      { id: "3", title: "Task C", assignedTo: "User3" },
    ],
    "done": [],
  };

  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside the list
    if (!destination) return;

    // If dropped in the same column
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
    const [movedTask] = tasks[sourceColumn].splice(source.index, 1);
    tasks[destinationColumn].splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [sourceColumn]: [...tasks[sourceColumn]],
      [destinationColumn]: [...tasks[destinationColumn]],
    });
  };

  return (
    <div className="flex justify-between p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskColumn title="To Do" tasks={tasks["to-do"]} columnId="to-do" />
        <TaskColumn title="In Progress" tasks={tasks["in-progress"]} columnId="in-progress" />
        <TaskColumn title="Done" tasks={tasks["done"]} columnId="done" />
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
