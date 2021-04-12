import type { OnErrorFn } from '@formatjs/intl';

export default function handleIntlError(err: Parameters<OnErrorFn>[0]): void {
	// TODO: Stop swallowing these errors
	if (err.code === 'MISSING_TRANSLATION') {
		return;
	}
	if (err.code === 'MISSING_DATA') {
		return;
	}
	console.error(err);
}
