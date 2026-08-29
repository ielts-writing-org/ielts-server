import { KV_CONFIGS } from './config';
import type { Configs, ConfigsProvider } from './configs-provider.port';
import { ConfigError } from '@/shared/errors';

export class CloudflareKvConfigsProvider implements ConfigsProvider {
	constructor(private readonly kvNamespace: KVNamespace) {}

	async get(): Promise<Configs> {
		const [evaluationPrompt, responseSchemaStr] = await Promise.all([
			this.kvNamespace.get(KV_CONFIGS.evaluationPrompt, { cacheTtl: KV_CONFIGS.cacheTtl }),
			this.kvNamespace.get(KV_CONFIGS.responseSchema, { cacheTtl: KV_CONFIGS.cacheTtl })
		]);
		if (!evaluationPrompt || !responseSchemaStr) {
			throw new ConfigError('Evaluation prompts missing from KV.');
		}
		return {
			evaluationPrompt: evaluationPrompt,
			responseSchema: JSON.parse(responseSchemaStr) as Record<string, unknown>
		};
	}
}
