import { task2EvaluationRequestSchema } from '@ielts/shared/schemas';
import { describeRoute, validator } from 'hono-openapi';
import { CONTAINER_CLASSES, CONTAINER_SCOPE_INPUTS } from './evaluate/config';
import { factory } from '@/app-env';

export const task2Routes = factory.createApp();

task2Routes.post(
	'/evaluate',
	describeRoute({
		tags: ['Task 2'],
		summary: 'Evaluate a task 2 writing submission',
		description: 'Evaluate a task 2 writing submission',
		responses: {
			200: {
				description: 'Evaluation result SSE stream',
				content: {
					'text/event-stream': {
						schema: {
							type: 'string',
							description: 'The evaluation result stream in text/event-stream format'
						}
					}
				}
			},
			400: {
				$ref: '#/components/responses/InvalidRequestBody'
			}
		}
	}),
	validator('json', task2EvaluationRequestSchema),
	async (c) => {
		const data = c.req.valid('json');
		const scope = c.var.di.createScope({
			[CONTAINER_SCOPE_INPUTS.ai]: c.env.AI,
			[CONTAINER_SCOPE_INPUTS.kvNamespace]: c.env.TASK2_KV
		});
		const handler = scope.get(CONTAINER_CLASSES.task2EvaluateHandler);

		const stream = await handler.execute(data, c.req.raw.signal);

		return c.body(stream, 200, { 'Content-Type': 'text/event-stream' });
	}
);
