import { cloudflareTest } from '@cloudflare/vitest-plugin';
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
	test: {
		expect: { requireAssertions: true },
		alias: {
			'@': path.resolve(import.meta.dirname, './src'),
			'@shared': path.resolve(import.meta.dirname, './src/shared'),
			'@modules': path.resolve(import.meta.dirname, './src/modules')
		}
	},
	plugins: [
		cloudflareTest({
			wrangler: { configPath: './wrangler.jsonc' }
		})
	]
});
