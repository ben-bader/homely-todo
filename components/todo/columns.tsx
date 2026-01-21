import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ColumnDef } from "@tanstack/react-table";
import { Task, Status, Responsibles } from "@/lib/types/task-types";

export const createColumns = (setTasks: React.Dispatch<React.SetStateAction<Task[]>>): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="max-w-4xl">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const taskId = row.original.id;

      const handleChange = async (newStatus: Status) => {
        try {
          const res = await fetch(`/api/tasks/update/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          });
          const updatedTask: Task = await res.json();

          // Update tasks in state via setTasks
          setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? updatedTask : task))
          );
        } catch (err) {
          console.error("Failed to update task", err);
        }
      };

      return (
        <Select value={row.original.status} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={row.getValue("status")} />
          </SelectTrigger>
          <SelectContent>
            {["pending", "processing", "completed"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "responsible",
    header: "Responsible",
    cell: ({ row }) => {
      const taskId = row.original.id;

      const handleChange = async (newResponsible: Responsibles) => {
        try {
          const res = await fetch(`/api/tasks/update/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ responsible: newResponsible }),
          });
          const updatedTask: Task = await res.json();

          setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? updatedTask : task))
          );
        } catch (err) {
          console.error("Failed to update task", err);
        }
      };

      return (
        <Select value={row.original.responsible} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={row.getValue("responsible")} />
          </SelectTrigger>
          <SelectContent>
            {["bader", "farouk", "mohemmed"].map((responsible) => (
              <SelectItem key={responsible} value={responsible}>
                {responsible}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
];
