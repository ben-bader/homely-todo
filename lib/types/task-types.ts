export type Task = {
  id: string;
  title: string;
  description ?: string;
  amount: number;
  status: Status;
  responsible: Responsibles;

};

export type Responsibles = "bader" | "farouk" | "mohemmed";
export type Status = "pending" | "processing" | "completed";