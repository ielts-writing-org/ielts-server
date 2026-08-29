import type { Container } from '@inferdi/inferdi';
import { CONTAINER_CLASSES, CONTAINER_SCOPE_INPUTS } from './config';
import { CloudflareConfigsProvider } from './configs-provider.cloudflare';
import { CloudflareEvaluationClient } from './evaluation-client.cloudflare';
import { Task2EvaluationHandler } from './task2-evaluate.handler';

export function registerTask2EvaluateContainer(c: Container) {
	return c
		.declareScopeInputs<{
			[CONTAINER_SCOPE_INPUTS.ai]: Ai;
			[CONTAINER_SCOPE_INPUTS.kvNamespace]: KVNamespace;
		}>()
		.registerClass(
			CONTAINER_CLASSES.configsProvider,
			CloudflareConfigsProvider,
			[CONTAINER_SCOPE_INPUTS.kvNamespace],
			'scoped'
		)
		.registerClass(
			CONTAINER_CLASSES.evaluationClient,
			CloudflareEvaluationClient,
			[CONTAINER_SCOPE_INPUTS.ai, CONTAINER_CLASSES.configsProvider],
			'scoped'
		)
		.registerClass(
			CONTAINER_CLASSES.task2EvaluateHandler,
			Task2EvaluationHandler,
			[CONTAINER_CLASSES.evaluationClient],
			'scoped'
		);
}
