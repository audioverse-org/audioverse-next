export default function pLimit(_ = {}): <T>(fn: T) => T {
	return (fn: any) => fn();
}
