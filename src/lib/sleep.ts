interface ISleepOptions<T = undefined> {
	ms?: number;
	value?: T;
	resolve?: boolean;
}

// TODO: Avoid using this function--it slows down tests
export function sleep<T extends ISleepOptions<V>, V>(
	{ ms = 50, value = undefined, resolve = true }: T = {} as T
): Promise<T['value']> {
	return new Promise((res, rej) =>
		setTimeout(() => {
			resolve ? res(value) : rej(value);
		}, ms)
	);
}
