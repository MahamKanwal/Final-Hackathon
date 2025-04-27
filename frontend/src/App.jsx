import React from "react";
import TaskBoard from "./Components/TaskBoard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold text-center py-6">Task Board</h1>
      <TaskBoard />
    </div>
  );
};

export default App;
