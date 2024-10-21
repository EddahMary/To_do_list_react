import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [taskEntry, setTaskEntry] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data && data.length > 0) {
      setTasks(data);
      setCompletedTasks(new Array(data.length).fill(false)); // Initialize completed state
    }
  }, []);

  const handleTaskSubmit = () => {
    if (taskEntry === "") {
      alert("Write something");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? taskEntry : task
      );
      setTasks(updatedTasks);
      setCompletedTasks((prev) => {
        const newCompleted = [...prev];
        if (newCompleted[editIndex]) newCompleted[editIndex] = false;
        return newCompleted;
      });
      setEditIndex(null);
    } else {
      setTasks([...tasks, taskEntry]);
      setCompletedTasks([...completedTasks, false]); // Initialize completion state
    }

    setTaskEntry("");
    saveData([...tasks, taskEntry]);
  };

  const saveData = (tasks) => {
    localStorage.setItem("data", JSON.stringify(tasks));
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setCompletedTasks((prev) => prev.filter((_, i) => i !== index)); // Remove completion status
    saveData(newTasks);
  };

  const startEdit = (index) => {
    setTaskEntry(tasks[index]);
    setEditIndex(index);
  };

  const toggleCompletion = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];
    setCompletedTasks(updatedCompletedTasks);
    saveData(tasks); // Save tasks, completion status is not stored
  };

  return (
    <div id="main_container">
      <div className="to_do">
        <div className="title">
          <h4 className="t1">My</h4>
          <h4 className="t2">daily</h4>
          <h4 className="t3">to</h4>
          <h4 className="t4">do</h4>
          <h4 className="t5">list</h4>
        </div>
        <div className="entry_bar">
          <input
            type="text"
            value={taskEntry}
            onChange={(e) => setTaskEntry(e.target.value)}
            placeholder="Add in a new task"
          />
          <button onClick={handleTaskSubmit}>
            {editIndex !== null ? "Edit Task" : "Add Task"}
          </button>
        </div>
        <ul id="task_container">
          {tasks.map((task, index) => (
            <li key={index} style={{ display: "flex"}}>
              {index + 1}. {task}
              <div className="mutation">
                <button onClick={() => startEdit(index)} className="edit">
                  Edit
                </button>
                <button onClick={() => deleteTask(index)} className="delete">
                  Delete
                </button>
                <input className="done"
                type="checkbox"
                checked={completedTasks[index]}
                onChange={() => toggleCompletion(index)}               />
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
