import js from '@eslint/js';
import baseConfig from '@hono/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig({
	...tseslint.configs.recommendedTypeChecked,
	...baseConfig,
	...eslintConfigPrettier,
	files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
	plugins: { js },
	extends: ['js/recommended'],
	languageOptions: {
		globals: globals.node,
		parserOptions: {
			allowDefaultProject: ['eslint.config.js'],
			projectService: true
		}
	},
	ignores: ['.wrangler/**', 'dist/**', 'worker-configuration.d.ts']
});
