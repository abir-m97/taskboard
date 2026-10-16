
export function TaskCard({id, title, description, status, onDelete, onStatusChange} : {
    id: number;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    onDelete: (id: number) => void;
    onStatusChange: (id:number, status:"todo" | "in-progress" | "done") => void;
    }) 
 {
return (
<div className="task-card">
<h3 className="task-title">{title}</h3>
<p className="task-description">{description}</p>
<select value={status} id={`status-${id}`} 
aria-label={`Status for ${title}`}
onChange={(e) => onStatusChange(id, e.target.value as "todo" | "in-progress" | "done")}>

        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
<button type="button" className="delete-btn" onClick={ () => onDelete(id)}>Delete</button>
</div>
);
}
