import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

// Demo data — swap the body of this server function for a real data source
// (database, external API, etc.) when you're ready. Clients never see this code.
export const getTasks = createServerFn({ method: "GET" }).handler(async (): Promise<
  Task[]
> => {
  return [
    { id: 1, title: "Wire up your data source in src/lib/demo-data.functions.ts", done: false },
    { id: 2, title: "Build your first feature route under src/routes", done: false },
    { id: 3, title: "Connect the project to GitHub and keep going locally", done: false },
  ];
});

export const tasksQueryOptions = () =>
  queryOptions({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });
