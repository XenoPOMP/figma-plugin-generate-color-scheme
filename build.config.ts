// @ts-ignore
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	name: 'minified',
	entries: ['code.ts'],
	outDir: 'dist',
	rollup: {
		esbuild: {
			minify: true,
		},
	},
});
