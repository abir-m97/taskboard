import { useEffect, useState } from "react"
import type {Task } from "./types/types";
import { TaskCard } from "./components/TaskCard";
import "./App.css";
import {getTasks, createTask, deleteTask, updateTask} from "./api.ts"


function App() {
  const [tasks, setTasks] =useState<Task[]>([]);
  const [loading, setLoading]= useState <boolean> (true);
  const [isOpen, setIsOpen] = useState(false);
  const [creating, setCreating] =useState(false);
  const [error, setError] =useState<string>("");
  const [message, setMessage] =useState<string>("");

  useEffect(()=> {
  getTasks()
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
    
    createTask({title: title.trim(),
    description: description.trim(), 
    status
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

   deleteTask(id)

   .then(() => {
    setTasks((previousTasks) =>
    previousTasks.filter(task => id !== task.id)
);
setMessage("Task deleted!");
   })
.catch(() => {
  setMessage("Could not delete tasks. Try again.");
});
}

function handleUpdateTask(id: number, status :"todo" | "in-progress" | "done")
 { setMessage("");
    updateTask(id, status)
.then(()=> {
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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      </header>
         <section>
          <div className="toggle-header">
          <h2>Create task</h2>
          <button className="toggle" aria-label={isOpen ?  "Close create task form" : "open create task form"}
          onClick={ () => {setIsOpen(!isOpen)
            setMessage("");
           } }
          aria-expanded={isOpen} aria-controls="create-task-form">
          
      <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
      </button>
      </div>
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
        <div className="kanban-column" id="todo-column" >
          <h2 className="todo-header">To do
            <span className="task-count">{
            tasks.filter((task) => task.status==="todo").length} 
            </span>
          </h2>
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
        <div className="kanban-column" id="progress-column">
          <h2 className="in-progress-header">In progress 
            <span className="task-count">{
            tasks.filter((task) => task.status==="in-progress").length} 
            </span>
          </h2>
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
        <div className="kanban-column" id="done-column">
          <h2 className="done-header">Done
            <span className="task-count">{
            tasks.filter((task) => task.status==="done").length} 
            </span>
          </h2>
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
