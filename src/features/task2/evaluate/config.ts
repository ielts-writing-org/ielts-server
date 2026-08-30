export const CONTAINER_CLASSES = {
	configsProvider: 'task2.evaluate.configsProvider',
	evaluationClient: 'task2.evaluate.evaluationClient'
} as const;

export const CONTAINER_SCOPE_INPUTS = {
	ai: 'ai',
	kvNamespace: 'kvNamespace'
} as const;

export const KV_CONFIGS = {
	evaluationPrompt: 'evaluation-prompt',
	responseSchema: 'response-schema',
	cacheTtl: 86_400
} as const;

export const EVALUATION_MODEL: {
	id: keyof AiModels;
	schemaName: string;
	schemaDescription: string;
	seed: number;
	temperature: number;
	maxOutputTokens: number;
} = {
	// id: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
	id: '@cf/meta/llama-4-scout-17b-16e-instruct',
	schemaName: 'task2-evaluation',
	schemaDescription: 'Evaluation of the IELTS Writing Task 2 response',
	seed: 42,
	temperature: 0.2,
	maxOutputTokens: 3000
} as const;
