export default function loadControlledPromise(mock: any) {
	let resolve: (value?: unknown) => void = () => {
		throw new Error('called resolve before definition');
	};
	let reject: (value?: unknown) => void = () => {
		throw new Error('called reject before definition');
	};
	const response = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	jest.mocked(mock).mockReturnValue(response);

	return { resolve, reject };
}
