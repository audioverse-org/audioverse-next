import { setLogger } from 'react-query';

export default async function withMutedReactQueryLogger(
	func: () => Promise<any>
): Promise<any> {
	const noop = () => {
		// do nothing
	};

	setLogger({
		log: noop,
		warn: noop,
		error: noop,
	});

	const result = await func();

	setLogger(window.console);

	return result;
}
