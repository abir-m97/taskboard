import type {Task } from "./types/types";

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);
    if(!response.ok) {
        throw new Error("Could not get tasks");
    }

    return response.json();
}

export async function createTask(task: {
    title: string,
    description: string,
    status: Task["status"];

} ): Promise<Task> {
    const response =await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task),
 });

 if(!response.ok) {
    throw new Error("Could not create task");
 }

 return response.json();
}

export async function deleteTask(id: number): Promise<void> {
    const response= await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if(!response.ok) {
        throw new Error("Could not delete task");
    }
}

export async function updateTask(id: number, status: Task["status"]): Promise<Task> {
    const response= await fetch(`${API_URL}/${id}`, {
    method:"PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({status}),
});

if(!response.ok) {
    throw new Error("Could not update task");
}
return response.json();
}