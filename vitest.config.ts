import { cloudflareTest } from '@cloudflare/vitest-plugin';
import { defineConfig } from 'vitest/config';
import path from 'node:path';

console.log('🚀 VITEST CONFIG LOADED SUCCESSFULLY!');

export default defineConfig({
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					alias: {
						'@': path.resolve(import.meta.dirname, './src'),
						'@shared': path.resolve(import.meta.dirname, './src/shared'),
						'@modules': path.resolve(import.meta.dirname, './src/modules')
					}
				}
			}
		]
	},
	plugins: [
		cloudflareTest({
			wrangler: { configPath: './wrangler.jsonc' }
		})
	]
});
