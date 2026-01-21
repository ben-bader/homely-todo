import { useEffect, useState } from "react";
import { Task } from "@/lib/types/task-types";

export function useTasks() {
    const [tasks,setTasks] = useState<Task[]>([]);
    useEffect(()=>{
    async function fetchTasks() {
        try {
            const res = await fetch("/api/tasks");
            if (!res.ok) {
                return [];
            }
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            setTasks([]);
        }
    }
    fetchTasks();
        },[]);
    return {    tasks,setTasks};
}