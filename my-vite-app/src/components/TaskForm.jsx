import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    tags: [], // Removed status since we're removing the dropdown
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => ({ ...prev, tags: filterTags }));
    } else {
      setTaskData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => [...prev, { ...taskData, status: "todo" }]); // Default status
    setTaskData({
      task: "",
      tags: [],
    });
  };

  return (
    <header className="app_header">
      <div className="todo_header">
        <h1>ToDo List</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input_row">
          <input
            type="text"
            name="task"
            value={taskData.task}
            className="task_input"
            placeholder="What needs to be done?"
            onChange={handleChange}
            required
          />
          <button type="submit" className="task_submit">
            Add
          </button>
        </div>

        
      </form>
    </header>
  );
};

export default TaskForm;