import { Hono } from 'hono';

import newAppRoute from './routes/apps/new';
import { contextMiddleware } from './middleware/context';

const app = new Hono();
const port = 3000;

app.use("*", contextMiddleware);

app.post('api/admin/apps/new', (c) => newAppRoute(c));

console.log(`Started development server: http://localhost:${port}`);

Bun.serve({
  port,
  fetch: app.fetch,
  idleTimeout: 60
});