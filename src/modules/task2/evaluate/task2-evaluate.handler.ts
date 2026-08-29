import type { Task2EvaluationRequest } from '@ielts/shared/schemas';
import { computeDeterministicStats } from '@ielts/shared/utils/essay';
import type { EvaluationClient } from './evaluation-client.port';

export class Task2EvaluationHandler {
	constructor(private readonly evaluationClient: EvaluationClient) {}

	async execute(
		request: Task2EvaluationRequest,
		signal: AbortSignal
	): Promise<ReadableStream<Uint8Array>> {
		const stats = computeDeterministicStats(request.response_text);
		const input = {
			...request,
			deterministic: {
				words: stats.words,
				sentences: stats.sentences,
				characters: stats.characters,
				paragraphs: stats.paragraphs
			}
		};

		return this.evaluationClient.evaluate(input, signal);
	}
}
