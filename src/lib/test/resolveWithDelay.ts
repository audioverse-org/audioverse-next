import { sleep } from '@lib/sleep';

export function resolveWithDelay(
	mock: vi.SpyInstance,
	ms = 50,
	value: any = undefined
): void {
	mock.mockImplementation(() => sleep({ ms, value }));
}
