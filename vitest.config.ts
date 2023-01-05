import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { readdirSync } from 'fs';

const projectRootDir = path.resolve(__dirname);
const srcDir = path.resolve(projectRootDir, 'src');
const subDirs = readdirSync(srcDir, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);
const aliases = subDirs.map((subDir) => ({
	find: new RegExp(`^@${subDir}/`),
	replacement: `${srcDir}/${subDir}/`,
}));

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
			...aliases,
		],
	},
});
