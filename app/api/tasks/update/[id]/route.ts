import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await context.params;
    const id = resolvedParams.id;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid or missing task ID" }, { status: 400 });
    }

    const body = await req.json();
    const allowedStatuses = ["pending", "processing", "completed"];
    const allowedResponsibles = ["bader", "farouk", "mohemmed"];
    const updateData: Partial<{ status: string; responsible: string }> = {};

    if (body.status && allowedStatuses.includes(body.status)) {
      updateData.status = body.status;
    }
    if (body.responsible && allowedResponsibles.includes(body.responsible)) {
      updateData.responsible = body.responsible;
    }
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", "data", "tasks.json");
    const fileData = await fs.readFile(filePath, "utf-8");
    const tasks = JSON.parse(fileData);

    const taskIndex = tasks.findIndex((task: any) => String(task.id) === String(id));
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateData,
    };

    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");

    return NextResponse.json(tasks[taskIndex]);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
  