export interface DeterministicStats {
	words: number;
	sentences: number;
	characters: number;
	paragraphs: number;
}

export function computeDeterministicStats(text: string): DeterministicStats {
	return {
		words: countWords(text),
		sentences: countSentences(text),
		characters: countCharacters(text),
		paragraphs: countParagraphs(text)
	};
}

function countWords(text: string): number {
	return text.split(/\s+/).filter((token) => token.length > 0).length;
}

function countCharacters(text: string): number {
	return text.replaceAll(/[\r\n]/g, '').length;
}

function countSentences(text: string): number {
	return text
		.split(/[.!?…]+/)
		.map((part) => part.trim())
		.filter((part) => part.length > 0).length;
}

function countParagraphs(text: string): number {
	return text
		.split(/\n[\s\n]*/)
		.map((part) => part.trim())
		.filter((part) => part.length > 0).length;
}
