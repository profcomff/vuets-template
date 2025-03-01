import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import js from '@eslint/js';
// import { FlatCompat } from '@eslint/eslintrc';
import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs, configureVueProject } from '@vue/eslint-config-typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
// 	baseDirectory: __dirname,
// 	recommendedConfig: js.configs.recommended,
// 	allConfig: js.configs.all,
// });

configureVueProject({
	scriptLangs: ['ts'],
	rootDir: import.meta.dirname,
});

export default defineConfigWithVueTs(pluginVue.configs['flat/essential'], vueTsConfigs.recommended);

// export default [
//     pluginVue.configs['flat/essential'],
//     vueTsConfigs.recommended,
// 	...compat.extends(
// 		'eslint:recommended',
// 		'plugin:vue/vue3-recommended',
// 		'@vue/typescript',
// 		'plugin:prettier/recommended',
// 	),
// 	{
// 		rules: {
// 			'no-duplicate-imports': 'error',
// 			'prettier/prettier': 'warn',
// 		},
// 		files: ['**/*.ts', '**/*.vue'],
// 	},
// 	{
// 		ignores: ['/node_modules'],
// 	},
// ];
