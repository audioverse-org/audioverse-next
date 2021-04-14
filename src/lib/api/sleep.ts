export function sleep<Payload>({
	ms = 50,
	value = undefined,
}: { ms?: number; value?: Payload | undefined } = {}): Promise<
	Payload | undefined
> {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(value);
		}, ms)
	);
}
