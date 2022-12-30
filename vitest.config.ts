import { defineConfig } from 'vitest/config';
import { ViteAliases } from 'vite-aliases';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		ViteAliases({
			useConfig: true,
			useTypescript: true,
		}),
		react(),
		svgr({
			exportAsDefault: true,
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'testSetup.ts',
		css: {
			include: /.+\.module\.scss/,
		},
	},
});
