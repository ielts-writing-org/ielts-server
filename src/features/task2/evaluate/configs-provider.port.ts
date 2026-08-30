export interface Configs {
	evaluationPrompt: string;
	responseSchema: Record<string, unknown>;
}

export interface ConfigsProvider {
	get(): Promise<Configs>;
}
