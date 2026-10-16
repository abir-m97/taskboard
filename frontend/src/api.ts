import type {Task } from "./types/types";

const API_URL = "http://localhost:3000/tasks";

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);
    if(!response.ok) {
        throw new Error("Could not get tasks");
    }

    return response.json();
}

