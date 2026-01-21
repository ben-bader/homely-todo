import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(){
    const filePath = join(process.cwd(), "public", "data", "tasks.json");
    const data = await readFile(filePath, "utf-8");
    const tasks = JSON.parse(data);
    return new Response(JSON.stringify(tasks));
}
