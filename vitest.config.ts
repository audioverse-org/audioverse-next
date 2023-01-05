import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const projectRootDir = path.resolve(__dirname);
const srcDir = path.resolve(projectRootDir, 'src');

export default defineConfig({
	plugins: [
		react(),
		svgr({
			exportAsDefault: true,
		}),
	],
	test: {
		clearMocks: true,
		environment: 'jsdom',
		setupFiles: process.env.STRICT ? 'testSetup.strict.ts' : 'testSetup.ts',
		css: {
			include: /.+\.module\.scss/,
		},
	},
	resolve: {
		alias: [
			{
				find: '@/',
				replacement: `${srcDir}/`,
			},
			{
				find: '@public',
				replacement: `${projectRootDir}/public`,
			},
		],
	},
});
