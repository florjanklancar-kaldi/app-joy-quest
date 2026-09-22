import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw } from "lucide-react";

import { tasksQueryOptions } from "@/lib/demo-data.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — TanStack Start Starter" },
      {
        name: "description",
        content: "A minimal TanStack Start starter with TypeScript and TanStack Query.",
      },
      { property: "og:title", content: "Home — TanStack Start Starter" },
      {
        property: "og:description",
        content: "A minimal TanStack Start starter with TypeScript and TanStack Query.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => {
    // Prime the Query cache on the server so the first render has data.
    context.queryClient.ensureQueryData(tasksQueryOptions());
  },
  component: Index,
  errorComponent: ({ error }) => (
    <div role="alert" className="mx-auto max-w-md p-8 text-sm text-destructive">
      Failed to load: {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="mx-auto max-w-md p-8">Not found.</div>,
});

function Index() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions());

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground">
              <span className="text-[10px] font-bold">TS</span>
            </span>
            TanStack Start
          </a>
          <nav className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="/" className="transition-colors hover:text-foreground">
              Home
            </a>
            <a
              href="https://tanstack.com/start"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Docs
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-16">

      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          TanStack Start · TypeScript · TanStack Query
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          A clean starting point
        </h1>
        <p className="mt-3 text-muted-foreground">
          File-based routing, SSR, and a ready-to-use data layer. The list below is
          fetched from a server function and cached by TanStack Query.
        </p>
      </header>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Next steps</h2>
          <RefreshButton />
        </div>
        <ul className="mt-3 divide-y rounded-lg border">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3 px-4 py-3 text-sm">
              <span
                className={
                  "size-1.5 shrink-0 rounded-full " +
                  (task.done ? "bg-primary" : "bg-muted-foreground/40")
                }
                aria-hidden
              />
              <span className={task.done ? "text-muted-foreground line-through" : ""}>
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-10 text-xs text-muted-foreground">
        Start building in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono">src/routes</code> —
        every file there becomes a route.
      </footer>
      </main>
    </>
  );
}

function RefreshButton() {
  const queryClient = useQueryClient();
  return (
    <button
      type="button"
      onClick={() => queryClient.invalidateQueries({ queryKey: ["tasks"] })}
      className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <RefreshCw className="size-3" aria-hidden />
      Refetch
    </button>
  );
}
