interface ISleepOptions<T = undefined> {
	ms?: number;
	value?: T;
}

export function sleep<T extends ISleepOptions<V>, V>(
	{ ms = 50, value = undefined }: T = {} as T
): Promise<T['value']> {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(value);
		}, ms)
	);
}
