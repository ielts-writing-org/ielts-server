import { inferdiHono } from '@inferdi/hono';
import { cors } from 'hono/cors';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { factory } from './app-env';
import { buildRootContainer } from './container';
import { handleOpenAPIRoute } from './openapi';
import { handleScalarRoute } from './scalar';
import { toErrorResponse } from './shared/errors';
import { task2Routes } from '@/modules/task2';

const root = buildRootContainer();
const app = factory.createApp();

app.onError((error, c) => {
	const { status, body } = toErrorResponse(error);
	return c.json(body, status as ContentfulStatusCode);
});

app.use('*', cors());
app.use('*', inferdiHono({ container: root }));

app.get('/', (c) => c.json({ status: 'ok' }));

if (process.env.NODE_ENV === 'development') {
	app.get('/openapi', handleOpenAPIRoute(app));
	app.get('/scalar', handleScalarRoute());
}

app.route('/api/v1/task2', task2Routes);

export default app;
