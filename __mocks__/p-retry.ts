export default function pRetry<T extends (...args: any) => any>(
	fn: T,
	_ = {},
): ReturnType<T> {
	return fn();
}
