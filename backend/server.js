const fs =require("fs");
const express = require("express");   
const cors= require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const tasks= require("./data/tasks.json") 

app.get('/tasks', (req, res)=> {   
res.json(tasks);
});

app.post('/tasks', (req, res)=> {    
console.log(req.body);
const newTask = {
    id: tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
};

tasks.push(newTask);

fs.writeFileSync(
  "data/tasks.json",
  JSON.stringify(tasks)
)
res.json(newTask);

});

app.delete('/tasks/:id', (req, res) =>{
    const id= Number(req.params.id);

    const taskIndex =tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        res.status(404).json({message: "Task hittades inte"});
        return;
    }

    tasks.splice(taskIndex, 1);

    fs.writeFileSync(
        "data/tasks.json",
        JSON.stringify(tasks)
    );

    res.json({message: "Task borttagen!"});

});

app.patch('/tasks/:id', (req, res) => {
    const id= Number(req.params.id);
    const task =tasks.find(task => task.id === id);
    if (!task) {
        res.status(404).json({message: "Task hittades inte"});
        return;
    }
task.status =req.body.status;

  fs.writeFileSync(
        "data/tasks.json",
        JSON.stringify(tasks)
    );
    
res.json(task);
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
});