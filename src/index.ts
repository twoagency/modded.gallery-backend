import { Hono } from 'hono';

import newAppRoute from './routes/admin/apps/new';
import { contextMiddleware } from './middleware/context';
import getAllAppsRoute from './routes/apps/get';

const app = new Hono();
const port = 3000;

app.use("*", contextMiddleware);

app.get('api/apps', (c) => getAllAppsRoute(c));
app.post('api/admin/apps/new', (c) => newAppRoute(c));
app.put('api/admin/apps/:id', (c) => newAppRoute(c));
app.delete('api/admin/apps/:id', (c) => newAppRoute(c));
app.post('api/admin/apps/:id/recommend', (c) => newAppRoute(c));

console.log(`Started development server: http://localhost:${port}`);

Bun.serve({
  port,
  fetch: app.fetch,
  idleTimeout: 60
});