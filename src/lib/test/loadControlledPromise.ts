export const createControlledPromise = () => {
	let resolve: (value?: unknown) => void = () => {
		throw new Error('called resolve before definition');
	};

	let reject: (value?: unknown) => void = () => {
		throw new Error('called reject before definition');
	};

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return {
		resolve,
		reject,
		promise,
	};
};

export default function loadControlledPromise(mock: any) {
	const { resolve, reject, promise } = createControlledPromise();

	jest.mocked(mock).mockReturnValue(promise);

	return { resolve, reject };
}
