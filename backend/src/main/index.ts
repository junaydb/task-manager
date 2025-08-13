import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { logger } from "hono/logger";
import type { Context } from "hono";
import { ZodError } from "zod";
import { errorResponse } from "./util/responseWrappers.js";
import { TaskNotFoundError } from "./util/errors.js";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/appRouter.js";
import { trpcServer } from "@hono/trpc-server";

const app = new Hono();

app.use(logger());
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
// TODO: disable cors in prod environment
app.use(
  "/api/trpc/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
  }),
);

app.onError((err, c: Context) => {
  if (err instanceof ZodError) {
    const messages = err.errors.map((cur) => {
      return { param: cur.path.toString(), message: cur.message };
    });
    return c.json(
      errorResponse(
        "Invalid parameters. See errors property for details.",
        messages,
      ),
      400,
    );
  }
  if (err instanceof TaskNotFoundError) {
    return c.json(errorResponse(err.message), 404);
  }
  if (err instanceof SyntaxError) {
    return c.json(errorResponse("Received invalid JSON."), 400);
  }

  console.error(err);
  return c.json(errorResponse("Server side error"), 500);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  },
);

export default app;
