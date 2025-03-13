import { LOG_NETWORK_REQUESTS } from './constants';

export async function logToFile(path: string, ...args: unknown[]) {
	if (!LOG_NETWORK_REQUESTS) return;
	if (typeof window !== 'undefined') return;

	try {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const fs = require('fs');

		if (!fs.existsSync(path)) {
			fs.writeFileSync(path, '');
		}

		const substrings = args.map((arg) => {
			if (typeof arg === 'string') return arg;
			return JSON.stringify(arg, null, 2);
		});

		fs.appendFileSync(
			path,
			`${new Date().toISOString()} ${substrings.join(' ')}\n`,
		);
	} catch (error) {
		console.log('Failed to log to file:', error);
	}
}
