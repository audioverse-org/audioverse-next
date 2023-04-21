import { sleep } from '~lib/sleep';

export function resolveWithDelay(
	mock: jest.SpyInstance,
	ms = 50,
	value: any = undefined
): void {
	mock.mockImplementation(() => sleep({ ms, value }));
}
