/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	root: true,

	env: {
		browser: true,
		es6: true,
		node: true,
	},

	parser: '@typescript-eslint/parser',

	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},

	plugins: ['@typescript-eslint'],

	ignorePatterns: [
		'.eslintrc.js',
		'.eslintrc.prepublish.js',
		'.prettierrc.js',
		'**/*.js',
		'**/node_modules/**',
		'**/dist/**',
	],

	overrides: [
		{
			files: ['package.json'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/community'],
			parser: 'jsonc-eslint-parser',
			parserOptions: { project: null },
			rules: {
				'n8n-nodes-base/community-package-json-name-still-default': 'off',
			},
		},
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/credentials'],
			rules: {
				'n8n-nodes-base/cred-class-field-display-name-missing-api': 'off',
				'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
			},
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/nodes'],
			rules: {
				'n8n-nodes-base/node-class-description-icon-not-svg': 'off',
				// We use $fromAI() expressions as defaults so n8n's AI Agent
				// fills the action / params at runtime. The lint rule wants
				// literal option values, which would break the integration.
				'n8n-nodes-base/node-param-default-wrong-for-options': 'off',
			},
		},
	],
};
