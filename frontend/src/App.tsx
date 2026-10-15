import { useEffect, useState } from "react"
import type {Task } from "./types/types";
import { TaskCard } from "./components/TaskCard";
import "./App.css";

function App() {
  const [tasks, setTasks] =useState<Task[]>([]);
  const [loading, setLoading]= useState <boolean> (true);
  const [isOpen, setIsOpen] = useState(false);
  const [creating, setCreating] =useState(false);
  const [error, setError] =useState<string>("");
  const [message, setMessage] =useState<string>("");

  useEffect(()=> {
  fetch("http://localhost:3000/tasks")
  .then((response)=> {
    if (!response.ok) {
      throw new Error("Could not get tasks");
    }
    return response.json();
  })

  .then((data) => setTasks(data))

.catch(() => {
  setError("Could not load tasks. Please try again.");
})
   .finally(()=> {
    setLoading(false);
   });
 }, []);

  const [title, setTitle] =useState<string>("");
  const [description, setDescription] =useState<string>("");
  const [status, setStatus] = useState<"todo" |"in-progress" | "done">("todo");


  function handleCreateTask() {
  if(title.trim() ==="") {
    setMessage("You have to type a title");
    return;
  }
    setCreating(true);
    setMessage("");

    fetch("http://localhost:3000/tasks", {
 method: "POST",
 headers: {"Content-Type": "application/json"},
 body: JSON.stringify({title: title.trim(), description: description.trim(), status}),
 })
 .then((response)=> {
  if(!response.ok) {
    throw new Error("Could not create task");
  }
  return response.json();
 })
 .then((data) => {
  setTasks((previousTasks) =>
  [...previousTasks, data]);

  setMessage("Task added!");

  setTitle("");
  setDescription("");
  setStatus("todo");
   setIsOpen(false);

 })

 .catch(() => {
setMessage("Could not create task. Try again.");
  })

  .finally(() => { 
  setCreating(false);
});
}

function handleDeleteTask(id: number) {
  setMessage("");

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    })
.then((response) => {
if (!response.ok) {
  throw new Error("Could not delete task.");
}
  setTasks((previousTasks) =>
    previousTasks.filter(task => id !== task.id)
);
setMessage("Task deleted!");
})

.catch(() => {
  setMessage("Could not delete tasks. Try again.");
})
}

function handleUpdateTask(id: number, status :"todo" | "in-progress" | "done")
 { setMessage("");
    fetch(`http://localhost:3000/tasks/${id}`, {
    method:"PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({status})
})
.then(response => {
if (!response.ok) {
  throw new Error("Could not update task.");
}
  setTasks((previousTasks) =>
    previousTasks.map(task => id === task.id ? {
      ...task, status: status} :task 
    ));
})
.catch(() => {
  setMessage("Could not update task. Try again.");
});
}

  return(
    <div className="app">
      <header> 
      <h1>Taskboard</h1>
      <p>Number of tasks: {tasks.length}</p>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      </header>
         <section>
          <button className="toggle" onClick={ () => {setIsOpen(!isOpen)
            setMessage("");
           } }
          aria-expanded={isOpen} aria-controls="create-task-form">
          
      <h2>Create a task</h2>
      <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <form id="create-task-form" onSubmit={ (e) => {
          e.preventDefault();
          handleCreateTask();
        }}>
          <label htmlFor="title">Title</label>
          <input value={title} id="title" onChange={(e) => setTitle(e.target.value)} required/>
          <label htmlFor="description">Describe task</label>
      <textarea value={description} id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
      <label htmlFor="status">Status</label>
      <select value={status}  id="status" onChange={(e) => setStatus(e.target.value as "todo" | "in-progress" | "done")}>

        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
      <button className="create-btn" type="submit" disabled={creating}>
        {creating ? "Creating task...": "Create Task"}
      </button> 
</form>    
      )}
       <p>{message}</p>

      </section>
      <main>
        <div className="kanban-column">
          <h2 className="todo-header">To do</h2>
            {tasks.filter((task) => task.status === "todo").length === 0 && (
            <p>No tasks yet.</p>
          )}
            {tasks.filter((task) => task.status ==="todo")
            .map((task) =>
      <TaskCard
      key={task.id} 
      id={task.id}
      title={task.title}
      description={task.description}
      status={task.status}
      onDelete={handleDeleteTask}
      onStatusChange={handleUpdateTask}
      
      />
      )}
        </div>
        <div className="kanban-column">
          <h2 className="in-progress-header">In progress</h2>
            {tasks.filter((task) => task.status === "in-progress").length === 0 && (
            <p>No tasks yet.</p>
          )}
             {tasks.filter((task) => task.status ==="in-progress")
            .map((task) =>
      <TaskCard
      key={task.id}
      id={task.id}
      title={task.title}
      description={task.description}
      status={task.status}
      onDelete={handleDeleteTask}
      onStatusChange={handleUpdateTask}
      />

      )}
        </div>
        <div className="kanban-column">
          <h2 className="done-header">Done</h2>
            {tasks.filter((task) => task.status === "done").length === 0 && (
            <p>No tasks yet.</p>
          )}
             {tasks.filter((task) => task.status ==="done")
            .map((task) =>
      <TaskCard
      key={task.id}
      id={task.id}
      title={task.title}
      description={task.description}
      status={task.status}
      onDelete={handleDeleteTask}
      onStatusChange={handleUpdateTask}
      />
      )}
        </div>
      </main>  
    </div>
  )
}

export default App
