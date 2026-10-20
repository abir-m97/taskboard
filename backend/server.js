const path=require("path");
const fs =require("fs");
const express = require("express");   
const cors= require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let tasks= require("./data/tasks.json") 

app.get('/tasks', (req, res)=> {   
res.json(tasks);
});

const tasksFile =path.join(__dirname, "data", "tasks.json");

const allowedStatus = ["todo", "in-progress", "done"];

     // post

app.post('/tasks', async (req, res)=> {    


if(typeof req.body.title !=="string" || req.body.title.trim() ==="") {
   return res.status(400).json({message: "Title must be non empty string"});
    
}

if(!allowedStatus.includes(req.body.status)) {
    return res.status(400).json({message: "Invalid status"});
   
}

if(req.body.description !== undefined && typeof req.body.description !== "string") {
   return res.status(400).json({message: "Invalid description"});
    
}
const newTask = {
    id: tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    title: req.body.title.trim(),
    description: req.body.description || "",
    status: req.body.status
};

const updatedTasks=  [...tasks, newTask];

try { 
    await fs.promises.writeFile ( 
  tasksFile,
  JSON.stringify(updatedTasks, null, 2)
);
tasks= updatedTasks;

res.status(201).json(newTask);
} catch(error) {
   console.log(error);

   res.status(500).json({message: "Something went wrong. Try again"});
}
});
                                   // delete


app.delete('/tasks/:id', async (req, res) =>{
    const id= Number(req.params.id);

    const taskIndex =tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
       return res.status(404).json({message: "Task not found"});
        
    }
const updatedTasks = tasks.filter(task => task.id !==id);

try {
  await fs.promises.writeFile ( 
        tasksFile,
        JSON.stringify(updatedTasks, null, 2)
    );
    tasks= updatedTasks;
    
    res.json({message: "Task deleted!"});
}
catch(error) {
    console.log(error);
    
    res.status(500).json({message: "Something went wrong. Try again"});
}
});




// patch
 app.patch('/tasks/:id', async (req, res) => {
    const id= Number(req.params.id);
    const task =tasks.find(task => task.id === id);
    if (!task) {
       return res.status(404).json({message: "Task not found"});
        
    }

    if(!allowedStatus.includes(req.body.status)) {
    return res.status(400).json({message: "Invalid status"});
    
}
try {
    
    const updatedTasks= tasks.map(task => {
    if(task.id ===id) {
        return {...task, status:req.body.status};
    }
    return task;
});

  await fs.promises.writeFile ( 
        tasksFile,
        JSON.stringify(updatedTasks, null, 2)
    );
    
    tasks = updatedTasks;
    res.json(updatedTasks.find(task => task.id ===id));

 
} catch(error) {
   console.log(error);

   res.status(500).json({message: "Something went wrong. Try again"});
}
 });

const PORT=process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});