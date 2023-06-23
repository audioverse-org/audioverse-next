export type PromiseController<T = unknown> = {
	resolve: (value?: T) => void;
	reject: (value?: T) => void;
	promise: Promise<T>;
};
export const createControlledPromise = <
	T = unknown
>(): PromiseController<T> => {
	let resolve: (value?: T) => void = () => {
		throw new Error('called resolve before definition');
	};

	let reject: (value?: T) => void = () => {
		throw new Error('called reject before definition');
	};

	const promise = new Promise<T>((res, rej) => {
		resolve = res as any;
		reject = rej as any;
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
