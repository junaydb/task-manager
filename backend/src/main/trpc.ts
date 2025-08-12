import { initTRPC } from "@trpc/server";
import { tasksRouter } from "./routes/tasks.js";

const t = initTRPC.create();

export const publicProcedure = t.procedure;
export const router = t.router;

export const appRouter = router({
  tasks: tasksRouter,
});

export type AppRouter = typeof appRouter;
