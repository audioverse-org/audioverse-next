export default function pThrottle(_ = {}): <T>(fn: T) => T {
	return (fn: any) => fn;
}
