module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:react-hooks/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname
	},
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true }
		]
	}
}
