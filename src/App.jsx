import React, { useState, useEffect } from "react";
import "./App.css"; 
// import Photo from "./assets/PngItem_2420282.png"
// import "./assets";

const App = () => {
  const [taskEntry, setTaskEntry] = useState("");
  const [tasks, setTasks] = useState([]);
  // Tracking the index of the task we want to edit
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data && data.length > 0) {
      setTasks(data);
    }
  }, []);

  // Function to add or edit a task
  const handleTaskSubmit = () => {
    if (taskEntry === "") {
      alert("Write something");
      // the alert pops up if one tries to add task while the input field is empty
      return;
    }

    if (editIndex !== null) {
      // Edit existing task
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? taskEntry : task
      );
      setTasks(updatedTasks);
      setEditIndex(null); // Reset edit index
    } else {
      // Add new task
      // spread operator(...)-crates a duplicate of the tasks array
      // taskEntry-new task being entered, which when placed after the spread operator creates
      //  a new tasks array containing all existing tasks followed by the new task now
      setTasks([...tasks, taskEntry]);
    }

    setTaskEntry(""); // Clear input field to allow entry of a new task into the list
    // same use of spread operator as above
    saveData([...tasks, taskEntry]); 
  };

  // Saving tasks to localStorage
  const saveData = (tasks) => {
    localStorage.setItem("data", JSON.stringify(tasks));
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveData(newTasks);
  };

  // Editting a task we have already entred into the list
  const startEdit = (index) => {
    setTaskEntry(tasks[index]); 
    // Setting the current index that we want to now edit
    setEditIndex(index); 
  };

  return (
    <div id="main_container">
      <div className="to_do">
        <div className="title">
          <h4>My daily To Do list</h4>
          {/* <img src="assets" alt="note" /> */}
        </div>
        <input
          type="text"
          value={taskEntry}
          onChange={(e) => setTaskEntry(e.target.value)}
          placeholder="Add in a new task"
        />
        <button onClick={handleTaskSubmit}>
          {editIndex !== null ? "Edit Task" : "Add Task"}
        </button>
          {/* Ternary operators(edit.. !- checks if edit.. isn't null. If null means no task is being editted currently) */}
          {/* (if not null it's set to the index of the task to be editted) */}
          {/* if "..=null" is true, the Edit Task string is rendered  , if false the Add Task string is rendered instead */}
        <ul id="task_container">
          {/* (to read on map) */}
          {tasks.map((task, index) => (
            <li key={index}>
              {index + 1}. {task} 
              {/* Altering with the task after entry i.e editting or removing it from the list */}
            <div className = "mutation">
              <button onClick={() => startEdit(index)} className="edit">
                Edit
              </button>
              <button onClick={() => deleteTask(index)} className="delete">
                Remove
              </button>
            </div> 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
// we export to make it open for use elsewhere
export default App;
